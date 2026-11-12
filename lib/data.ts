// ============================================================
// VASU CAR TRAVELS – Data Model & Fleet Catalog
// Matching EXACTLY the customer's design reference images
// ============================================================

export interface Vehicle {
  id: number;
  name: string;
  category: string;
  image: string;
  passengers: number;
  luggage: string;
  ac: boolean;
  features: string[];
  description: string;
  badge?: string;
  ratePerKm?: string;
}

export interface TourPackage {
  id: number;
  title: string;
  duration: string;
  distance: string;
  image: string;
  description: string;
  highlights: string[];
  vehicleOptions: string[];
  category: string;
}

export const VEHICLE_CATEGORIES = [
  "All",
  "Luxury Vans",
  "SUVs & MPVs",
  "Tempo Travellers",
  "Buses",
  "Sedans",
] as const;
export type VehicleCategory = typeof VEHICLE_CATEGORIES[number];

export const VEHICLES: Vehicle[] = [
  {
    id: 1,
    name: "Force Urbania",
    category: "Luxury Vans",
    image: "/vehicles/force-urbania.jpg",
    passengers: 17,
    luggage: "Large Luggage Space",
    ac: true,
    features: [
      "16 / 17 Seater",
      "AC & Comfortable Seating",
      "Large Luggage Space",
      "Premium Interiors",
    ],
    description:
      "Luxury Passenger Van for VIP group trips, family pilgrimages, and high-end outstation journeys.",
    badge: "Top Group Pick",
    ratePerKm: "₹26 / km",
  },
  {
    id: 2,
    name: "Innova Crysta",
    category: "SUVs & MPVs",
    image: "/vehicles/innova-crysta.jpg",
    passengers: 8,
    luggage: "Spacious Cabin Storage",
    ac: true,
    features: [
      "7 / 8 Seater",
      "AC & Reclining Seats",
      "Spacious Cabin",
      "Smooth Performance",
    ],
    description:
      "India's undisputed king of family and corporate outstation travel. Supreme comfort & reliability.",
    badge: "Premium MPV",
    ratePerKm: "₹18 / km",
  },
  {
    id: 3,
    name: "Innova Hycross",
    category: "SUVs & MPVs",
    image: "/vehicles/innova-hycross.jpg",
    passengers: 7,
    luggage: "4 Bags",
    ac: true,
    features: [
      "7 Seater",
      "Advanced Safety",
      "Premium Interiors",
      "Fuel Efficient",
    ],
    description:
      "Next-generation luxury hybrid MPV delivering silky-smooth, silent highway cruising.",
    badge: "Luxury MPV",
    ratePerKm: "₹22 / km",
  },
  {
    id: 4,
    name: "Tempo Traveller",
    category: "Tempo Travellers",
    image: "/vehicles/tempo-traveller.jpg",
    passengers: 17,
    luggage: "Luggage Space",
    ac: true,
    features: [
      "9 / 12 / 17 Seater",
      "AC & Comfortable Seating",
      "Luggage Space",
      "Ideal for Groups & Families",
    ],
    description:
      "Group Travel Van ideal for family pilgrimages, Shirdi yatra, and multi-day South India holiday circuits.",
    badge: "Group Travel Van",
    ratePerKm: "₹22 / km",
  },
  {
    id: 5,
    name: "Tourist Bus",
    category: "Buses",
    image: "/vehicles/tourist-bus.jpg",
    passengers: 50,
    luggage: "Underfloor Storage",
    ac: true,
    features: [
      "30 / 40 / 50 Seater",
      "AC & Entertainment",
      "Reclining Seats",
      "Long Distance Ready",
    ],
    description:
      "Comfortable & Spacious coach with air suspension, entertainment system, and generous legroom.",
    badge: "Comfortable & Spacious",
    ratePerKm: "Contact for Quote",
  },
  {
    id: 6,
    name: "Other Cars",
    category: "Sedans",
    image: "/vehicles/sedan.jpg",
    passengers: 4,
    luggage: "Trunk Space",
    ac: true,
    features: [
      "Well Maintained",
      "Flexible Rental Plans",
      "Chauffeur Driven",
      "Affordable Rates",
    ],
    description:
      "Sedans | SUVs | Hatchbacks | More. Affordable, punctual, and comfortable cars for local and outstation trips.",
    badge: "Sedans | SUVs | Hatchbacks",
    ratePerKm: "₹12 / km",
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 1,
    title: "Tirupati Balaji Darshan Pilgrimage",
    duration: "Same Day / 1 Day",
    distance: "~140 km from Nellore",
    image: "/vehicles/explore-south-india.jpg",
    description:
      "Punctual, stress-free Tirumala & Tirupati temple tour. Includes door-to-door Nellore pickup, ghat road certified drivers, waiting assistance, and evening drop.",
    highlights: [
      "Tirumala Sri Venkateswara Swamy Darshan",
      "Alipiri & Tirupati Foothills",
      "Padmavathi Ammavari Temple (Tiruchanur)",
      "Govindaraja Swamy Temple",
    ],
    vehicleOptions: ["Innova Crysta", "Force Urbania", "Tempo Traveller", "Sedans"],
    category: "Pilgrimage",
  },
  {
    id: 2,
    title: "Chennai Metro & Mahabalipuram",
    duration: "1–2 Days",
    distance: "~170 km from Nellore",
    image: "/vehicles/scenic-road.jpg",
    description:
      "Complete coastal Chennai tour including UNESCO World Heritage monuments in Mahabalipuram, Marina Beach drive, and cultural landmarks.",
    highlights: [
      "UNESCO Shore Temple & Pancha Rathas",
      "Marina Beach & Light House Drive",
      "Kapaleeshwarar Mylapore Temple",
      "Shopping & Airport Transfers",
    ],
    vehicleOptions: ["Other Cars", "Innova Crysta", "Innova Hycross", "Force Urbania"],
    category: "City Tour",
  },
  {
    id: 3,
    title: "Ooty & Coonoor Hill Station Retreat",
    duration: "3 Days / 2 Nights",
    distance: "~550 km from Nellore",
    image: "/vehicles/hero-bg.jpg",
    description:
      "Ascend through 36 hairpin bends with our experienced ghat drivers to the Queen of Hill Stations. Crisp air, rolling tea estates, and misty peaks.",
    highlights: [
      "Doddabetta Peak Viewpoint",
      "Ooty Lake Boating & Botanical Gardens",
      "Coonoor Tea Gardens & Dolphin's Nose",
      "Pykara Lake & Waterfalls",
    ],
    vehicleOptions: ["Innova Crysta", "Innova Hycross", "Force Urbania"],
    category: "Hill Station",
  },
  {
    id: 4,
    title: "Coorg Plantation & Waterfalls Gateway",
    duration: "3 Days / 2 Nights",
    distance: "~700 km from Nellore",
    image: "/vehicles/explore-south-india.jpg",
    description:
      "Explore the Scotland of India — aromatic coffee estates, gushing waterfalls, Talacauvery holy river origin, and elephant training reserves.",
    highlights: [
      "Abbey & Iruppu Waterfalls",
      "Raja's Seat Panoramic Sunset",
      "Dubare Elephant Camp Reserve",
      "Organic Coffee Plantation Walk",
    ],
    vehicleOptions: ["Innova Crysta", "Force Urbania", "Tempo Traveller"],
    category: "Nature",
  },
  {
    id: 5,
    title: "Shirdi Sai Baba Maha Pilgrimage",
    duration: "4 Days / 3 Nights",
    distance: "~900 km from Nellore",
    image: "/vehicles/middle-banner.jpg",
    description:
      "Dedicated holy spiritual yatra from Nellore to Shirdi and Shani Shingnapur with dual highway verified drivers and comfortable push-back recliners.",
    highlights: [
      "Shirdi Sai Baba Samadhi Mandir",
      "Dwarkamai & Chavadi Historic Sites",
      "Shani Shingnapur Sacred Temple",
      "Comfortable Highway Stopovers",
    ],
    vehicleOptions: ["Force Urbania", "Innova Crysta", "Tourist Bus"],
    category: "Pilgrimage",
  },
  {
    id: 6,
    title: "Goa Coastal Beach & Heritage Holiday",
    duration: "5 Days / 4 Nights",
    distance: "~900 km from Nellore",
    image: "/vehicles/scenic-road.jpg",
    description:
      "Golden sands, historic Portuguese forts, Dudhsagar waterfalls, and scenic beach stretches across North and South Goa in sheer travel luxury.",
    highlights: [
      "Calangute, Baga & Anjuna Coastlines",
      "Old Goa Basilica of Bom Jesus",
      "Majestic Dudhsagar Waterfalls",
      "Mandovi River Sunset Cruise",
    ],
    vehicleOptions: ["Force Urbania", "Innova Hycross", "Tourist Bus"],
    category: "Beach",
  },
];

export const GALLERY_IMAGES = [
  { id: 1, src: "/vehicles/force-urbania.jpg", label: "Force Urbania Luxury Van", cat: "Fleet", span: "row" },
  { id: 2, src: "/vehicles/innova-crysta.jpg", label: "Innova Crysta Premium MPV", cat: "Vehicles", span: "col" },
  { id: 3, src: "/vehicles/innova-hycross.jpg", label: "Innova Hycross Luxury MPV", cat: "Vehicles", span: "" },
  { id: 4, src: "/vehicles/tempo-traveller.jpg", label: "Force Tempo Traveller Group Van", cat: "Fleet", span: "" },
  { id: 5, src: "/vehicles/tourist-bus.jpg", label: "Comfortable Tourist Bus", cat: "Fleet", span: "row" },
  { id: 6, src: "/vehicles/sedan.jpg", label: "Sedans, SUVs & Hatchbacks Fleet", cat: "Vehicles", span: "" },
  { id: 7, src: "/vehicles/fleet-hero.jpg", label: "Vasu Car Travels Highway Fleet", cat: "Fleet", span: "col" },
  { id: 8, src: "/vehicles/explore-south-india.jpg", label: "Explore South India Circuit", cat: "Destinations", span: "" },
  { id: 9, src: "/vehicles/middle-banner.jpg", label: "Premium Vehicle Fleet Showcase", cat: "Fleet", span: "" },
  { id: 10, src: "/vehicles/scenic-road.jpg", label: "Scenic Travel Mountain Highway", cat: "Journeys", span: "row" },
  { id: 11, src: "/vehicles/hero-bg.jpg", label: "South India Mountain Sunrise Road", cat: "Destinations", span: "" },
];
