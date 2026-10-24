// Company facts used in the header, footer, contact pages, legal pages and schema.org data.
// These move to AMOS (Website → Settings / Offices) once the web_* tables exist.
import type { RegionCode } from "./regions";

export const COMPANY = {
  brand: "Amphin",
  trademark: "Amphin®",
  tagline: "Advertising with Intelligence",
  ukEntity: "Amphin LTD",
  ukCompanyNumber: "15393448", // from the old site footer; to be confirmed
  ukRegistration: "Registered in England & Wales",
  indiaEntity: "Amphin",
  indiaRegistration: "Registered as an MSME in India", // Udyam number to be added
  founded: 2023,
};

export const EMAILS = {
  hello: "hello@amphin.com", // general enquiries, quotes
  support: "support@amphin.com", // clients, portal, data requests
  marketing: "marketing@amphin.com", // Connect, partnerships, press, newsletter
};

export const PHONES = {
  london: "+44 7404 77 00 11",
  india: "+91 7071 00 77 11",
  canada: "+1 (647) 834-6623",
  hr: "+91 79075 07711", // HR, India and UK
  salesIndia: "+91 79073 07711",
  salesUk: "+44 7771 705048",
};

/** One WhatsApp line for every region (the floating chat button). */
export const WHATSAPP = "447404770011";

export interface Office {
  slug: string;
  name: string;
  city: string;
  country: string;
  address: string[];
  phone?: string;
  email: string;
  mapQuery: string;
  regions: RegionCode[];
  comingSoon?: boolean;
}

export const OFFICES: Office[] = [
  {
    slug: "london", name: "Amphin London", city: "London", country: "United Kingdom",
    address: ["Office 19, 241E High St N", "London E12 6SJ", "United Kingdom"],
    phone: PHONES.london, email: EMAILS.hello, mapQuery: "241E High St N, London E12 6SJ", regions: ["uk", "eu", "us"],
  },
  {
    slug: "kochi", name: "Amphin Kochi", city: "Kochi", country: "India",
    address: ["C3 V Square IT Hub, Kakkanad West", "Chembumukku, Edappally, Kakkanad", "Kochi, Kerala 682030, India"],
    phone: PHONES.india, email: EMAILS.hello, mapQuery: "V Square IT Hub Kakkanad Kochi", regions: ["in"],
  },
  {
    slug: "abu-dhabi", name: "Amphin UAE", city: "Abu Dhabi", country: "United Arab Emirates",
    address: ["Shams, Ground Floor, Tower 6", "Al Reema St, Al Reem Island", "Abu Dhabi, United Arab Emirates"],
    email: EMAILS.hello, mapQuery: "Shams Tower 6 Al Reem Island Abu Dhabi", regions: ["ae"],
  },
  {
    slug: "canada", name: "Amphin Canada", city: "Alberta", country: "Canada",
    address: ["Alberta, Canada"], phone: PHONES.canada, email: EMAILS.hello, mapQuery: "Alberta Canada", regions: [],
  },
];

export function officeFor(region: RegionCode, offices: Office[] = OFFICES): Office {
  return offices.find((o) => o.regions.includes(region)) ?? offices[0];
}

/** Main number shown in the header and top bar: India for /in, London everywhere else. */
export function mainPhone(region: RegionCode): string {
  return region === "in" ? PHONES.india : PHONES.london;
}

/** Sales line for the region (footer, contact page and quote follow-ups). */
export function salesPhone(region: RegionCode): string {
  return region === "in" ? PHONES.salesIndia : PHONES.salesUk;
}

export const SOCIALS = [
  { platform: "Instagram", url: "https://instagram.com/helloamphin", short: "ig" },
  { platform: "Facebook", url: "https://www.facebook.com/helloamphin", short: "fb" },
  { platform: "LinkedIn", url: "https://linkedin.com/company/helloamphin", short: "in" },
  { platform: "X", url: "https://twitter.com/helloamphin", short: "x" },
  { platform: "YouTube", url: "https://www.youtube.com/helloamphin", short: "yt" },
  { platform: "TikTok", url: "https://www.tiktok.com/@helloamphin", short: "tt" },
];

export const SITE_URL = "https://www.amphin.agency";
export const AMOS_URL = "https://os.amphin.agency";
