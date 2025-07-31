export interface MarineSpeciesDetail {
  id: string;
  scientificName: string;
  commonName: string;
  family: string;
  order: string;
  phylum: string;
  kingdom: string;
  habitat: string[];
  depth: {
    min: number;
    max: number;
    unit: string;
  };
  distribution: string[];
  conservationStatus: string;
  size: {
    length: {
      min: number;
      max: number;
      unit: string;
    };
    weight?: {
      min: number;
      max: number;
      unit: string;
    };
  };
  diet: string[];
  lifespan: number;
  description: string;
  images: string[];
  facts: string[];
  threats: string[];
  discoveryYear?: number;
  discoveryLocation?: string;
  sources: string[];
  lastUpdated: string;
}

interface ScrapedSpeciesData {
  species: MarineSpeciesDetail[];
  lastUpdated: string;
  sources: string[];
}

class MarineDataScraper {
  private readonly FISHBASE_API = 'https://fishbase.ropensci.org/';
  private readonly GBIF_API = 'https://api.gbif.org/v1/';
  private readonly IUCN_API = 'https://apiv3.iucnredlist.org/api/v3/';
  private readonly WORMS_API = 'https://www.marinespecies.org/rest/';
  
  private cachedData: ScrapedSpeciesData | null = null;
  private lastFetch: Date | null = null;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  async fetchSpeciesFromFishBase(limit: number = 50): Promise<Partial<MarineSpeciesDetail>[]> {
    try {
      const response = await fetch(`${this.FISHBASE_API}species?limit=${limit}`);
      if (!response.ok) throw new Error(`FishBase API error: ${response.status}`);
      
      const data = await response.json();
      return data.data?.map((fish: any) => ({
        id: fish.SpecCode?.toString() || '',
        scientificName: fish.Species || '',
        commonName: fish.FBname || fish.Species || '',
        family: fish.Family || '',
        order: fish.Order || '',
        habitat: this.parseHabitat(fish.DemersPelag),
        description: fish.Comments || '',
        conservationStatus: 'Unknown',
        sources: ['FishBase']
      })) || [];
    } catch (error) {
      console.error('FishBase fetch error:', error);
      return [];
    }
  }

  async fetchSpeciesFromGBIF(limit: number = 50): Promise<Partial<MarineSpeciesDetail>[]> {
    try {
      const response = await fetch(
        `${this.GBIF_API}species/search?habitat=MARINE&limit=${limit}&status=ACCEPTED`
      );
      if (!response.ok) throw new Error(`GBIF API error: ${response.status}`);
      
      const data = await response.json();
      return data.results?.map((species: any) => ({
        id: species.key?.toString() || '',
        scientificName: species.scientificName || '',
        commonName: species.vernacularNames?.[0]?.vernacularName || species.scientificName || '',
        family: species.family || '',
        order: species.order || '',
        phylum: species.phylum || '',
        kingdom: species.kingdom || '',
        habitat: ['Marine'],
        description: species.descriptions?.[0]?.description || '',
        conservationStatus: 'Unknown',
        sources: ['GBIF']
      })) || [];
    } catch (error) {
      console.error('GBIF fetch error:', error);
      return [];
    }
  }

  async fetchSpeciesFromWoRMS(limit: number = 50): Promise<Partial<MarineSpeciesDetail>[]> {
    try {
      const response = await fetch(`${this.WORMS_API}AphiaRecordsByMatchNames?scientificnames[]=*&marine_only=true`);
      if (!response.ok) throw new Error(`WoRMS API error: ${response.status}`);
      
      const data = await response.json();
      return data.slice(0, limit).map((record: any) => ({
        id: record.AphiaID?.toString() || '',
        scientificName: record.scientificname || '',
        commonName: record.valid_name || record.scientificname || '',
        family: record.family || '',
        order: record.order || '',
        phylum: record.phylum || '',
        kingdom: record.kingdom || '',
        habitat: ['Marine'],
        conservationStatus: record.isMarine ? 'Unknown' : 'Terrestrial',
        sources: ['WoRMS']
      }));
    } catch (error) {
      console.error('WoRMS fetch error:', error);
      return [];
    }
  }

  async fetchConservationStatus(scientificName: string): Promise<string> {
    try {
      // Note: IUCN API requires API key, using mock data for now
      const response = await fetch(
        `${this.IUCN_API}species/${encodeURIComponent(scientificName)}`,
        {
          headers: {
            'X-Authentication-Token': 'your-iucn-api-key' // Would need real API key
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        return data.result?.[0]?.category || 'Unknown';
      }
    } catch (error) {
      console.error('IUCN fetch error:', error);
    }
    return 'Unknown';
  }

  private parseHabitat(demersPelag: string): string[] {
    const habitats = [];
    if (!demersPelag) return ['Marine'];
    
    if (demersPelag.toLowerCase().includes('reef')) habitats.push('Coral Reefs');
    if (demersPelag.toLowerCase().includes('pelagic')) habitats.push('Open Ocean');
    if (demersPelag.toLowerCase().includes('demersal')) habitats.push('Sea Floor');
    if (demersPelag.toLowerCase().includes('coastal')) habitats.push('Coastal Waters');
    
    return habitats.length > 0 ? habitats : ['Marine'];
  }

  private generateId(scientificName: string): string {
    return scientificName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  }

  private enrichSpeciesData(partial: Partial<MarineSpeciesDetail>): MarineSpeciesDetail {
    return {
      id: partial.id || this.generateId(partial.scientificName || ''),
      scientificName: partial.scientificName || '',
      commonName: partial.commonName || partial.scientificName || '',
      family: partial.family || 'Unknown',
      order: partial.order || 'Unknown',
      phylum: partial.phylum || 'Unknown',
      kingdom: partial.kingdom || 'Animalia',
      habitat: partial.habitat || ['Marine'],
      depth: partial.depth || { min: 0, max: 1000, unit: 'meters' },
      distribution: partial.distribution || ['Unknown'],
      conservationStatus: partial.conservationStatus || 'Unknown',
      size: partial.size || {
        length: { min: 1, max: 100, unit: 'cm' }
      },
      diet: partial.diet || ['Unknown'],
      lifespan: partial.lifespan || 10,
      description: partial.description || 'Marine species data from scientific databases.',
      images: partial.images || [],
      facts: partial.facts || [],
      threats: partial.threats || ['Habitat Loss', 'Climate Change', 'Pollution'],
      discoveryYear: partial.discoveryYear,
      discoveryLocation: partial.discoveryLocation,
      sources: partial.sources || ['Scientific Database'],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
  }

  async scrapeAllSources(): Promise<ScrapedSpeciesData> {
    console.log('Starting marine species data scraping...');
    
    const [fishbaseData, gbifData, wormsData] = await Promise.all([
      this.fetchSpeciesFromFishBase(30),
      this.fetchSpeciesFromGBIF(30),
      this.fetchSpeciesFromWoRMS(30)
    ]);

    const allPartialData = [...fishbaseData, ...gbifData, ...wormsData];
    
    // Remove duplicates based on scientific name
    const uniqueData = allPartialData.filter((species, index, arr) => 
      arr.findIndex(s => s.scientificName === species.scientificName) === index
    );

    // Enrich data with full structure
    const enrichedSpecies = uniqueData
      .filter(species => species.scientificName && species.scientificName.length > 0)
      .map(partial => this.enrichSpeciesData(partial));

    const scrapedData: ScrapedSpeciesData = {
      species: enrichedSpecies,
      lastUpdated: new Date().toISOString(),
      sources: ['FishBase', 'GBIF', 'WoRMS', 'IUCN Red List']
    };

    this.cachedData = scrapedData;
    this.lastFetch = new Date();
    
    console.log(`Successfully scraped ${enrichedSpecies.length} marine species`);
    return scrapedData;
  }

  async getSpeciesData(): Promise<ScrapedSpeciesData> {
    // Check if we have cached data that's still fresh
    if (this.cachedData && this.lastFetch && 
        (Date.now() - this.lastFetch.getTime()) < this.CACHE_DURATION) {
      return this.cachedData;
    }

    // Fetch fresh data
    return await this.scrapeAllSources();
  }
}

const scraper = new MarineDataScraper();

class MarineDatabase {
  private species: MarineSpeciesDetail[] = [];
  private isInitialized = false;
  private cachedData: ScrapedSpeciesData | null = null;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      const scrapedData = await scraper.getSpeciesData();
      this.species = scrapedData.species;
      this.cachedData = scrapedData;
      this.isInitialized = true;
      console.log(`Marine database initialized with ${this.species.length} species`);
    } catch (error) {
      console.error('Failed to initialize marine database:', error);
      // Fallback to empty array
      this.species = [];
      this.isInitialized = true;
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }
  }

  async searchByName(query: string): Promise<MarineSpeciesDetail[]> {
    await this.ensureInitialized();
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return [];

    return this.species.filter(species =>
      species.commonName.toLowerCase().includes(searchTerm) ||
      species.scientificName.toLowerCase().includes(searchTerm) ||
      species.family.toLowerCase().includes(searchTerm) ||
      species.order.toLowerCase().includes(searchTerm)
    );
  }

  async filterByHabitat(habitat: string): Promise<MarineSpeciesDetail[]> {
    await this.ensureInitialized();
    return this.species.filter(species =>
      species.habitat.some(h => h.toLowerCase().includes(habitat.toLowerCase()))
    );
  }

  async filterByConservationStatus(status: string): Promise<MarineSpeciesDetail[]> {
    await this.ensureInitialized();
    return this.species.filter(species =>
      species.conservationStatus.toLowerCase().includes(status.toLowerCase())
    );
  }

  async filterByDepth(minDepth: number, maxDepth: number): Promise<MarineSpeciesDetail[]> {
    await this.ensureInitialized();
    return this.species.filter(species =>
      species.depth.max >= minDepth && species.depth.min <= maxDepth
    );
  }

  async getSpeciesById(id: string): Promise<MarineSpeciesDetail | undefined> {
    await this.ensureInitialized();
    return this.species.find(species => species.id === id);
  }

  async getRandomSpecies(count: number = 1): Promise<MarineSpeciesDetail[]> {
    await this.ensureInitialized();
    const shuffled = [...this.species].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async getAllSpecies(): Promise<MarineSpeciesDetail[]> {
    await this.ensureInitialized();
    return [...this.species];
  }

  async advancedSearch({
    name,
    habitat,
    conservationStatus,
    minDepth,
    maxDepth,
    diet
  }: {
    name?: string;
    habitat?: string;
    conservationStatus?: string;
    minDepth?: number;
    maxDepth?: number;
    diet?: string;
  }): Promise<MarineSpeciesDetail[]> {
    await this.ensureInitialized();
    let results = this.species;

    if (name) {
      const searchTerm = name.toLowerCase();
      results = results.filter(species =>
        species.commonName.toLowerCase().includes(searchTerm) ||
        species.scientificName.toLowerCase().includes(searchTerm)
      );
    }

    if (habitat) {
      results = results.filter(species =>
        species.habitat.some(h => h.toLowerCase().includes(habitat.toLowerCase()))
      );
    }

    if (conservationStatus) {
      results = results.filter(species =>
        species.conservationStatus.toLowerCase().includes(conservationStatus.toLowerCase())
      );
    }

    if (minDepth !== undefined && maxDepth !== undefined) {
      results = results.filter(species =>
        species.depth.max >= minDepth && species.depth.min <= maxDepth
      );
    }

    if (diet) {
      results = results.filter(species =>
        species.diet.some(d => d.toLowerCase().includes(diet.toLowerCase()))
      );
    }

    return results;
  }

  async getStatistics() {
    await this.ensureInitialized();
    const totalSpecies = this.species.length;
    const conservationCounts = this.species.reduce((acc, species) => {
      acc[species.conservationStatus] = (acc[species.conservationStatus] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const habitatCounts = this.species.reduce((acc, species) => {
      species.habitat.forEach(habitat => {
        acc[habitat] = (acc[habitat] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return {
      totalSpecies,
      conservationCounts,
      habitatCounts,
      averageLifespan: this.species.reduce((sum, s) => sum + s.lifespan, 0) / totalSpecies,
      lastUpdated: this.cachedData?.lastUpdated || new Date().toISOString(),
      sources: this.cachedData?.sources || ['Real-time Scientific APIs']
    };
  }

  async refreshData(): Promise<void> {
    this.isInitialized = false;
    await this.initialize();
  }
}

export const marineDatabase = new MarineDatabase();
export default marineDatabase;
