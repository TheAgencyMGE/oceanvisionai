// iNaturalist API utilities

export interface Observation {
  id: number;
  species_guess: string;
  taxon?: {
    id: number;
    name: string;
    preferred_common_name?: string;
    wikipedia_url?: string;
    conservation_status?: {
      status: string;
      description: string;
    };
    threatened: boolean;
  };
  photos: Array<{
    id: number;
    url: string;
    attribution: string;
    original_dimensions?: {
      width: number;
      height: number;
    };
  }>;
  location: string;
  place_guess: string;
  observed_on: string;
  geojson?: {
    coordinates: [number, number];
  };
  user: {
    login: string;
    name?: string;
  };
}

export interface MarineSpecies {
  id: number;
  name: string;
  commonName: string;
  photo: string;
  location: string;
  observedOn: string;
  conservationStatus: string;
  coordinates?: [number, number];
  wikipediaUrl?: string;
  observer: string;
}

// Ecosystem-specific search terms for iNaturalist
const ECOSYSTEM_SEARCH_TERMS = {
  'coral-reef': [
    'Anthozoa', // Corals
    'Pomacentridae', // Clownfish family
    'Scaridae', // Parrotfish
    'Cheloniidae', // Sea turtles
    'Carcharhinidae' // Reef sharks
  ],
  'kelp-forest': [
    'Macrocystis', // Giant kelp
    'Enhydra lutris', // Sea otter
    'Hypsypops rubicundus', // Garibaldi fish
    'Strongylocentrotus', // Sea urchins
    'Phoca vitulina' // Harbor seal
  ],
  'open-ocean': [
    'Balaenoptera musculus', // Blue whale
    'Thunnus', // Tuna
    'Delphinidae', // Dolphins
    'Cnidaria', // Jellyfish
    'Exocoetidae' // Flying fish
  ],
  'deep-sea': [
    'Lophiiformes', // Anglerfish
    'Architeuthis dux', // Giant squid
    'Sternoptychidae', // Deep sea hatchetfish
    'Vampyroteuthis infernalis', // Vampire squid
    'Bathysaurus' // Deep sea lizardfish
  ]
};

class iNaturalistAPI {
  private baseUrl = 'https://api.inaturalist.org/v1';

  async getMarineObservations(ecosystem: string, limit: number = 20): Promise<MarineSpecies[]> {
    try {
      const searchTerms = ECOSYSTEM_SEARCH_TERMS[ecosystem as keyof typeof ECOSYSTEM_SEARCH_TERMS] || ['marine'];
      const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

      const params = new URLSearchParams({
        taxon_name: randomTerm,
        iconic_taxa: 'Actinopterygii,Reptilia,Mammalia,Mollusca,Cnidaria,Echinodermata',
        photos: 'true',
        geo: 'true',
        order: 'desc',
        order_by: 'observed_on',
        per_page: limit.toString(),
        quality_grade: 'research',
        captive: 'false'
      });

      const response = await fetch(`${this.baseUrl}/observations?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return this.transformObservations(data.results || []);
    } catch (error) {
      console.error('Error fetching marine observations:', error);
      return this.getFallbackData(ecosystem);
    }
  }

  async getSpeciesByLocation(lat: number, lng: number, radius: number = 50): Promise<MarineSpecies[]> {
    try {
      const params = new URLSearchParams({
        lat: lat.toString(),
        lng: lng.toString(),
        radius: radius.toString(),
        iconic_taxa: 'Actinopterygii,Reptilia,Mammalia,Mollusca',
        photos: 'true',
        per_page: '15',
        quality_grade: 'research',
        captive: 'false'
      });

      const response = await fetch(`${this.baseUrl}/observations?${params}`);
      const data = await response.json();
      
      return this.transformObservations(data.results || []);
    } catch (error) {
      console.error('Error fetching species by location:', error);
      return [];
    }
  }

  async searchSpecies(query: string): Promise<MarineSpecies[]> {
    try {
      const params = new URLSearchParams({
        q: query,
        iconic_taxa: 'Actinopterygii,Reptilia,Mammalia,Mollusca,Cnidaria',
        photos: 'true',
        per_page: '10',
        quality_grade: 'research'
      });

      const response = await fetch(`${this.baseUrl}/observations?${params}`);
      const data = await response.json();
      
      return this.transformObservations(data.results || []);
    } catch (error) {
      console.error('Error searching species:', error);
      return [];
    }
  }

  private transformObservations(observations: Observation[]): MarineSpecies[] {
    return observations
      .filter(obs => obs.photos && obs.photos.length > 0)
      .map(obs => ({
        id: obs.id,
        name: obs.taxon?.name || obs.species_guess || 'Unknown Species',
        commonName: obs.taxon?.preferred_common_name || obs.species_guess || 'Unknown',
        photo: this.getBestPhoto(obs.photos),
        location: obs.place_guess || obs.location || 'Unknown Location',
        observedOn: obs.observed_on || new Date().toISOString().split('T')[0],
        conservationStatus: this.getConservationStatus(obs.taxon),
        coordinates: obs.geojson?.coordinates ? [obs.geojson.coordinates[1], obs.geojson.coordinates[0]] : undefined,
        wikipediaUrl: obs.taxon?.wikipedia_url,
        observer: obs.user?.name || obs.user?.login || 'Unknown Observer'
      }));
  }

  private getBestPhoto(photos: Observation['photos']): string {
    if (!photos || photos.length === 0) return '';
    
    // Try to get medium quality photo, fallback to any available
    const photo = photos[0];
    const baseUrl = photo.url.replace(/\/square\./, '/medium.');
    return baseUrl;
  }

  private getConservationStatus(taxon?: Observation['taxon']): string {
    if (!taxon) return 'Unknown';
    if (taxon.conservation_status) {
      return taxon.conservation_status.status;
    }
    if (taxon.threatened) return 'Threatened';
    return 'Least Concern';
  }

  private getFallbackData(ecosystem: string): MarineSpecies[] {
    const fallbackData = {
      'coral-reef': [
        {
          id: 1,
          name: 'Amphiprion ocellatus',
          commonName: 'Clownfish',
          photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
          location: 'Great Barrier Reef, Australia',
          observedOn: '2024-01-15',
          conservationStatus: 'Least Concern',
          observer: 'Marine Biologist'
        }
      ],
      'kelp-forest': [
        {
          id: 2,
          name: 'Enhydra lutris',
          commonName: 'Sea Otter',
          photo: 'https://images.unsplash.com/photo-1446902635130-8bdc0f5d8f3a?w=400',
          location: 'Monterey Bay, California',
          observedOn: '2024-01-10',
          conservationStatus: 'Endangered',
          observer: 'Wildlife Photographer'
        }
      ],
      'open-ocean': [
        {
          id: 3,
          name: 'Tursiops truncatus',
          commonName: 'Bottlenose Dolphin',
          photo: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=400',
          location: 'Pacific Ocean',
          observedOn: '2024-01-08',
          conservationStatus: 'Least Concern',
          observer: 'Ocean Explorer'
        }
      ],
      'deep-sea': [
        {
          id: 4,
          name: 'Architeuthis dux',
          commonName: 'Giant Squid',
          photo: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400',
          location: 'Deep Atlantic',
          observedOn: '2024-01-05',
          conservationStatus: 'Data Deficient',
          observer: 'Deep Sea Research Team'
        }
      ]
    };

    return fallbackData[ecosystem as keyof typeof fallbackData] || [];
  }
}

export const iNaturalist = new iNaturalistAPI();