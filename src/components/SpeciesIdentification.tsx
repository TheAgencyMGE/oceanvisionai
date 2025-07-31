import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, Loader2, Fish, AlertTriangle, Heart, MapPin } from "lucide-react";
import { toast } from "sonner";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const VISION_API_KEY = import.meta.env.VITE_GOOGLE_VISION_API_KEY;

// Check if API keys are available
if (!API_KEY || !VISION_API_KEY) {
  console.warn('Google Vision AI API keys are not configured. Please add VITE_GOOGLE_API_KEY and VITE_GOOGLE_VISION_API_KEY to your .env file.');
}

interface SpeciesData {
  name: string;
  scientificName: string;
  description: string;
  conservationStatus: string;
  threats: string[];
  habitat: string;
  funFacts: string[];
  ecologicalRole: string;
}

const SpeciesIdentification = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [speciesData, setSpeciesData] = useState<SpeciesData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image too large. Please select an image under 10MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setSpeciesData(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    // Check if API keys are configured
    if (!VISION_API_KEY) {
      toast.error("Google Vision AI API key is not configured. Please check your environment variables.");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Convert image to base64 without data URL prefix
      const base64Image = selectedImage.split(',')[1];

      const requestBody = {
        contents: [{
          parts: [
            {
              text: `Analyze this marine life image and provide detailed information. If this is not marine life, please indicate that. Respond in JSON format with the following structure:
              {
                "name": "Common name of the species",
                "scientificName": "Scientific name",
                "description": "Detailed description of the species",
                "conservationStatus": "Current conservation status (e.g., Endangered, Vulnerable, Least Concern)",
                "threats": ["List of major threats to this species"],
                "habitat": "Description of natural habitat",
                "funFacts": ["3-4 interesting facts about this species"],
                "ecologicalRole": "Role this species plays in the marine ecosystem"
              }`
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: base64Image
              }
            }
          ]
        }]
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${VISION_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!content) {
        throw new Error("No content received from API");
      }

      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not parse species data from response");
      }

      const parsedData = JSON.parse(jsonMatch[0]);
      setSpeciesData(parsedData);
      toast.success("Species identified successfully!");

    } catch (error) {
      console.error("Error analyzing image:", error);
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('endangered') || lowerStatus.includes('critical')) return 'text-red-500';
    if (lowerStatus.includes('vulnerable') || lowerStatus.includes('threatened')) return 'text-orange-500';
    if (lowerStatus.includes('near threatened')) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <section id="species-id" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Fish className="w-12 h-12 text-accent animate-sway" />
            <h2 className="text-4xl md:text-5xl font-bold text-gradient-ocean">
              AI Species Recognition
            </h2>
            <Camera className="w-12 h-12 text-accent animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload any photo of marine life and our AI will instantly identify the species, 
            providing conservation status, threats, and fascinating insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Section */}
          <Card className="marine-card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-coral rounded-full -translate-y-10 translate-x-10 opacity-20" />
            
            <h3 className="text-2xl font-bold mb-6 text-center">Upload Marine Life Photo</h3>
            
            <div className="space-y-6">
              {/* Image upload area */}
              <div
                className={`border-2 border-dashed border-accent/30 rounded-xl p-8 text-center transition-all duration-300 hover:border-accent/60 hover:bg-accent/5 cursor-pointer ${
                  selectedImage ? 'border-accent' : ''
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="Selected marine life"
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-ocean"
                    />
                    <p className="text-sm text-muted-foreground">Click to select a different image</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-16 h-16 mx-auto text-accent animate-pulse" />
                    <div>
                      <p className="text-lg font-medium">Drop your image here or click to upload</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Supports JPG, PNG, WebP (max 10MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Action buttons */}
              <div className="flex gap-4">
                <Button
                  variant="ocean"
                  size="lg"
                  onClick={analyzeImage}
                  disabled={!selectedImage || isAnalyzing}
                  className="flex-1"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5 mr-2" />
                      Identify Species
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Choose File
                </Button>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="marine-card p-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-ocean rounded-full translate-y-8 -translate-x-8 opacity-20" />
            
            {speciesData ? (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center border-b border-accent/20 pb-6">
                  <h3 className="text-2xl font-bold text-gradient-ocean">{speciesData.name}</h3>
                  <p className="text-lg italic text-muted-foreground">{speciesData.scientificName}</p>
                  <div className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-accent/10 ${getStatusColor(speciesData.conservationStatus)}`}>
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">{speciesData.conservationStatus}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Fish className="w-4 h-4 text-accent" />
                      Description
                    </h4>
                    <p className="text-sm leading-relaxed">{speciesData.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      Habitat
                    </h4>
                    <p className="text-sm leading-relaxed">{speciesData.habitat}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-marine-coral" />
                      Ecological Role
                    </h4>
                    <p className="text-sm leading-relaxed">{speciesData.ecologicalRole}</p>
                  </div>

                  {speciesData.threats.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        Major Threats
                      </h4>
                      <ul className="space-y-1">
                        {speciesData.threats.map((threat, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                            {threat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {speciesData.funFacts.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-accent" />
                        Fun Facts
                      </h4>
                      <ul className="space-y-1">
                        {speciesData.funFacts.map((fact, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Fish className="w-16 h-16 text-muted-foreground/30 mb-4 animate-sway" />
                <h3 className="text-xl font-medium text-muted-foreground mb-2">
                  Ready for Analysis
                </h3>
                <p className="text-muted-foreground">
                  Upload an image to discover fascinating details about marine life!
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SpeciesIdentification;