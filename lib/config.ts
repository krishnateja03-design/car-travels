/**
 * ============================================================
 * VASU CAR TRAVELS – Core Business Configuration
 * ============================================================
 * Centralized enterprise settings for business contact info,
 * operational hours, and messaging links.
 */

export const SITE_CONFIG = {
  BUSINESS_NAME: "VASU CAR TRAVELS",
  TAGLINE: "Your Journey, Our Priority",
  SUB_TAGLINE: "Premium Car Rentals Across South India",
  LOCATION: "Nellore, Andhra Pradesh",
  
  // Format: CountryCode + Number (No + or spaces)
  WHATSAPP_NUMBER: "919999999999",
  
  PHONE: "+91 99999 99999",
  EMAIL: "vasucartravels@gmail.com",
  ADDRESS: "Nellore, Andhra Pradesh – 524001",
  
  COVERAGE_REGIONS: [
    "Andhra Pradesh",
    "Tamil Nadu",
    "Karnataka",
    "Telangana",
    "Kerala",
  ],
} as const;

export type SiteConfig = typeof SITE_CONFIG;
