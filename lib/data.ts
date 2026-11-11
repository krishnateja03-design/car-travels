// ============================================================
// VASU CAR TRAVELS – Data
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
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&q=80",
    passengers: 17,
    luggage: "Large Luggage Space",
    ac: true,
    features: ["16 / 17 Seater", "AC & Comfortable Seating", "Large Luggage Space", "Premium Interiors"],
    description: "Ultra-luxury passenger van for VIP group trips, family pilgrimages, and high-end outstation journeys.",
    badge: "Popular Group Pick",
  },
  {
    id: 2,
    name: "Innova Crysta",
    category: "SUVs & MPVs",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80",
    passengers: 8,
    luggage: "4 Large Bags",
    ac: true,
    features: ["7 / 8 Seater", "AC & Reclining Captain Seats", "Spacious Cabin", "Smooth Highway Performance"],
    description: "India's undisputed king of family and corporate outstation travel. Supreme comfort & reliability.",
    badge: "Best Seller",
  },
  {
    id: 3,
    name: "Innova Hycross",
    category: "SUVs & MPVs",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=80",
    passengers: 7,
    luggage: "4 Bags",
    ac: true,
    features: ["7 Seater Luxury", "Advanced Safety & ADAS", "Premium Luxury Interiors", "Fuel Efficient & Ultra Quiet"],
    description: "Next-generation hybrid luxury MPV with Ottoman seats and panoramic sunroof for top-tier travel.",
    badge: "New Luxury",
  },
  {
    id: 4,
    name: "Force Tempo Traveller",
    category: "Tempo Travellers",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=700&q=80",
    passengers: 17,
    luggage: "Heavy Duty Luggage Carrier",
    ac: true,
    features: ["9 / 12 / 17 Seater Options", "Dual AC & Individual Vents", "Push-back Luxury Seats", "Ideal for Tours & Pilgrimages"],
    description: "Spacious and dependable group transporter. Perfect for Tirupati, Shirdi, and extended South India tours.",
  },
  {
    id: 5,
    name: "Luxury Tourist Bus",
    category: "Buses",
    image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=700&q=80",
    passengers: 50,
    luggage: "Underfloor Giant Storage",
    ac: true,
    features: ["30 / 40 / 50 Seater", "High Back Reclining Seats", "AC, Music & Entertainment", "Long Distance Tour Ready"],
    description: "Full-size tourist coach with air suspension, entertainment system, and generous legroom.",
  },
  {
    id: 6,
    name: "Sedans & Premium Hatchbacks",
    category: "Sedans",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=700&q=80",
    passengers: 4,
    luggage: "2-3 Large Bags",
    ac: true,
    features: ["Etios / Dzire / Honda City", "Well Maintained Fleet", "Flexible Hourly & Outstation Plans", "Professional Chauffeur"],
    description: "Affordable, punctual, and comfortable cars for local airport drops, business trips, and city errands.",
  },
  {
    id: 7,
    name: "Toyota Fortuner 4x4",
    category: "SUVs & MPVs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80",
    passengers: 7,
    luggage: "4 Bags",
    ac: true,
    features: ["7 Seater 4WD SUV", "Leather Captain Seats", "High Ground Clearance", "VIP & Wedding Escort"],
    description: "Authoritative, rugged, and commanding luxury SUV for VIP guest transport, weddings, and hill drives.",
  },
  {
    id: 8,
    name: "Mini Bus (20 - 32 Seater)",
    category: "Buses",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&q=80",
    passengers: 32,
    luggage: "Ample Luggage Bay",
    ac: true,
    features: ["20 / 25 / 32 Seater", "Push Back Comfortable Seats", "Powerful Climate Control", "Wedding & Corporate Outings"],
    description: "Mid-size luxury mini coach ideal for wedding guest shuttles, school educational tours, and company events.",
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 1,
    title: "Tirupati Balaji Darshan Tour",
    duration: "Same Day / 1 Day",
    distance: "~140 km from Nellore",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80",
    description: "Hassle-free Tirumala & Tirupati pilgrimage with pickup from Nellore, waiting time, and return drop.",
    highlights: ["Tirumala Venkateswara Temple", "Padmavathi Temple", "Govindaraja Swamy Temple"],
    vehicleOptions: ["Innova Crysta", "Force Urbania", "Tempo Traveller"],
    category: "Pilgrimage",
  },
  {
    id: 2,
    title: "Chennai Metro & Mahabalipuram",
    duration: "1–2 Days",
    distance: "~170 km from Nellore",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80",
    description: "Explore Marina Beach, UNESCO heritage monuments in Mahabalipuram, shopping, and temple tours.",
    highlights: ["Marina Beach", "Shore Temple & Pancha Rathas", "Kapaleeshwarar Temple"],
    vehicleOptions: ["Sedans", "Innova Hycross", "Tempo Traveller"],
    category: "City Tour",
  },
  {
    id: 3,
    title: "Ooty & Coonoor Hill Tour",
    duration: "3 Days / 2 Nights",
    distance: "~550 km from Nellore",
    image: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=600&q=80",
    description: "Charming Nilgiri tea estates, Botanical Gardens, Doddabetta Peak, and scenic hill roads.",
    highlights: ["Ooty Lake & Boating", "Botanical & Rose Gardens", "Tea Factory & Viewpoints"],
    vehicleOptions: ["Innova Crysta", "Force Urbania"],
    category: "Hill Station",
  },
  {
    id: 4,
    title: "Coorg Plantation & Waterfalls",
    duration: "3 Days / 2 Nights",
    distance: "~700 km from Nellore",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    description: "Misty mountains, lush coffee estates, Raja's Seat, Abbey Falls, and Dubare Elephant Camp.",
    highlights: ["Abbey Falls", "Raja's Seat Sunset", "Dubare Elephant Camp"],
    vehicleOptions: ["Innova Crysta", "Tempo Traveller", "Mini Bus"],
    category: "Nature",
  },
  {
    id: 5,
    title: "Shirdi Sai Baba Pilgrimage",
    duration: "4 Days / 3 Nights",
    distance: "~900 km from Nellore",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80",
    description: "Dedicated spiritual tour from Nellore to Shirdi and Shani Shingnapur with verified highway drivers.",
    highlights: ["Sai Baba Samadhi Temple", "Dwarkamai & Chavadi", "Shani Shingnapur"],
    vehicleOptions: ["Innova Crysta", "Force Urbania", "Tourist Bus"],
    category: "Pilgrimage",
  },
  {
    id: 6,
    title: "Goa Beach & Coastal Holiday",
    duration: "5 Days / 4 Nights",
    distance: "~900 km from Nellore",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
    description: "Calangute, Baga, Fort Aguada, Dudhsagar Falls, and Portuguese churches across North and South Goa.",
    highlights: ["Calangute & Baga Beach", "Dudhsagar Waterfalls", "Old Goa Churches"],
    vehicleOptions: ["Force Urbania", "Innova Hycross", "Tourist Bus"],
    category: "Beach",
  },
];

export const GALLERY_IMAGES = [
  { id: 1,  src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80", label: "Force Urbania Luxury Van", cat: "Fleet", span: "row" },
  { id: 2,  src: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80", label: "Toyota Innova Crysta", cat: "Vehicles", span: "col" },
  { id: 3,  src: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80", label: "Force Tempo Traveller Fleet", cat: "Fleet", span: "" },
  { id: 4,  src: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80", label: "Deluxe Tourist Coach", cat: "Fleet", span: "" },
  { id: 5,  src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80", label: "South India Highway Drive", cat: "Journeys", span: "row" },
  { id: 6,  src: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800&q=80", label: "Ooty Ghat Road Tour", cat: "Destinations", span: "" },
  { id: 7,  src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80", label: "Goa Coastal Route", cat: "Destinations", span: "col" },
  { id: 8,  src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80", label: "Coorg Hill Landscapes", cat: "Destinations", span: "" },
  { id: 9,  src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", label: "Toyota Innova Hycross", cat: "Vehicles", span: "" },
  { id: 10, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", label: "Toyota Fortuner SUV", cat: "Vehicles", span: "row" },
  { id: 11, src: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&q=80", label: "Executive Sedans", cat: "Vehicles", span: "" },
  { id: 12, src: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80", label: "Hyderabad Highway Journey", cat: "Destinations", span: "" },
];
