import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "VASU CAR TRAVELS – Premium Car Rental & Tours | Nellore",
  description:
    "VASU CAR TRAVELS – Nellore's trusted car rental & South India tour service. Book sedans, SUVs, Tempo Travellers, buses & luxury vehicles for outstation trips, pilgrimages and corporate travel.",
  keywords:
    "car rental Nellore, taxi Nellore, South India tours, outstation cab Nellore, Tirupati cab, Vasu Car Travels",
  openGraph: {
    title: "VASU CAR TRAVELS – Premium Car Rental | Nellore",
    description: "Premium car rentals & tour packages across South India. Book on WhatsApp instantly.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-gray-900 overflow-x-hidden">
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
