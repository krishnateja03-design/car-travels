import { SITE_CONFIG } from "./config";

export interface BookingDetails {
  name: string;
  phone?: string;
  pickup: string;
  drop: string;
  travelDate: string;
  returnDate?: string;
  vehicleType: string;
  passengers: string;
  requirements?: string;
}

/**
 * Triggers WhatsApp redirect with pre-formatted message
 * Uses api.whatsapp.com for proper emoji UTF-8 decoding
 */
export function openWhatsApp(message: string): void {
  const url = `https://api.whatsapp.com/send?phone=${SITE_CONFIG.WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

/**
 * Formats structured booking enquiry with genuine emojis, clean formatting, and no website link
 */
export function buildBookingMessage(b: BookingDetails): string {
  const lines = [
    `----------------------------------------`,
    `🚗 *${SITE_CONFIG.BUSINESS_NAME}*`,
    `*Trip Booking Enquiry*`,
    `----------------------------------------`,
    ``,
    `👤 *Customer:* ${b.name}`,
    b.phone && b.phone !== "Not specified" ? `📞 *Phone:* ${b.phone}` : null,
    `📍 *Pickup:* ${b.pickup}`,
    `🏁 *Destination:* ${b.drop}`,
    `📅 *Travel Date:* ${b.travelDate}`,
    b.returnDate ? `🔄 *Return Date:* ${b.returnDate}` : `🔄 *Trip Type:* One Way`,
    `🚙 *Vehicle:* ${b.vehicleType}`,
    `👥 *Passengers:* ${b.passengers}`,
    b.requirements?.trim() ? `📝 *Special Requests:* ${b.requirements}` : null,
    ``,
    `----------------------------------------`,
    `_Please share availability & fare quote._`,
    `_Thank you!_`,
  ].filter(Boolean);

  return (lines as string[]).join("\n");
}

/**
 * Formats single-vehicle enquiry message
 */
export function buildVehicleEnquiry(
  name: string,
  category: string,
  pickup = "",
  drop = "",
  date = ""
): string {
  const lines = [
    `🚗 *${SITE_CONFIG.BUSINESS_NAME} – Vehicle Enquiry*`,
    ``,
    `🚙 *Vehicle:* ${name} (${category})`,
    pickup ? `📍 *Pickup Location:* ${pickup}` : null,
    drop ? `🏁 *Drop Location:* ${drop}` : null,
    date ? `📅 *Travel Date:* ${date}` : null,
    ``,
    `Please share availability and fare quote. Thank you!`,
  ].filter(Boolean);

  return lines.join("\n");
}

/**
 * Formats tour package enquiry message
 */
export function buildTourEnquiry(
  title: string,
  duration: string,
  passengers = "",
  date = ""
): string {
  const lines = [
    `🌟 *${SITE_CONFIG.BUSINESS_NAME} – Tour Package Enquiry*`,
    ``,
    `📦 *Package:* ${title}`,
    `⏱ *Duration:* ${duration}`,
    passengers ? `👥 *Passengers:* ${passengers}` : null,
    date ? `📅 *Preferred Date:* ${date}` : null,
    ``,
    `Please share itinerary details, vehicle options, and cost quote. Thank you!`,
  ].filter(Boolean);

  return lines.join("\n");
}
