import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Database, 
  Fish, 
  Heart, 
  MapPin, 
  Ruler, 
  Clock, 
  Shield, 
  Info, 
  ExternalLink,
  ChevronDown,
  Star,
  Waves,
  Eye,
  BookOpen,
  Loader2
} from "lucide-react";
import { marineDatabase, type MarineSpeciesDetail } from "@/utils/marineDatabase";
import { toast } from "sonner";

const MarineDatabaseSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MarineSpeciesDetail[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<MarineSpeciesDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState<{
    totalSpecies: number;
    conservationCounts: Record<string, number>;
    habitatCounts: Record<string, number>;
    averageLifespan: number;
    lastUpdated: string;
    sources: string[];
  } | null>(null);
  const [filters, setFilters] = useState({
    habitat: "",
    conservationStatus: "",
    minDepth: "",
    maxDepth: "",
    diet: ""
  });

  // Initialize with random species
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [randomSpecies, databaseStats] = await Promise.all([
          marineDatabase.getRandomSpecies(6),
          marineDatabase.getStatistics()
        ]);
        setSearchResults(randomSpecies);
        setStats(databaseStats);
      } catch (error) {
        console.error('Failed to load initial species data:', error);
        toast.error('Failed to load species data');
      }
    };
    
    loadInitialData();
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay for realistic feel
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let results: MarineSpeciesDetail[] = [];
      
      if (!query.trim() && !hasActiveFilters()) {
        // No search query and no filters - show random species
        results = await marineDatabase.getRandomSpecies(6);
      } else if (hasActiveFilters()) {
        // Use advanced search with filters
        results = await marineDatabase.advancedSearch({
          name: query,
          habitat: filters.habitat,
          conservationStatus: filters.conservationStatus,
          minDepth: filters.minDepth ? parseInt(filters.minDepth) : undefined,
          maxDepth: filters.maxDepth ? parseInt(filters.maxDepth) : undefined,
          diet: filters.diet
        });
      } else {
        // Simple name search
        results = await marineDatabase.searchByName(query);
      }
      
      setSearchResults(results);
      
      if (results.length === 0) {
        toast.error(`No species found matching "${query}"`);
      } else {
        toast.success(`Found ${results.length} species`);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed - please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some(value => value.trim() !== "");
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    handleSearch(searchQuery);
  };

  const clearFilters = () => {
    setFilters({
      habitat: "",
      conservationStatus: "",
      minDepth: "",
      maxDepth: "",
      diet: ""
    });
    handleSearch(searchQuery);
  };

  const getConservationColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('critically endangered')) return 'bg-red-600 text-white';
    if (lowerStatus.includes('endangered')) return 'bg-red-500 text-white';
    if (lowerStatus.includes('vulnerable')) return 'bg-orange-500 text-white';
    if (lowerStatus.includes('near threatened')) return 'bg-yellow-500 text-black';
    if (lowerStatus.includes('least concern')) return 'bg-green-500 text-white';
    return 'bg-gray-500 text-white';
  };

  const formatSize = (size: MarineSpeciesDetail['size']) => {
    if (size.weight) {
      return `${size.length.min}-${size.length.max} ${size.length.unit}, ${size.weight.min}-${size.weight.max} ${size.weight.unit}`;
    }
    return `${size.length.min}-${size.length.max} ${size.length.unit}`;
  };

  return (
    <section id="marine-database" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Database className="w-12 h-12 text-accent animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-ocean">
              Marine Species Database
            </h2>
            <BookOpen className="w-12 h-12 text-accent animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore our comprehensive database of marine life from around the world. 
            Search by name, habitat, conservation status, and more to discover fascinating ocean creatures.
          </p>
          
          {/* Database Stats */}
                    {/* Database Stats */}
          {stats ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 p-4 rounded-lg border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-600">{stats.totalSpecies}</div>
                <div className="text-sm text-muted-foreground">Species</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/20 p-4 rounded-lg border border-green-500/20">
                <div className="text-2xl font-bold text-green-600">{Object.keys(stats.habitatCounts).length}</div>
                <div className="text-sm text-muted-foreground">Habitats</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 p-4 rounded-lg border border-purple-500/20">
                <div className="text-2xl font-bold text-purple-600">{Math.round(stats.averageLifespan)}</div>
                <div className="text-sm text-muted-foreground">Avg Lifespan</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/20 p-4 rounded-lg border border-orange-500/20">
                <div className="text-2xl font-bold text-orange-600">{Object.keys(stats.conservationCounts).length}</div>
                <div className="text-sm text-muted-foreground">Status Types</div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          )}
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Search Interface */}
          <Card className="marine-card p-6">
            <div className="space-y-6">
              {/* Main Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search marine species (e.g., Great White Shark, Clownfish, Blue Whale)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  className="pl-12 pr-4 py-3 text-lg border-2 border-accent/20 focus:border-accent"
                />
                <Button
                  onClick={() => handleSearch(searchQuery)}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  size="sm"
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>

              {/* Advanced Filters Toggle */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                
                {hasActiveFilters() && (
                  <Button variant="ghost" onClick={clearFilters} size="sm">
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-muted/10 rounded-lg border">
                  <div>
                    <label className="block text-sm font-medium mb-2">Habitat</label>
                    <Input
                      placeholder="e.g., Coral Reefs"
                      value={filters.habitat}
                      onChange={(e) => handleFilterChange('habitat', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Conservation Status</label>
                    <Input
                      placeholder="e.g., Endangered"
                      value={filters.conservationStatus}
                      onChange={(e) => handleFilterChange('conservationStatus', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Min Depth (m)</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={filters.minDepth}
                      onChange={(e) => handleFilterChange('minDepth', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Depth (m)</label>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={filters.maxDepth}
                      onChange={(e) => handleFilterChange('maxDepth', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Diet</label>
                    <Input
                      placeholder="e.g., Fish"
                      value={filters.diet}
                      onChange={(e) => handleFilterChange('diet', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Search Results */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="marine-card p-6 animate-pulse">
                  <div className="bg-muted/30 rounded-lg h-48 mb-4" />
                  <div className="bg-muted/20 rounded h-6 mb-2" />
                  <div className="bg-muted/15 rounded h-4 mb-2" />
                  <div className="bg-muted/15 rounded h-4 w-3/4" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((species) => (
                <Card 
                  key={species.id} 
                  className="marine-card p-0 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedSpecies(species)}
                >
                  <div className="relative">
                    <img
                      src={species.images[0]}
                      alt={species.commonName}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Conservation Status Badge */}
                    <Badge className={`absolute top-4 right-4 ${getConservationColor(species.conservationStatus)}`}>
                      {species.conservationStatus}
                    </Badge>
                    
                    {/* Species Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{species.commonName}</h3>
                      <p className="text-sm italic opacity-90">{species.scientificName}</p>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {species.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span>{species.habitat[0]}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-accent" />
                        <span>{formatSize(species.size)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Waves className="w-4 h-4 text-accent" />
                        <span>{species.depth.min}-{species.depth.max}m</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" />
                        <span>{species.lifespan} years</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && searchResults.length === 0 && searchQuery && (
            <Card className="marine-card p-12 text-center">
              <Fish className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No Species Found</h3>
              <p className="text-muted-foreground mb-4">
                Try searching for different terms or adjusting your filters.
              </p>
              <Button onClick={() => { setSearchQuery(""); handleSearch(""); }}>
                Show Random Species
              </Button>
            </Card>
          )}
        </div>

        {/* Species Detail Modal */}
        {selectedSpecies && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="marine-card max-w-4xl max-h-[90vh] overflow-y-auto relative">
              <Button
                variant="ghost"
                onClick={() => setSelectedSpecies(null)}
                className="absolute top-4 right-4 z-10"
                size="sm"
              >
                ✕
              </Button>
              
              <div className="relative">
                <img
                  src={selectedSpecies.images[0]}
                  alt={selectedSpecies.commonName}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{selectedSpecies.commonName}</h2>
                  <p className="text-xl italic opacity-90">{selectedSpecies.scientificName}</p>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                {/* Key Info Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-accent/10 p-4 rounded-lg text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="font-semibold text-sm text-accent">Conservation</div>
                    <div className="text-sm">{selectedSpecies.conservationStatus}</div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg text-center">
                    <Ruler className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="font-semibold text-sm text-accent">Size</div>
                    <div className="text-sm">{formatSize(selectedSpecies.size)}</div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg text-center">
                    <Waves className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="font-semibold text-sm text-accent">Depth</div>
                    <div className="text-sm">{selectedSpecies.depth.min}-{selectedSpecies.depth.max}m</div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <div className="font-semibold text-sm text-accent">Lifespan</div>
                    <div className="text-sm">{selectedSpecies.lifespan} years</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-accent" />
                    Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedSpecies.description}
                  </p>
                </div>

                {/* Habitat & Distribution */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-accent" />
                      Habitat
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpecies.habitat.map((habitat, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {habitat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Fish className="w-5 h-5 text-accent" />
                      Diet
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpecies.diet.map((food, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {food}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fascinating Facts */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    Fascinating Facts
                  </h3>
                  <ul className="space-y-2">
                    {selectedSpecies.facts.map((fact, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Threats */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-red-600">
                    <Shield className="w-5 h-5" />
                    Major Threats
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpecies.threats.map((threat, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {threat}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Sources */}
                <div className="pt-4 border-t border-accent/20">
                  <h4 className="font-semibold mb-2 text-sm">Sources</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpecies.sources.map((source, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {source}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Last updated: {new Date(selectedSpecies.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default MarineDatabaseSearch;
