import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Waves, Camera, BarChart3, Globe, Leaf, Menu, X, Database } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Species ID", icon: Camera, id: "species-id" },
    { label: "Marine Database", icon: Database, id: "marine-database" },
    { label: "Ocean Explorer", icon: Globe, id: "ocean-explorer" },
    { label: "Impact Calculator", icon: BarChart3, id: "impact-calculator" },
    { label: "Conservation", icon: Leaf, id: "conservation" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-accent/20 shadow-ocean"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Waves className="w-8 h-8 text-accent animate-sway" />
              <div className="absolute inset-0 w-8 h-8 bg-accent/20 rounded-full animate-ping" />
            </div>
            <span className="text-xl font-bold text-gradient-ocean">
              OceanVision AI
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="group flex items-center gap-2"
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-card/95 backdrop-blur-lg rounded-lg border border-accent/20 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className="justify-start"
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;