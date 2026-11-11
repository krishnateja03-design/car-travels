import { SITE_CONFIG } from "./config";

export function openWhatsApp(message: string): void {
  const url = `https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function buildBookingMessage(f: {
  name: string; phone: string; pickup: string; drop: string;
  travelDate: string; returnDate: string; vehicleType: string;
  passengers: string; requirements: string;
}): string {
  return `🚗 *VASU CAR TRAVELS – Booking Enquiry*

👤 *Name:* ${f.name}
📞 *Phone:* ${f.phone}
📍 *Pickup:* ${f.pickup}
🏁 *Drop:* ${f.drop}
📅 *Travel Date:* ${f.travelDate}
🔄 *Return Date:* ${f.returnDate || "One Way"}
🚙 *Vehicle Type:* ${f.vehicleType}
👥 *Passengers:* ${f.passengers}
📝 *Requirements:* ${f.requirements || "None"}

Please confirm availability and share pricing. Thank you!`;
}

export function buildVehicleEnquiry(name: string, category: string, pickup = "", drop = "", date = ""): string {
  return `🚗 *VASU CAR TRAVELS – Vehicle Enquiry*

🚙 *Vehicle:* ${name} (${category})
${pickup ? `📍 *Pickup:* ${pickup}` : ""}
${drop   ? `🏁 *Drop:* ${drop}` : ""}
${date   ? `📅 *Date:* ${date}` : ""}

I'm interested in hiring this vehicle. Please share availability & pricing. Thank you!`;
}

export function buildTourEnquiry(title: string, duration: string, passengers = "", date = ""): string {
  return `🌟 *VASU CAR TRAVELS – Tour Package Enquiry*

📦 *Package:* ${title}
⏱ *Duration:* ${duration}
${passengers ? `👥 *Passengers:* ${passengers}` : ""}
${date       ? `📅 *Preferred Date:* ${date}` : ""}

I'm interested in this package. Please share details & pricing. Thank you!`;
}

