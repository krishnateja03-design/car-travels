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

export const VEHICLE_CATEGORIES = ["All", "Sedan", "SUV", "Tempo Traveller", "Mini Bus", "Tourist Bus", "Luxury"] as const;
export type VehicleCategory = typeof VEHICLE_CATEGORIES[number];

export const VEHICLES: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Etios",
    category: "Sedan",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&q=80",
    passengers: 4,
    luggage: "2 Bags",
    ac: true,
    features: ["AC", "Music System", "GPS", "Comfortable Seating"],
    description: "Perfect for city rides and short outstation trips. Fuel-efficient and reliable.",
  },
  {
    id: 2,
    name: "Honda City",
    category: "Sedan",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    passengers: 4,
    luggage: "2 Bags",
    ac: true,
    features: ["AC", "Music System", "GPS", "Premium Interiors"],
    description: "Premium sedan offering a smooth and comfortable ride for business or leisure.",
  },
  {
    id: 3,
    name: "Toyota Innova Crysta",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
    passengers: 7,
    luggage: "4 Bags",
    ac: true,
    features: ["AC", "Captain Seats", "GPS", "Music System", "USB Charging"],
    description: "India's most trusted MPV for family trips and corporate travel.",
  },
  {
    id: 4,
    name: "Mahindra Scorpio",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    passengers: 7,
    luggage: "4 Bags",
    ac: true,
    features: ["AC", "4WD", "GPS", "Music System"],
    description: "Rugged SUV ideal for highway drives and adventure trips.",
  },
  {
    id: 5,
    name: "Tempo Traveller 12 Seater",
    category: "Tempo Traveller",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80",
    passengers: 12,
    luggage: "Roof Carrier",
    ac: true,
    features: ["AC", "Push-Back Seats", "GPS", "Music System", "Luggage Rack"],
    description: "Ideal for group tours and family trips with comfortable push-back seats.",
  },
  {
    id: 6,
    name: "Tempo Traveller 17 Seater",
    category: "Tempo Traveller",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80",
    passengers: 17,
    luggage: "Roof Carrier",
    ac: true,
    features: ["AC", "Push-Back Seats", "GPS", "Roof Luggage Carrier", "USB Charging"],
    description: "Spacious 17-seater for large group outstation travel and corporate events.",
  },
  {
    id: 7,
    name: "Mini Bus – 20 Seater",
    category: "Mini Bus",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
    passengers: 20,
    luggage: "Underfloor Storage",
    ac: true,
    features: ["AC", "Reclining Seats", "GPS", "Music System", "Emergency Exit"],
    description: "Perfect for wedding groups, pilgrimages, and corporate outings.",
  },
  {
    id: 8,
    name: "Mini Bus – 32 Seater",
    category: "Mini Bus",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80",
    passengers: 32,
    luggage: "Underfloor Storage",
    ac: true,
    features: ["AC", "Reclining Seats", "GPS", "Music System", "Safety Features"],
    description: "Comfortable 32-seater bus ideal for school trips, corporate events, and tours.",
  },
  {
    id: 9,
    name: "Tourist Bus – 45 Seater",
    category: "Tourist Bus",
    image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=600&q=80",
    passengers: 45,
    luggage: "Large Underfloor Storage",
    ac: true,
    features: ["AC", "Sleeper Option", "GPS", "LED TV", "Music System", "Pantry"],
    description: "Luxury tourist bus for long-distance group tours across South India.",
  },
  {
    id: 10,
    name: "Mercedes E-Class",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
    passengers: 4,
    luggage: "2 Bags",
    ac: true,
    features: ["AC", "Leather Seats", "GPS", "Sunroof", "Premium Sound", "WiFi"],
    description: "Ultimate luxury for weddings, corporate VIPs, and special occasions.",
  },
  {
    id: 11,
    name: "Toyota Fortuner",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    passengers: 7,
    luggage: "4 Bags",
    ac: true,
    features: ["AC", "Leather Seats", "GPS", "Sunroof", "Premium Audio", "4WD"],
    description: "Premium SUV for executive travel and special trips with power and style.",
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 1,
    title: "Tirupati Temple Tour",
    duration: "1 Day",
    distance: "~140 km from Nellore",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80",
    description: "Visit the world-famous Sri Venkateswara Temple. Package includes transport, waiting time, and return drop.",
    highlights: ["Tirumala Venkateswara Temple", "Padmavathi Temple", "Govindharaja Swamy Temple"],
    vehicleOptions: ["Sedan", "SUV", "Tempo Traveller"],
    category: "Pilgrimage",
  },
  {
    id: 2,
    title: "Chennai City Tour",
    duration: "1–2 Days",
    distance: "~170 km from Nellore",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80",
    description: "Explore Chennai – Marina Beach, Kapaleeshwarar Temple, Mahabalipuram, and more.",
    highlights: ["Marina Beach", "Mahabalipuram", "Kapaleeshwarar Temple", "VGP Theme Park"],
    vehicleOptions: ["Sedan", "SUV", "Tempo Traveller"],
    category: "City Tour",
  },
  {
    id: 3,
    title: "Ooty Hill Station Tour",
    duration: "3 Days / 2 Nights",
    distance: "~550 km from Nellore",
    image: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=600&q=80",
    description: "Experience the Queen of Hill Stations – lush green valleys, tea gardens, and botanical gardens.",
    highlights: ["Ooty Lake", "Botanical Gardens", "Nilgiri Mountain Railway", "Doddabetta Peak"],
    vehicleOptions: ["SUV", "Tempo Traveller"],
    category: "Hill Station",
  },
  {
    id: 4,
    title: "Coorg Coffee Plantation Tour",
    duration: "3 Days / 2 Nights",
    distance: "~700 km from Nellore",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    description: "Explore Coorg's breathtaking coffee plantations, waterfalls, and misty mountains.",
    highlights: ["Abbey Falls", "Raja's Seat", "Dubare Elephant Camp", "Coffee Estates"],
    vehicleOptions: ["SUV", "Tempo Traveller", "Mini Bus"],
    category: "Nature",
  },
  {
    id: 5,
    title: "Shirdi Pilgrimage",
    duration: "4 Days / 3 Nights",
    distance: "~900 km from Nellore",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80",
    description: "Complete Shirdi pilgrimage package with comfortable travel to the sacred shrine of Sai Baba.",
    highlights: ["Sai Baba Temple", "Dwarkamai", "Chavadi", "Shani Shingnapur"],
    vehicleOptions: ["SUV", "Tempo Traveller", "Tourist Bus"],
    category: "Pilgrimage",
  },
  {
    id: 6,
    title: "Goa Beach Holiday",
    duration: "5 Days / 4 Nights",
    distance: "~900 km from Nellore",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
    description: "Sun, sand, and sea! Experience Goa's beautiful beaches and Portuguese heritage.",
    highlights: ["Calangute Beach", "Dudhsagar Falls", "Old Goa Churches", "Spice Plantation"],
    vehicleOptions: ["SUV", "Tempo Traveller", "Mini Bus"],
    category: "Beach",
  },
];

export const GALLERY_IMAGES = [
  { id: 1,  src: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&q=80",  label: "Toyota Etios – Sedan",        cat: "Vehicles",     span: "row" },
  { id: 2,  src: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80", label: "Toyota Innova Crysta",        cat: "Vehicles",     span: "col" },
  { id: 3,  src: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&q=80", label: "Tempo Traveller Fleet",       cat: "Fleet",        span: "" },
  { id: 4,  src: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80", label: "Tourist Bus",                 cat: "Fleet",        span: "" },
  { id: 5,  src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80", label: "South India Highway",         cat: "Journeys",     span: "row" },
  { id: 6,  src: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800&q=80", label: "Ooty Hill Station",           cat: "Destinations", span: "" },
  { id: 7,  src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80", label: "Goa Beach Trip",              cat: "Destinations", span: "col" },
  { id: 8,  src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80", label: "Coorg Coffee Plantation",     cat: "Destinations", span: "" },
  { id: 9,  src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", label: "Premium Sedan Fleet",         cat: "Fleet",        span: "" },
  { id: 10, src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80", label: "Luxury Mercedes",             cat: "Vehicles",     span: "row" },
  { id: 11, src: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80", label: "Hyderabad Trip",              cat: "Destinations", span: "" },
  { id: 12, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", label: "Toyota Fortuner",             cat: "Vehicles",     span: "" },
];

