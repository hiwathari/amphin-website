// Partner badges shown in the footer and on the About page. `logo` is the official badge file in
// public/brand/partners/; until a badge file is added the partner shows as a text label.
// Only list a partner here once Amphin holds that status.
export interface Partner { key: string; name: string; logo: string | null; blurb: string; blog?: boolean }

export const PARTNERS: Partner[] = [
  { key: "google-cloud", name: "Google Cloud Partner Advantage", logo: "/brand/partners/google-cloud-partner.png", blog: true,
    blurb: "A member of Google Cloud's partner programme, which we use to build websites, AI agents and cloud systems for clients." },
  { key: "meta", name: "Meta Business Partner", logo: null,
    blurb: "Meta Business Partner status for planning, running and measuring Facebook and Instagram advertising." },
  { key: "hubspot", name: "HubSpot Partner", logo: null,
    blurb: "A HubSpot partner for CRM, marketing automation and reporting set-ups that connect campaigns to sales." },
  { key: "linkedin", name: "LinkedIn Marketing Partner", logo: null,
    blurb: "A LinkedIn Marketing Partner for B2B campaigns, lead generation and company-page growth." },
  { key: "bing", name: "Microsoft Advertising (Bing) Partner", logo: null,
    blurb: "A Microsoft Advertising partner for search campaigns on Bing, Yahoo and the wider Microsoft network." },
];
