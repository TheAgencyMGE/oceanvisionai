import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Sparkles, Globe, Heart, ArrowDown, Play, ChevronRight, Zap, Shield, Target } from "lucide-react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
    >
      {/* Animated Ocean Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-radial opacity-40 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(29, 78, 216, 0.15), transparent 40%)`
          }}
        />
        
        {/* Animated waves */}
        <div className="absolute inset-0">
          <svg className="absolute bottom-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                <stop offset="50%" stopColor="rgba(29, 78, 216, 0.6)" />
                <stop offset="100%" stopColor="rgba(30, 41, 59, 0.8)" />
              </linearGradient>
            </defs>
            <path 
              fill="url(#wave-gradient)" 
              className="animate-pulse"
              d="M0,192L48,208C96,224,192,256,288,250.7C384,245,480,203,576,192C672,181,768,203,864,213.3C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 animate-float ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 6 + 8}s`,
              transition: 'opacity 2s ease-in-out'
            }}
          />
        ))}

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Content */}
          <div className={`text-center space-y-12 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full text-blue-200 text-sm font-medium">
              <Zap className="w-4 h-4 text-yellow-400" />
              Powered by Advanced AI Technology
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight tracking-tight">
                OceanVision AI
              </h1>
              
              <div className="flex items-center justify-center gap-4 text-xl md:text-2xl text-blue-200 font-semibold">
                <Heart className="w-6 h-6 text-red-400 animate-pulse" />
                <span>Shazam for Ocean Life</span>
                <Heart className="w-6 h-6 text-red-400 animate-pulse" />
              </div>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
                Harness the power of artificial intelligence to instantly identify marine species, 
                discover conservation insights, and take meaningful action to protect our planet's most 
                precious ecosystems. Every photo becomes a gateway to understanding life beneath the waves.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button
                size="lg"
                onClick={() => scrollToSection("species-id")}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Camera className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-semibold text-lg">Start Identifying</span>
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("ocean-explorer")}
                className="group px-8 py-4 rounded-xl border-2 border-blue-400/50 text-blue-200 hover:bg-blue-500/10 hover:border-blue-400 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-semibold text-lg">Watch Demo</span>
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {[
                { icon: Target, text: "99% Accuracy", color: "from-green-500/20 to-emerald-500/20 border-green-400/30" },
                { icon: Shield, text: "Privacy First", color: "from-blue-500/20 to-indigo-500/20 border-blue-400/30" },
                { icon: Globe, text: "Global Database", color: "from-purple-500/20 to-pink-500/20 border-purple-400/30" }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${feature.color} backdrop-blur-sm border rounded-full text-slate-200 text-sm font-medium transition-all duration-300 hover:scale-105`}
                >
                  <feature.icon className="w-4 h-4" />
                  {feature.text}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {[
              { value: "71%", label: "of Earth's surface is ocean", gradient: "from-blue-400 to-cyan-400" },
              { value: "230,000+", label: "known marine species", gradient: "from-purple-400 to-pink-400" },
              { value: "80%", label: "of ocean remains unexplored", gradient: "from-teal-400 to-green-400" }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl backdrop-blur-sm bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm font-medium leading-relaxed">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className={`flex justify-center mt-16 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors cursor-pointer group" 
                 onClick={() => scrollToSection("species-id")}>
              <span className="text-sm font-medium">Discover More</span>
              <ArrowDown className="w-6 h-6 animate-bounce group-hover:text-blue-400 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;