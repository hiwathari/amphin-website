// Screens from the public AmOS demo (sample data only), stored in the AMOS media library.
const media = (id: string) => `https://os.amphin.agency/api/public/website/media/web/media/2026/10/${id}.webp`;

const SHOTS: [string, string][] = [
  ["AkuP-m8YRum-", "AmOS executive dashboard"],
  ["tjwVCw3BONRN", "AmOS CRM and lead pipeline"],
  ["5Hm2odSuhrfl", "AmOS tasks board"],
  ["wR3Wu8X5qq1Y", "AmOS attendance and leave"],
  ["8y4UdFQVxcz4", "AmOS content calendar"],
  ["oMOCHvEKqXiU", "Amphin Studio, the website dashboard inside AmOS"],
];

export const AMOS_SHOTS = SHOTS.map(([id, alt]) => ({ src: media(id), alt }));

export const LUVDER_LOGO = media("Qxxu5dBaxtLP");
