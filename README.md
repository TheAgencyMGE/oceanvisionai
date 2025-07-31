# 🌊 Ocean Vision AI

An intelligent marine conservation platform that empowers users to explore, identify, and protect ocean ecosystems through advanced AI technology and comprehensive marine databases.

## 🐠 Features

**🔍 AI-Powered Species Identification**
- Upload photos to identify marine species using Google Vision AI
- Get detailed information about conservation status, habitat, and ecological role
- Learn about threats and conservation efforts for each species

**🗄️ Marine Database Search**
- Comprehensive database of marine species with detailed profiles
- Search by common name, scientific name, or characteristics
- Conservation status tracking and threat assessments

**🌐 Interactive Ocean Explorer**
- Virtual exploration of different ocean ecosystems
- Real-time marine species observations from iNaturalist API
- Learn about ocean conditions, depths, and marine environments

**📊 Environmental Impact Calculator**
- Calculate your environmental footprint's impact on marine ecosystems
- Track plastic reduction, CO2 emissions, and conservation contributions
- Get personalized recommendations for ocean-friendly actions

**🌱 Conservation Action Hub**
- Discover actionable steps to protect marine environments
- Community-driven conservation initiatives
- Track your contribution to marine protection efforts

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Google Cloud Platform account with Vision AI API enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd ocean-vision-ai-main
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file and add your Google Vision AI API keys:
   ```env
   VITE_GOOGLE_API_KEY=your_google_api_key_here
   VITE_GOOGLE_VISION_API_KEY=your_google_vision_api_key_here
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### UI & Styling
- **shadcn/ui** - High-quality React components
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### State Management & Data
- **React Query (TanStack Query)** - Server state management
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### APIs & External Services
- **Google Vision AI** - Image analysis for species identification
- **iNaturalist API** - Real marine species observation data
- **Custom Marine Database** - Curated species information

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── ConservationActions.tsx
│   ├── HeroSection.tsx
│   ├── ImpactCalculator.tsx
│   ├── MarineDatabaseSearch.tsx
│   ├── Navbar.tsx
│   ├── OceanExplorer.tsx
│   ├── ParticleBackground.tsx
│   └── SpeciesIdentification.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── pages/              # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
    ├── iNaturalistAPI.ts
    └── marineDatabase.ts
```

## 🌊 API Integration

### Google Vision AI
Used for marine species identification from user-uploaded images. Provides detailed analysis of marine life with conservation context.

**Setup:**
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Vision AI API and Generative Language API
4. Create API credentials and add them to your `.env` file

### iNaturalist API
Integrated for real-time marine species observations worldwide, providing authentic data about marine biodiversity and distribution.

### Custom Marine Database
Curated database of marine species with conservation status, threats, and ecological information.

## 🤝 Contributing

We welcome contributions to Ocean Vision AI! Whether you're interested in:

- Adding new marine species data
- Improving AI identification accuracy
- Enhancing the user interface
- Fixing bugs or adding features
- Updating conservation information

Please feel free to submit issues and pull requests.

## 🌍 Environmental Impact

Ocean Vision AI is committed to marine conservation through:

- **Education**: Raising awareness about marine biodiversity
- **Action**: Providing tools to reduce environmental impact
- **Data**: Contributing to marine species research and conservation
- **Community**: Building a network of ocean conservation advocates

## 📄 License

This project is built with modern web technologies and is designed to support marine conservation efforts worldwide.

---

**🐢 Together, We Protect Our Oceans 🐢**

*Every action counts in marine conservation. Thank you for being part of the solution and helping protect the incredible biodiversity of our planet's oceans.*
