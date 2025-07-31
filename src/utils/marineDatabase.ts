// Marine Species Database - Ethical data collection from legitimate APIs
// This system aggregates data from scientific databases and APIs

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

// Sample comprehensive marine species database
const MARINE_SPECIES_DATABASE: MarineSpeciesDetail[] = [
  {
    id: "great-white-shark",
    scientificName: "Carcharodon carcharias",
    commonName: "Great White Shark",
    family: "Lamnidae",
    order: "Lamniformes",
    phylum: "Chordata",
    kingdom: "Animalia",
    habitat: ["Open Ocean", "Coastal Waters", "Continental Shelf"],
    depth: { min: 0, max: 1200, unit: "meters" },
    distribution: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Mediterranean Sea"],
    conservationStatus: "Vulnerable",
    size: {
      length: { min: 4, max: 7, unit: "meters" },
      weight: { min: 680, max: 2270, unit: "kg" }
    },
    diet: ["Fish", "Marine Mammals", "Seals", "Sea Lions", "Dolphins"],
    lifespan: 70,
    description: "The great white shark is a species of large mackerel shark which can be found in the coastal surface waters of all the major oceans. They are notable for their size, with larger female individuals growing to 6.1 m in length and 1905-2268 kg in weight at maturity.",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=800"
    ],
    facts: [
      "Can detect blood in water from 5 kilometers away",
      "Have been around for over 400 million years",
      "Can swim at speeds up to 56 km/h",
      "Have approximately 300 teeth arranged in rows",
      "Are apex predators with no natural predators when adult"
    ],
    threats: ["Overfishing", "Bycatch", "Habitat Loss", "Climate Change"],
    discoveryYear: 1758,
    discoveryLocation: "Mediterranean Sea",
    sources: ["IUCN Red List", "FishBase", "National Geographic"],
    lastUpdated: "2024-01-15"
  },
  {
    id: "blue-whale",
    scientificName: "Balaenoptera musculus",
    commonName: "Blue Whale",
    family: "Balaenopteridae",
    order: "Artiodactyla",
    phylum: "Chordata",
    kingdom: "Animalia",
    habitat: ["Open Ocean", "Deep Waters"],
    depth: { min: 0, max: 500, unit: "meters" },
    distribution: ["All Oceans Worldwide"],
    conservationStatus: "Endangered",
    size: {
      length: { min: 20, max: 30, unit: "meters" },
      weight: { min: 100000, max: 200000, unit: "kg" }
    },
    diet: ["Krill", "Small Schooling Fish"],
    lifespan: 90,
    description: "The blue whale is a marine mammal and a baleen whale. Reaching a maximum confirmed length of 29.9 meters and weighing up to 199 tonnes, it is the largest animal known to have ever existed.",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800"
    ],
    facts: [
      "Largest animal ever known to exist on Earth",
      "Heart alone can weigh as much as a car",
      "Can consume up to 4 tons of krill per day",
      "Calls can be heard over 1,600 kilometers away",
      "Tongue can weigh as much as an elephant"
    ],
    threats: ["Ship Strikes", "Entanglement", "Ocean Noise", "Climate Change"],
    discoveryYear: 1758,
    sources: ["IUCN Red List", "NOAA", "Marine Mammal Science"],
    lastUpdated: "2024-01-15"
  },
  {
    id: "clownfish",
    scientificName: "Amphiprion ocellaris",
    commonName: "Clownfish",
    family: "Pomacentridae",
    order: "Perciformes",
    phylum: "Chordata",
    kingdom: "Animalia",
    habitat: ["Coral Reefs", "Anemones"],
    depth: { min: 1, max: 15, unit: "meters" },
    distribution: ["Indo-Pacific", "Great Barrier Reef", "Southeast Asia"],
    conservationStatus: "Least Concern",
    size: {
      length: { min: 8, max: 11, unit: "cm" }
    },
    diet: ["Algae", "Zooplankton", "Worms", "Small Crustaceans"],
    lifespan: 10,
    description: "The ocellaris clownfish is a marine fish belonging to the family Pomacentridae, which includes clownfishes and damselfishes. They are known for their symbiotic relationship with sea anemones.",
    images: [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
    ],
    facts: [
      "Have a symbiotic relationship with sea anemones",
      "Are sequential hermaphrodites",
      "Can change gender when needed",
      "Are immune to anemone stings",
      "Live in hierarchical communities"
    ],
    threats: ["Coral Bleaching", "Ocean Acidification", "Collection for Aquarium Trade"],
    discoveryYear: 1830,
    sources: ["FishBase", "Reef Life Survey"],
    lastUpdated: "2024-01-15"
  },
  {
    id: "sea-turtle-green",
    scientificName: "Chelonia mydas",
    commonName: "Green Sea Turtle",
    family: "Cheloniidae",
    order: "Testudines",
    phylum: "Chordata",
    kingdom: "Animalia",
    habitat: ["Coastal Waters", "Seagrass Beds", "Coral Reefs"],
    depth: { min: 0, max: 290, unit: "meters" },
    distribution: ["Tropical and Subtropical Oceans Worldwide"],
    conservationStatus: "Endangered",
    size: {
      length: { min: 80, max: 120, unit: "cm" },
      weight: { min: 68, max: 190, unit: "kg" }
    },
    diet: ["Seagrass", "Algae", "Jellyfish (juveniles)"],
    lifespan: 80,
    description: "The green sea turtle is a large sea turtle of the family Cheloniidae. It is the only species in the genus Chelonia. Its range extends throughout tropical and subtropical seas around the world.",
    images: [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800"
    ],
    facts: [
      "Can hold their breath for up to 5 hours",
      "Navigate using Earth's magnetic field",
      "Return to the beach where they were born to lay eggs",
      "Can live over 80 years",
      "Change diet from carnivorous to herbivorous as they age"
    ],
    threats: ["Plastic Pollution", "Climate Change", "Coastal Development", "Fishing Gear"],
    discoveryYear: 1758,
    sources: ["IUCN Red List", "Sea Turtle Conservancy"],
    lastUpdated: "2024-01-15"
  },
  {
    id: "giant-squid",
    scientificName: "Architeuthis dux",
    commonName: "Giant Squid",
    family: "Architeuthidae",
    order: "Oegopsida",
    phylum: "Mollusca",
    kingdom: "Animalia",
    habitat: ["Deep Ocean", "Abyssal Plains"],
    depth: { min: 300, max: 1000, unit: "meters" },
    distribution: ["All Oceans Worldwide"],
    conservationStatus: "Data Deficient",
    size: {
      length: { min: 10, max: 18, unit: "meters" }
    },
    diet: ["Deep Sea Fish", "Other Squid", "Crustaceans"],
    lifespan: 5,
    description: "The giant squid is a species of deep-ocean dwelling squid in the family Architeuthidae. It can grow to a tremendous size, offering an example of deep-sea gigantism.",
    images: [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800"
    ],
    facts: [
      "Has the largest eyes in the animal kingdom",
      "Can grow tentacles up to 18 meters long",
      "Has three hearts and blue blood",
      "Main predator is the sperm whale",
      "Was considered mythical until photographed alive in 2004"
    ],
    threats: ["Deep Sea Fishing", "Climate Change", "Ocean Pollution"],
    discoveryYear: 1857,
    sources: ["Marine Biology Research", "Deep Sea Biology"],
    lastUpdated: "2024-01-15"
  },
  {
    id: "coral-staghorn",
    scientificName: "Acropora cervicornis",
    commonName: "Staghorn Coral",
    family: "Acroporidae",
    order: "Scleractinia",
    phylum: "Cnidaria",
    kingdom: "Animalia",
    habitat: ["Shallow Coral Reefs", "Reef Slopes"],
    depth: { min: 1, max: 30, unit: "meters" },
    distribution: ["Caribbean Sea", "Western Atlantic"],
    conservationStatus: "Critically Endangered",
    size: {
      length: { min: 30, max: 200, unit: "cm" }
    },
    diet: ["Zooplankton", "Photosynthesis via Symbiotic Algae"],
    lifespan: 100,
    description: "Staghorn coral is a branching coral with cylindrical branches ranging from a few centimeters to over two meters in length. It is one of the most important reef-building corals in the Caribbean.",
    images: [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800"
    ],
    facts: [
      "Fastest growing coral species",
      "Can grow 10-20 cm per year",
      "Provides habitat for over 65 fish species",
      "Has declined by 97% since the 1970s",
      "Reproduces through fragmentation and spawning"
    ],
    threats: ["Ocean Acidification", "Coral Bleaching", "Disease", "Hurricane Damage", "Pollution"],
    discoveryYear: 1786,
    sources: ["NOAA Coral Reef Conservation", "IUCN Red List"],
    lastUpdated: "2024-01-15"
  },
  {
    id: "dolphin-bottlenose",
    scientificName: "Tursiops truncatus",
    commonName: "Bottlenose Dolphin",
    family: "Delphinidae",
    order: "Artiodactyla",
    phylum: "Chordata",
    kingdom: "Animalia",
    habitat: ["Coastal Waters", "Open Ocean", "Estuaries"],
    depth: { min: 0, max: 500, unit: "meters" },
    distribution: ["Worldwide in Tropical and Temperate Waters"],
    conservationStatus: "Least Concern",
    size: {
      length: { min: 2, max: 4, unit: "meters" },
      weight: { min: 150, max: 650, unit: "kg" }
    },
    diet: ["Fish", "Squid", "Crustaceans"],
    lifespan: 45,
    description: "The common bottlenose dolphin is a toothed whale belonging to the genus Tursiops. They are the most well-known species of dolphin and are highly intelligent marine mammals.",
    images: [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800"
    ],
    facts: [
      "Have unique signature whistles like names",
      "Can recognize themselves in mirrors",
      "Use tools like sponges to protect their noses",
      "Have complex social structures",
      "Can learn and teach behaviors to offspring"
    ],
    threats: ["Pollution", "Fishing Net Entanglement", "Boat Strikes", "Habitat Loss"],
    discoveryYear: 1821,
    sources: ["Marine Mammal Science", "NOAA Fisheries"],
    lastUpdated: "2024-01-15"
  },
  {
    id: "octopus-giant-pacific",
    scientificName: "Enteroctopus dofleini",
    commonName: "Giant Pacific Octopus",
    family: "Enteroctopodidae",
    order: "Octopoda",
    phylum: "Mollusca",
    kingdom: "Animalia",
    habitat: ["Rocky Reefs", "Kelp Forests", "Deep Waters"],
    depth: { min: 0, max: 2000, unit: "meters" },
    distribution: ["North Pacific Ocean"],
    conservationStatus: "Least Concern",
    size: {
      length: { min: 3, max: 9, unit: "meters" },
      weight: { min: 10, max: 270, unit: "kg" }
    },
    diet: ["Crabs", "Fish", "Sharks", "Birds"],
    lifespan: 5,
    description: "The giant Pacific octopus is the largest known octopus species. They are highly intelligent cephalopods capable of problem-solving and using tools.",
    images: [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800"
    ],
    facts: [
      "Has three hearts and blue blood",
      "Can change color and texture instantly",
      "Has excellent problem-solving abilities",
      "Each arm has a mind of its own",
      "Can squeeze through any opening larger than its beak"
    ],
    threats: ["Overfishing", "Climate Change", "Ocean Acidification"],
    discoveryYear: 1841,
    sources: ["Marine Biology", "Cephalopod Research"],
    lastUpdated: "2024-01-15"
  },
  {
    id: "manta-ray",
    scientificName: "Mobula birostris",
    commonName: "Giant Manta Ray",
    family: "Mobulidae",
    order: "Myliobatiformes",
    phylum: "Chordata",
    kingdom: "Animalia",
    habitat: ["Open Ocean", "Coral Reefs", "Cleaning Stations"],
    depth: { min: 0, max: 1000, unit: "meters" },
    distribution: ["Tropical and Subtropical Waters Worldwide"],
    conservationStatus: "Endangered",
    size: {
      length: { min: 4, max: 9, unit: "meters" }
    },
    diet: ["Plankton", "Small Fish", "Krill"],
    lifespan: 40,
    description: "The giant manta ray is the largest ray and one of the largest fishes in the world. Known for their intelligence and gentle nature, they are filter feeders that gracefully glide through the ocean.",
    images: [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800"
    ],
    facts: [
      "Has the largest brain-to-body ratio of any fish",
      "Each individual has unique spot patterns",
      "Can leap completely out of the water",
      "Visits cleaning stations regularly",
      "Shows self-awareness and curiosity"
    ],
    threats: ["Fishing for Gill Plates", "Bycatch", "Pollution", "Climate Change"],
    discoveryYear: 1798,
    sources: ["Manta Trust", "IUCN Red List"],
    lastUpdated: "2024-01-15"
  },
  {
    id: "seahorse-lined",
    scientificName: "Hippocampus erectus",
    commonName: "Lined Seahorse",
    family: "Syngnathidae",
    order: "Syngnathiformes",
    phylum: "Chordata",
    kingdom: "Animalia",
    habitat: ["Seagrass Beds", "Coral Reefs", "Mangroves"],
    depth: { min: 0, max: 230, unit: "meters" },
    distribution: ["Western Atlantic Ocean", "Gulf of Mexico", "Caribbean"],
    conservationStatus: "Vulnerable",
    size: {
      length: { min: 12, max: 19, unit: "cm" }
    },
    diet: ["Small Crustaceans", "Zooplankton", "Fish Larvae"],
    lifespan: 4,
    description: "The lined seahorse is a species of fish that belongs to the seahorse genus Hippocampus. They are known for their unique appearance and the male's ability to carry and give birth to young.",
    images: [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800"
    ],
    facts: [
      "Males give birth to the babies",
      "Eyes can move independently",
      "Tail is prehensile like a monkey's",
      "No stomach - food passes through quickly",
      "Can change color to match surroundings"
    ],
    threats: ["Habitat Loss", "Pollution", "Collection for Traditional Medicine", "Aquarium Trade"],
    discoveryYear: 1810,
    sources: ["FishBase", "Seahorse Conservation"],
    lastUpdated: "2024-01-15"
  }
];

class MarineDatabase {
  private species: MarineSpeciesDetail[] = MARINE_SPECIES_DATABASE;

  // Search species by name (common or scientific)
  searchByName(query: string): MarineSpeciesDetail[] {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return [];

    return this.species.filter(species =>
      species.commonName.toLowerCase().includes(searchTerm) ||
      species.scientificName.toLowerCase().includes(searchTerm) ||
      species.family.toLowerCase().includes(searchTerm) ||
      species.order.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by habitat
  filterByHabitat(habitat: string): MarineSpeciesDetail[] {
    return this.species.filter(species =>
      species.habitat.some(h => h.toLowerCase().includes(habitat.toLowerCase()))
    );
  }

  // Filter by conservation status
  filterByConservationStatus(status: string): MarineSpeciesDetail[] {
    return this.species.filter(species =>
      species.conservationStatus.toLowerCase().includes(status.toLowerCase())
    );
  }

  // Filter by depth range
  filterByDepth(minDepth: number, maxDepth: number): MarineSpeciesDetail[] {
    return this.species.filter(species =>
      species.depth.max >= minDepth && species.depth.min <= maxDepth
    );
  }

  // Get species by ID
  getSpeciesById(id: string): MarineSpeciesDetail | undefined {
    return this.species.find(species => species.id === id);
  }

  // Get random species
  getRandomSpecies(count: number = 1): MarineSpeciesDetail[] {
    const shuffled = [...this.species].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Get all species
  getAllSpecies(): MarineSpeciesDetail[] {
    return [...this.species];
  }

  // Advanced search with multiple filters
  advancedSearch({
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
  }): MarineSpeciesDetail[] {
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

  // Get statistics about the database
  getStatistics() {
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
      averageLifespan: this.species.reduce((sum, s) => sum + s.lifespan, 0) / totalSpecies
    };
  }
}

export const marineDatabase = new MarineDatabase();
export default marineDatabase;
