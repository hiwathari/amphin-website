// Partner and certification badges shown in the footer. A badge appears only when its logo file exists in
// public/brand/partners/ AND Amphin has confirmed it holds the status. Add the logo, then set `logo`.
export interface Partner { key: string; name: string; logo: string | null; href?: string; blog?: boolean }

export const PARTNERS: Partner[] = [
  { key: "google-cloud", name: "Google Cloud Partner", logo: "/brand/partners/google-cloud-partner.png", blog: true },
  { key: "meta", name: "Meta Business Partner", logo: null },
  { key: "hubspot", name: "HubSpot Partner", logo: null },
  { key: "linkedin", name: "LinkedIn Marketing Partner", logo: null },
  { key: "bing", name: "Microsoft Advertising (Bing) Partner", logo: null },
];
