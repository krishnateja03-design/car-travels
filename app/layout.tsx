import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  themeColor: "#0D1B3E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vasucartravels.com"),
  title: {
    default: "VASU CAR TRAVELS – Premium Car Rental & Tours | Nellore",
    template: "%s | VASU CAR TRAVELS",
  },
  description:
    "VASU CAR TRAVELS – Nellore's trusted car rental & South India tour service. Book Force Urbania, Innova Crysta, Tempo Travellers, luxury buses & sedans with professional chauffeurs.",
  keywords: [
    "Vasu Car Travels",
    "Car rental Nellore",
    "Cab service Nellore",
    "Force Urbania Nellore",
    "Innova Crysta rental Nellore",
    "Tempo Traveller Nellore",
    "South India Tours",
    "Tirupati cab from Nellore",
    "Outstation cab booking Nellore",
  ],
  authors: [{ name: "VASU CAR TRAVELS" }],
  creator: "VASU CAR TRAVELS",
  publisher: "VASU CAR TRAVELS",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vasucartravels.com",
    siteName: "VASU CAR TRAVELS",
    title: "VASU CAR TRAVELS – Premium Car Rental & Tours | Nellore",
    description:
      "Premium car rentals, luxury vans, tempo travellers and buses across South India. Instant booking via WhatsApp.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "VASU CAR TRAVELS - Nellore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VASU CAR TRAVELS – Premium Car Rental & Tours | Nellore",
    description:
      "Premium car rentals, luxury vans, tempo travellers and buses across South India.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="antialiased bg-white text-gray-900 font-sans overflow-x-hidden selection:bg-[#C8102E] selection:text-white">
        <Navbar />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
