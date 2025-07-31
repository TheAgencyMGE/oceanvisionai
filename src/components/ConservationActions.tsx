import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, MapPin, Calendar, Users, Star, CheckCircle, ExternalLink, Heart } from "lucide-react";

interface ConservationAction {
  id: string;
  title: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  effort: "Easy" | "Moderate" | "Challenging";
  timeframe: string;
  category: "Individual" | "Community" | "Global";
  icon: React.ElementType;
  benefits: string[];
  steps: string[];
}

const conservationActions: ConservationAction[] = [
  {
    id: "reduce-plastic",
    title: "Reduce Single-Use Plastics",
    description: "Switch to reusable alternatives and drastically reduce ocean plastic pollution",
    impact: "High",
    effort: "Easy",
    timeframe: "Immediate",
    category: "Individual",
    icon: Leaf,
    benefits: [
      "Prevent 500+ plastic items from entering ocean annually",
      "Save marine animals from plastic ingestion",
      "Reduce microplastics in food chain"
    ],
    steps: [
      "Carry a reusable water bottle",
      "Use reusable shopping bags",
      "Choose products with minimal packaging",
      "Replace plastic straws with reusable alternatives"
    ]
  },
  {
    id: "beach-cleanup",
    title: "Organize Beach Cleanups",
    description: "Remove harmful debris from coastal areas and raise community awareness",
    impact: "High",
    effort: "Moderate",
    timeframe: "Monthly",
    category: "Community",
    icon: Users,
    benefits: [
      "Directly remove tons of ocean-bound trash",
      "Protect nesting sites for sea turtles",
      "Build community environmental awareness"
    ],
    steps: [
      "Find local environmental groups",
      "Coordinate with beach authorities",
      "Gather supplies (gloves, bags, data sheets)",
      "Document and share results"
    ]
  },
  {
    id: "sustainable-seafood",
    title: "Choose Sustainable Seafood",
    description: "Support fishing practices that maintain healthy ocean ecosystems",
    impact: "Medium",
    effort: "Easy",
    timeframe: "Ongoing",
    category: "Individual",
    icon: Star,
    benefits: [
      "Support sustainable fishing practices",
      "Prevent overfishing of vulnerable species",
      "Maintain marine ecosystem balance"
    ],
    steps: [
      "Use seafood guides (MSC certified)",
      "Ask restaurants about sourcing",
      "Choose seasonal and local options",
      "Reduce overall seafood consumption"
    ]
  },
  {
    id: "coral-adoption",
    title: "Adopt a Coral Reef",
    description: "Support coral restoration and marine protected area initiatives",
    impact: "High",
    effort: "Easy",
    timeframe: "Long-term",
    category: "Global",
    icon: Heart,
    benefits: [
      "Fund coral restoration projects",
      "Protect critical marine habitats",
      "Support marine biodiversity hotspots"
    ],
    steps: [
      "Research reputable organizations",
      "Choose adoption program",
      "Make monthly contribution",
      "Share updates with friends"
    ]
  },
  {
    id: "carbon-footprint",
    title: "Reduce Carbon Footprint",
    description: "Combat ocean acidification by reducing CO2 emissions",
    impact: "High",
    effort: "Moderate",
    timeframe: "Ongoing",
    category: "Individual",
    icon: Leaf,
    benefits: [
      "Reduce ocean acidification",
      "Slow coral bleaching events",
      "Mitigate sea level rise"
    ],
    steps: [
      "Use public transportation or bike",
      "Switch to renewable energy",
      "Reduce air travel",
      "Support carbon offset programs"
    ]
  },
  {
    id: "education-advocacy",
    title: "Ocean Education & Advocacy",
    description: "Spread awareness and advocate for marine protection policies",
    impact: "Medium",
    effort: "Moderate",
    timeframe: "Ongoing",
    category: "Community",
    icon: Users,
    benefits: [
      "Multiply impact through education",
      "Influence policy decisions",
      "Build environmental movement"
    ],
    steps: [
      "Share marine conservation content",
      "Contact local representatives",
      "Support ocean protection legislation",
      "Educate friends and family"
    ]
  }
];

const ConservationActions = () => {
  const [selectedAction, setSelectedAction] = useState<ConservationAction | null>(null);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const markAsCompleted = (actionId: string) => {
    setCompletedActions(prev => new Set([...prev, actionId]));
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Low": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "Easy": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Moderate": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Challenging": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <section id="conservation" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Leaf className="w-12 h-12 text-marine-kelp animate-sway" />
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-ocean">
              Conservation Actions
            </h2>
            <Heart className="w-12 h-12 text-marine-coral animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take personalized action to protect marine life. Every action counts towards a healthier ocean!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Action Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {conservationActions.map((action) => (
              <Card 
                key={action.id} 
                className={`marine-card p-6 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  selectedAction?.id === action.id ? 'ring-2 ring-accent shadow-ocean' : ''
                } ${
                  completedActions.has(action.id) ? 'bg-green-500/5 border-green-500/30' : ''
                }`}
                onClick={() => setSelectedAction(action)}
              >
                {completedActions.has(action.id) && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <action.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge className={getImpactColor(action.impact)}>
                      {action.impact} Impact
                    </Badge>
                    <Badge className={getEffortColor(action.effort)}>
                      {action.effort}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {action.timeframe}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {action.category}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Detailed Action View */}
          {selectedAction && (
            <Card className="marine-card p-8 animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-ocean rounded-full -translate-y-16 translate-x-16 opacity-5" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-accent/10 rounded-xl">
                      <selectedAction.icon className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gradient-ocean mb-2">
                        {selectedAction.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedAction.description}
                      </p>
                    </div>
                  </div>
                  
                  {!completedActions.has(selectedAction.id) && (
                    <Button
                      variant="coral"
                      onClick={() => markAsCompleted(selectedAction.id)}
                      className="flex-shrink-0"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Complete
                    </Button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Benefits */}
                  <div>
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5 text-marine-coral" />
                      Environmental Benefits
                    </h4>
                    <ul className="space-y-2">
                      {selectedAction.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-marine-coral rounded-full mt-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Steps */}
                  <div>
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      Action Steps
                    </h4>
                    <ol className="space-y-2">
                      {selectedAction.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="w-5 h-5 bg-accent/10 text-accent text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Resource Links */}
                <div className="pt-6 border-t border-accent/20">
                  <h4 className="font-bold mb-4">Helpful Resources</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" className="group">
                      <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Learn More
                    </Button>
                    <Button variant="outline" size="sm" className="group">
                      <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Find Local Groups
                    </Button>
                    <Button variant="outline" size="sm" className="group">
                      <MapPin className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Track Progress
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Progress Summary */}
          {completedActions.size > 0 && (
            <Card className="marine-card p-6 mt-8 text-center animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-8 h-8 text-marine-coral" />
                  <h3 className="text-xl font-bold">Amazing Progress!</h3>
                </div>
                <p className="text-muted-foreground">
                  You've completed {completedActions.size} out of {conservationActions.length} conservation actions.
                  Keep up the great work protecting our oceans! 🌊
                </p>
                <div className="w-full bg-accent/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-ocean h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(completedActions.size / conservationActions.length) * 100}%` }}
                  />
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConservationActions;