import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { BarChart3, Trash2, Droplets, Car, ShoppingBag, Lightbulb, Heart, TreePine } from "lucide-react";

interface ImpactData {
  plasticBottles: number;
  carTrips: number;
  shoppingBags: number;
  energyUsage: number;
}

interface ImpactResults {
  plasticSaved: number;
  co2Reduced: number;
  marineLifeSaved: number;
  oceanAreaProtected: number;
}

const ImpactCalculator = () => {
  const [impactData, setImpactData] = useState<ImpactData>({
    plasticBottles: 5,
    carTrips: 2,
    shoppingBags: 3,
    energyUsage: 20,
  });

  const [results, setResults] = useState<ImpactResults | null>(null);

  const calculateImpact = () => {
    // Calculate environmental impact based on user choices
    const plasticSaved = impactData.plasticBottles * 365 * 0.025; // kg per year
    const co2Reduced = (impactData.carTrips * 52 * 4.6) + (impactData.energyUsage * 365 * 0.001); // kg CO2 per year
    const marineLifeSaved = Math.floor(plasticSaved * 2.3); // estimated animals saved
    const oceanAreaProtected = plasticSaved * 0.1; // square meters protected

    setResults({
      plasticSaved: Math.round(plasticSaved * 100) / 100,
      co2Reduced: Math.round(co2Reduced * 100) / 100,
      marineLifeSaved,
      oceanAreaProtected: Math.round(oceanAreaProtected * 100) / 100,
    });
  };

  const impacts = [
    {
      icon: Trash2,
      label: "Reusable Water Bottles",
      description: "Instead of single-use plastic bottles per week",
      value: impactData.plasticBottles,
      max: 20,
      unit: "bottles",
      color: "text-blue-500",
      onChange: (value: number[]) => setImpactData(prev => ({ ...prev, plasticBottles: value[0] }))
    },
    {
      icon: Car,
      label: "Reduced Car Trips",
      description: "Fewer car trips per week (walk, bike, or public transport)",
      value: impactData.carTrips,
      max: 10,
      unit: "trips",
      color: "text-green-500",
      onChange: (value: number[]) => setImpactData(prev => ({ ...prev, carTrips: value[0] }))
    },
    {
      icon: ShoppingBag,
      label: "Reusable Shopping Bags",
      description: "Instead of plastic bags per week",
      value: impactData.shoppingBags,
      max: 15,
      unit: "bags",
      color: "text-orange-500",
      onChange: (value: number[]) => setImpactData(prev => ({ ...prev, shoppingBags: value[0] }))
    },
    {
      icon: Lightbulb,
      label: "Energy Conservation",
      description: "Percentage reduction in energy usage",
      value: impactData.energyUsage,
      max: 50,
      unit: "%",
      color: "text-yellow-500",
      onChange: (value: number[]) => setImpactData(prev => ({ ...prev, energyUsage: value[0] }))
    }
  ];

  return (
    <section id="impact-calculator" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BarChart3 className="w-12 h-12 text-accent animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-ocean">
              Ocean Impact Calculator
            </h2>
            <Heart className="w-12 h-12 text-marine-coral animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how your daily choices directly impact marine life. Small changes create waves of positive change!
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Input Controls */}
          <div className="grid md:grid-cols-2 gap-6">
            {impacts.map((impact, index) => (
              <Card key={index} className="marine-card p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-coral rounded-full -translate-y-8 translate-x-8 opacity-10" />
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <impact.icon className={`w-8 h-8 ${impact.color}`} />
                    <div>
                      <h3 className="font-bold text-lg">{impact.label}</h3>
                      <p className="text-sm text-muted-foreground">{impact.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Current: {impact.value} {impact.unit}</span>
                      <span className="text-xs text-muted-foreground">Max: {impact.max}</span>
                    </div>
                    
                    <Slider
                      value={[impact.value]}
                      onValueChange={impact.onChange}
                      max={impact.max}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Calculate Button */}
          <div className="text-center">
            <Button
              variant="hero"
              size="hero"
              onClick={calculateImpact}
              className="group"
            >
              <BarChart3 className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              Calculate Your Ocean Impact
              <Droplets className="w-4 h-4 ml-2 group-hover:animate-bounce" />
            </Button>
          </div>

          {/* Results */}
          {results && (
            <div className="animate-fade-in">
              <Card className="marine-card p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-ocean opacity-5" />
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gradient-ocean mb-2">
                      Your Annual Ocean Impact
                    </h3>
                    <p className="text-muted-foreground">
                      Here's how your choices help protect marine life and our oceans
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center">
                        <Trash2 className="w-8 h-8 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-500">{results.plasticSaved}</div>
                        <div className="text-sm font-medium">kg plastic saved</div>
                        <div className="text-xs text-muted-foreground">
                          Equivalent to {Math.floor(results.plasticSaved * 40)} plastic bottles
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                        <TreePine className="w-8 h-8 text-green-500" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-green-500">{results.co2Reduced}</div>
                        <div className="text-sm font-medium">kg CO2 reduced</div>
                        <div className="text-xs text-muted-foreground">
                          Like planting {Math.floor(results.co2Reduced / 21)} trees
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto bg-marine-coral/20 rounded-full flex items-center justify-center">
                        <Heart className="w-8 h-8 text-marine-coral" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-marine-coral">{results.marineLifeSaved}</div>
                        <div className="text-sm font-medium">marine animals helped</div>
                        <div className="text-xs text-muted-foreground">
                          Fish, turtles, seabirds, and more
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                        <Droplets className="w-8 h-8 text-accent" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-accent">{results.oceanAreaProtected}</div>
                        <div className="text-sm font-medium">m² ocean protected</div>
                        <div className="text-xs text-muted-foreground">
                          Size of a small swimming pool
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action suggestions */}
                  <div className="mt-8 p-6 bg-accent/5 rounded-lg border border-accent/20">
                    <h4 className="font-bold text-lg mb-4 text-center">🌊 Take Action Today!</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium mb-1">🐢 Beach Cleanup</div>
                        <div className="text-muted-foreground">Join local cleanup events</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium mb-1">🌿 Reef-Safe Products</div>
                        <div className="text-muted-foreground">Choose eco-friendly alternatives</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium mb-1">📢 Spread Awareness</div>
                        <div className="text-muted-foreground">Share your impact with friends</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImpactCalculator;