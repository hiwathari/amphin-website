// Service-area pages: Amphin delivers these services online to clients in each area, so the pages say so plainly
// (no fake local office). Every page is built from three things that differ: facts about the area (its
// businesses, search habits, time zone and language), the topic's own method, and a line per local sector.
// Where an office already has pillar pages (London, Kochi) only topics that those pages don't cover are used.
import type { RegionCode } from "./regions";

/** The day this content set was written. Used for dateModified and sitemap lastmod (never back-dated). */
export const AREA_CONTENT_DATE = "2026-11-06";

export interface Sector { name: string; hook: string }
export interface Area {
  slug: string; name: string; full: string; region: RegionCode; country: string; office?: string;
  tz: string; lang: string; places: string[]; sectors: Sector[]; market: string; challenge: string; search: string;
  topics?: string[];
}

const OFFICE_TOPICS = ["digital-marketing", "podcast-production", "ai-agent-development", "ai-development", "it-software-solutions"];

export const AREAS: Area[] = [
  {
    slug: "wayanad", name: "Wayanad", full: "Wayanad, Kerala", region: "in", country: "India",
    tz: "Indian Standard Time (UTC+5:30), the same clock as our Kochi team", lang: "English and Malayalam",
    places: ["Kalpetta", "Sulthan Bathery", "Mananthavady", "Meppadi", "Vythiri", "Lakkidi"],
    sectors: [
      { name: "Homestays, resorts and tour operators", hook: "compete for the same monsoon-to-winter booking window and rely on Google Maps and travel portals to be found" },
      { name: "Spice, coffee and tea producers", hook: "sell a premium product that deserves a direct-to-customer brand rather than a bulk-trader price" },
      { name: "Ayurveda and wellness centres", hook: "depend on trust, reviews and clear treatment information for guests travelling from other states and countries" },
      { name: "Local retail and food businesses in Kalpetta and Sulthan Bathery", hook: "need walk-in customers from nearby searches and a steady social media presence" },
      { name: "Schools, colleges and training institutes", hook: "need admissions enquiries to arrive through a site and campaigns that parents trust" },
    ],
    market: "Wayanad is a hill district whose economy runs on tourism, plantation crops and a growing set of small shops, clinics and institutes spread across Kalpetta, Sulthan Bathery, Mananthavady and the villages between them. Internet use is high but audiences are scattered, which makes a clear online presence far more valuable than another hoarding.",
    challenge: "most businesses are small, seasonal and spread over long distances, so visitors and buyers meet them online before they ever meet them in person",
    search: "People searching around Wayanad mix English and Malayalam phrases, use \"near me\" and map searches heavily, and compare reviews before they book or visit.",
  },
  {
    slug: "ernakulam", name: "Ernakulam", full: "Ernakulam and Kochi, Kerala", region: "in", country: "India", office: "kochi",
    tz: "Indian Standard Time (UTC+5:30), working from our Kochi office", lang: "English and Malayalam",
    places: ["Kochi", "Kakkanad", "Edappally", "Aluva", "Perumbavoor", "Fort Kochi"], topics: OFFICE_TOPICS,
    sectors: [
      { name: "IT and start-up teams around Infopark and Kakkanad", hook: "need product marketing and automation that a small team can actually run" },
      { name: "Seafood, spice and export businesses", hook: "sell to overseas buyers who check a company's website and credentials before replying" },
      { name: "Real estate and construction firms", hook: "compete on trust and project visibility in a crowded city market" },
      { name: "Hospitals, clinics and diagnostic centres", hook: "need accurate, compliant information that patients can find and act on quickly" },
      { name: "Retail, restaurants and hospitality in Kochi", hook: "fight for attention with offers, reels and local search every week" },
    ],
    market: "Ernakulam is Kerala's commercial centre: a port city with a large technology park, export trade, hospitals, real estate and a dense retail and food scene. Competition for attention is stronger here than anywhere else in the state, and buyers compare several options online before calling anyone.",
    challenge: "many businesses look alike online, so the ones that explain themselves clearly and respond quickly win the enquiry",
    search: "Searches mix English with Malayalam transliteration, often include a locality such as Edappally or Kakkanad, and lean heavily on Google Business Profile results.",
  },
  {
    slug: "thiruvananthapuram", name: "Thiruvananthapuram", full: "Thiruvananthapuram (Trivandrum), Kerala", region: "in", country: "India",
    tz: "Indian Standard Time (UTC+5:30), the same clock as our Kochi team", lang: "English and Malayalam",
    places: ["Kazhakkoottam", "Technopark", "Kowdiar", "Pattom", "Kovalam", "Neyyattinkara"],
    sectors: [
      { name: "Technopark companies and software start-ups", hook: "need credible product and employer marketing to reach customers and hires beyond Kerala" },
      { name: "Education and coaching institutes", hook: "run admission seasons where a few weeks of good campaigns decide the whole year" },
      { name: "Medical, Ayurveda and wellness providers", hook: "serve patients who travel in from other states and from abroad and who research heavily first" },
      { name: "Hotels, resorts and guides around Kovalam and Varkala", hook: "depend on international and domestic travellers choosing them from search and social results" },
      { name: "Government-linked services, NGOs and cultural organisations", hook: "need clear, accessible communication in English and Malayalam" },
    ],
    market: "Thiruvananthapuram is Kerala's capital, with a technology park at Technopark, a strong education and research base, medical services, and beaches and heritage that bring in visitors. Many decisions here involve institutions, so credibility and clear information matter more than loud advertising.",
    challenge: "audiences are informed and cautious, so businesses need accurate, well-structured information that holds up when someone compares them with others",
    search: "Searches often name a locality (Pattom, Kowdiar, Kazhakkoottam), appear in both English and Malayalam, and for services like education or healthcare end with phrases such as fees, reviews and admission.",
  },
  {
    slug: "bangalore", name: "Bangalore", full: "Bangalore (Bengaluru), India", region: "in", country: "India",
    tz: "Indian Standard Time (UTC+5:30), the same clock as our Kochi team", lang: "English, with Kannada and Hindi audiences",
    places: ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Electronic City", "Hebbal"],
    sectors: [
      { name: "SaaS and product start-ups", hook: "need a site, content and campaigns that turn a small budget into qualified demos" },
      { name: "D2C and e-commerce brands", hook: "depend on paid social, search and creators while keeping acquisition cost under control" },
      { name: "Agencies, consultants and professional services", hook: "need thought-leadership and lead generation that stands apart from hundreds of similar firms" },
      { name: "Restaurants, cafés and lifestyle brands in Indiranagar and Koramangala", hook: "live or die on discovery through reels, maps and local search" },
      { name: "Health, fitness and education businesses", hook: "need steady enquiries across a city that is hard to cover with offline marketing alone" },
    ],
    market: "Bangalore is India's start-up and software capital, with product companies, funded start-ups, D2C brands and a very large professional audience. Buyers are digitally fluent, so average work is ignored and well-built, measurable work stands out.",
    challenge: "everyone is already advertising online, so cost per lead rises quickly unless the brand, the landing pages and the targeting are sharper than the competition's",
    search: "Searches are mostly in English, frequently name a neighbourhood, and for B2B terms are long and specific, which rewards detailed, expert content.",
  },
  {
    slug: "london", name: "London", full: "London, United Kingdom", region: "uk", country: "United Kingdom", office: "london",
    tz: "UK time (GMT/BST), working from our London office", lang: "English", topics: OFFICE_TOPICS,
    places: ["East London", "Stratford", "Ilford", "the City of London", "Essex"],
    sectors: [
      { name: "Professional and financial services", hook: "need credibility and a clear message in a market where every firm claims the same strengths" },
      { name: "Hospitality and food businesses", hook: "rely on local search, reviews and social content to fill tables every week" },
      { name: "Start-ups and scale-ups", hook: "need growth systems and automation that scale without a large hiring plan" },
      { name: "Property, trades and local services", hook: "win work through local search and fast, professional responses" },
      { name: "Creators, founders and personal brands", hook: "turn expertise into an audience through consistent content and publishing" },
    ],
    market: "London is the UK's largest and most competitive market, with businesses of every size competing for the same audiences. Customers expect fast, polished, mobile-friendly experiences and compare providers within minutes.",
    challenge: "attention is expensive, so campaigns and products have to be specific about who they are for",
    search: "Searches are in British English, often include a borough or the word \"near me\", and for B2B services are research-heavy with several comparisons before an enquiry.",
  },
  {
    slug: "manchester", name: "Manchester", full: "Manchester, United Kingdom", region: "uk", country: "United Kingdom",
    tz: "UK time (GMT/BST), overlapping fully with our London team", lang: "English",
    places: ["Salford", "MediaCityUK", "Northern Quarter", "Spinningfields", "Trafford", "Stockport"],
    sectors: [
      { name: "Media, creative and digital companies around MediaCityUK", hook: "need partners who can work at the same pace and production standard as their own teams" },
      { name: "E-commerce and fashion brands", hook: "need conversion-focused stores and ad campaigns that hold up against national competitors" },
      { name: "Hospitality and nightlife in the Northern Quarter", hook: "build audiences through short video, events and consistent social content" },
      { name: "Universities, training providers and student services", hook: "run intake-driven campaigns aimed at a young, mobile-first audience" },
      { name: "Manufacturing, logistics and B2B firms in Greater Manchester", hook: "often have strong products but dated websites and little structured lead generation" },
    ],
    market: "Greater Manchester has one of the UK's biggest digital and media clusters outside London, a large student population, a busy hospitality scene and a deep base of manufacturing and logistics firms. Businesses here are practical and value clear return over polish for its own sake.",
    challenge: "the city is full of capable local agencies, so a remote partner has to be faster, clearer and better measured to earn the work",
    search: "Searches use northern phrasing less than you might expect, but often name the city or a district, and B2B buyers search for specific capabilities rather than general agency terms.",
  },
  {
    slug: "birmingham", name: "Birmingham", full: "Birmingham, United Kingdom", region: "uk", country: "United Kingdom",
    tz: "UK time (GMT/BST), overlapping fully with our London team", lang: "English, with strong South Asian and multilingual communities",
    places: ["Jewellery Quarter", "Digbeth", "Edgbaston", "Solihull", "Sutton Coldfield", "Smethwick"],
    sectors: [
      { name: "Jewellery, retail and wholesale businesses", hook: "need product photography, stores and ads that show craftsmanship and convert online" },
      { name: "Manufacturing and engineering firms", hook: "need credible B2B sites and lead generation that reflect decades of capability" },
      { name: "Professional and financial services", hook: "compete for trust with national firms that have bigger marketing teams" },
      { name: "Restaurants, wedding and events businesses", hook: "depend on social proof, video and local search for bookings" },
      { name: "Community, faith and charity organisations", hook: "need clear multi-audience communication and donation or event journeys that work on a phone" },
    ],
    market: "Birmingham is the UK's second-largest city, with a long manufacturing and trade heritage, a thriving jewellery and retail sector, large professional services firms and a diverse, multilingual population. Many businesses are family-owned and growing from offline strength into digital.",
    challenge: "many established firms have strong reputations offline but little structured presence online, so the first job is making that reputation visible and measurable",
    search: "Searches name the city or area (Solihull, Edgbaston, Jewellery Quarter), include community-specific terms, and for trade products are practical and price-aware.",
  },
  {
    slug: "toronto", name: "Toronto", full: "Toronto, Canada", region: "us", country: "Canada",
    tz: "Eastern Time (UTC-5/-4), reached through our overlapping morning hours and our Canada contact line", lang: "English, with French and many community languages",
    places: ["Downtown Toronto", "Mississauga", "Brampton", "Markham", "Scarborough", "Vaughan"],
    sectors: [
      { name: "Fintech and technology companies", hook: "need compliant, clear product marketing and automation for a regulated, competitive market" },
      { name: "Immigration, education and settlement services", hook: "reach international students and newcomers who start their search before they arrive" },
      { name: "South Asian and multicultural businesses across the GTA", hook: "serve communities that are active on WhatsApp, YouTube and Instagram and expect culturally fluent content" },
      { name: "Real estate, mortgage and construction firms", hook: "depend on local search and trust signals in one of North America's busiest property markets" },
      { name: "Restaurants, retail and e-commerce brands", hook: "need strong visuals, local search and efficient paid social" },
    ],
    market: "Toronto and the wider Greater Toronto Area form Canada's largest business market: finance, technology, real estate, education and retail, with one of the world's most multicultural customer bases. Amphin also has a Canada contact line and an Alberta presence, so Canadian clients speak to a team that understands local expectations.",
    challenge: "audiences are diverse and spread across many languages and platforms, so one generic campaign rarely works across the whole GTA",
    search: "Searches usually name a neighbourhood or suburb (Mississauga, Brampton, Scarborough), mix \"near me\" with service terms, and use Canadian spelling and pricing in Canadian dollars.",
  },
  {
    slug: "sydney", name: "Sydney", full: "Sydney, Australia", region: "us", country: "Australia",
    tz: "Australian Eastern time (UTC+10/+11), with a scheduled early-morning UK and late-evening India overlap", lang: "English",
    places: ["Sydney CBD", "Parramatta", "North Sydney", "Surry Hills", "Bondi", "Chatswood"],
    sectors: [
      { name: "Property, trades and home services", hook: "win work through local search, reviews and quick, professional enquiry handling" },
      { name: "International education and migration advisers", hook: "reach students and applicants overseas, often in India and Asia, long before they land in Australia" },
      { name: "Hospitality, wellness and retail in Bondi, Surry Hills and the CBD", hook: "build brand and bookings through content and Instagram-first discovery" },
      { name: "Fintech, SaaS and professional services", hook: "need credible content and automation that supports a longer B2B sales cycle" },
      { name: "Tourism and experience providers", hook: "sell to travellers who plan and book online months ahead" },
    ],
    market: "Sydney is Australia's biggest commercial centre, with strong property, finance, education, hospitality and technology sectors, and a large community with links to India and Asia. Customers are digitally confident and expect fast, mobile-first service.",
    challenge: "the time-zone gap with most digital agencies is a real problem, so clear written briefs, recorded updates and a fixed weekly rhythm matter more than ad-hoc calls",
    search: "Searches use Australian English (\"enquiry\", \"colour\"), commonly include a suburb, and for services end with \"Sydney\" or \"near me\".",
  },
  {
    slug: "singapore", name: "Singapore", full: "Singapore", region: "us", country: "Singapore",
    tz: "Singapore Time (UTC+8), which overlaps comfortably with our India working day", lang: "English, with Mandarin, Malay and Tamil audiences",
    places: ["Raffles Place", "Marina Bay", "Orchard", "one-north", "Jurong", "Tampines"],
    sectors: [
      { name: "Regional headquarters and professional services", hook: "need a consistent brand and content across several Southeast Asian markets" },
      { name: "E-commerce, retail and F&B brands", hook: "compete on marketplaces and social platforms where costs rise every quarter" },
      { name: "Fintech and technology start-ups", hook: "need compliant messaging, polished product sites and efficient lead generation" },
      { name: "Logistics, trading and supply chain firms", hook: "have complex offers that need clear explanation for international buyers" },
      { name: "Education, wellness and lifestyle businesses", hook: "reach busy, mobile-first customers who decide quickly and compare constantly" },
    ],
    market: "Singapore is a small, highly connected market that acts as the regional base for many international companies. Customers are digitally sophisticated, brands often target several countries from one site, and clarity and trust signals carry a lot of weight.",
    challenge: "the home market is small, so most businesses need to speak to regional audiences too, which means clean site structure and multi-market content from the start",
    search: "Searches are mostly in English, with a visible mix of Mandarin, Malay and Tamil queries, and compare providers on reviews, credentials and clear pricing.",
  },
  {
    slug: "dubai", name: "Dubai", full: "Dubai, United Arab Emirates", region: "ae", country: "United Arab Emirates",
    tz: "Gulf Standard Time (UTC+4), working with our Abu Dhabi team on the same clock", lang: "English and Arabic",
    places: ["Business Bay", "DIFC", "Downtown Dubai", "Dubai Marina", "Jumeirah Lakes Towers", "Deira"],
    sectors: [
      { name: "Real estate developers, brokers and property platforms", hook: "run high-value campaigns where lead quality matters more than lead count" },
      { name: "Hospitality, restaurants and luxury retail", hook: "depend on strong visuals, influencers and Instagram to stay visible in a very crowded city" },
      { name: "Free-zone companies and international start-ups", hook: "need a credible site and brand quickly, often with Arabic and English versions" },
      { name: "E-commerce and delivery businesses", hook: "face intense paid-media competition and rising customer acquisition costs" },
      { name: "Healthcare, beauty and wellness clinics", hook: "need trust, reviews and clear information in several languages" },
    ],
    market: "Dubai is the Gulf's main commercial and tourism hub, with real estate, hospitality, retail, trade and a large free-zone business community. Audiences are international, spend heavily online and respond to polished, visual brands.",
    challenge: "competition for ad space is intense and customers come from dozens of countries, so targeting and creative both need to be precise",
    search: "Searches are mostly English with a significant Arabic share, often include an area such as Business Bay or Marina, and are heavily influenced by maps, reviews and social proof.",
  },
  {
    slug: "saudi-arabia", name: "Saudi Arabia", full: "Riyadh, Jeddah and across Saudi Arabia", region: "ae", country: "Saudi Arabia",
    tz: "Arabia Standard Time (UTC+3), one hour behind our Abu Dhabi team", lang: "Arabic first, with English",
    places: ["Riyadh", "Jeddah", "Dammam", "Al Khobar", "Madinah", "NEOM"],
    sectors: [
      { name: "Retail, F&B and e-commerce brands", hook: "sell to a young, social-first audience that shops heavily on mobile" },
      { name: "Construction, real estate and giga-project suppliers", hook: "need credible B2B presence as large developments bring new buyers and partners" },
      { name: "Tourism, hospitality and entertainment", hook: "target a fast-growing domestic and international visitor market" },
      { name: "Healthcare, education and professional services", hook: "need bilingual, trustworthy content that satisfies local expectations" },
      { name: "Start-ups and technology companies", hook: "need product marketing, Arabic localisation and automation that scale" },
    ],
    market: "Saudi Arabia is the Gulf's largest economy and is changing quickly under its national transformation programme, with large investment in tourism, entertainment, real estate, technology and retail. A young population and very high smartphone and social media use make digital the main route to customers.",
    challenge: "Arabic-first content, local expectations and platform habits (Snapchat, TikTok, X, Instagram) differ from the rest of the Gulf, so translated copies of foreign campaigns underperform",
    search: "Searches are heavily in Arabic as well as English, vary between Riyadh, Jeddah and the Eastern Province, and are strongly shaped by social platforms as well as Google.",
  },
];

export interface Topic {
  slug: string; phrase: string; noun: string; services: string[]; pillar: string; keywords: string[];
  lead: (a: Area) => string;
  why: (a: Area) => string[];
  tactic: (s: Sector, a: Area) => string;
  deliverables: string[];
  steps: [string, string][];
  faq: (a: Area) => [string, string][];
}

export const TOPICS: Topic[] = [
  {
    slug: "digital-marketing", phrase: "Digital Marketing Agency", noun: "digital marketing", services: ["seo", "ppc-campaigns", "email-marketing", "smm"], pillar: "seo-performance",
    keywords: ["digital marketing agency", "digital marketing company", "online marketing services", "performance marketing", "lead generation agency"],
    lead: (a) => `A full-service digital marketing team for ${a.full}: search, paid media, email and content run as one plan, with reporting that shows enquiries and sales instead of vanity numbers.`,
    why: (a) => [
      `Digital marketing works when each channel has a job. Search captures people who already want what you sell, paid media reaches new audiences faster, email brings customers back, and content gives all three something worth clicking. For ${a.name}, we start from your enquiries and revenue and work backwards to the channels that can deliver them.`,
      `${a.market} That is why we begin with a short audit of how customers currently find you, then build a channel mix around what is actually working rather than copying a template.`,
    ],
    tactic: (s) => `${s.name} usually need a tighter mix of local search, paid campaigns and follow-up email, so we set that up first and expand only once cost per enquiry is under control.`,
    deliverables: ["Channel audit and a 90-day plan with targets", "Google and Bing search campaigns and landing pages", "Meta, YouTube and LinkedIn paid campaigns", "Technical SEO and content roadmap", "Email and WhatsApp follow-up automation", "Monthly report tied to enquiries and sales"],
    steps: [["Audit", "We review your site, accounts, competitors and tracking to find what is working and what is wasted."], ["Plan", "We agree targets, channels and budgets in writing, with a realistic view of timelines."], ["Build", "Tracking, landing pages, ads and email flows are set up and tested before spend begins."], ["Run", "We manage and adjust campaigns weekly, pausing what fails and scaling what works."], ["Report", "A monthly review shows results against the plan and what we will change next."]],
    faq: (a) => [
      [`How much does digital marketing cost in ${a.name}?`, "Pricing depends on channels and ad spend. Our management fee is quoted separately from your ad budget, and you receive a fixed quote after a short call. There are no long lock-in contracts."],
      [`How soon will we see results from digital marketing in ${a.name}?`, "Paid campaigns can produce enquiries within weeks once tracking and landing pages are live. Search engine optimisation is slower and is normally measured over three to six months. We do not promise rankings, and we will say so if a target is unrealistic."],
      [`Do you understand the ${a.name} market without an office there?`, `We work online with clients in ${a.name}, and our team researches your local competitors, search terms and audience before we plan anything. Your brief, data and goals set the strategy, not our location.`],
    ],
  },
  {
    slug: "social-media-marketing", phrase: "Social Media Marketing Company", noun: "social media marketing", services: ["smm", "instagram", "facebook", "youtube"], pillar: "social-media",
    keywords: ["social media marketing company", "social media agency", "instagram marketing", "social media management", "reels and content creation"],
    lead: (a) => `Social media strategy, content, community management and paid social for businesses in ${a.full}, built around what your customers actually watch, save and share.`,
    why: (a) => [
      `A social account that posts daily but gets no enquiries is just a cost. We plan content around three jobs: being discovered by new people, building trust with people who already know you, and giving ready buyers an easy way to act. Every post, reel and story has one of those jobs.`,
      `${a.search} We use that to choose formats, hooks, languages and posting times for ${a.name}, and we review insights every month to keep what works and drop what does not.`,
    ],
    tactic: (s) => `For ${s.name.toLowerCase()}, content focuses on proof, behind-the-scenes and clear calls to action so followers become enquiries instead of staying passive viewers.`,
    deliverables: ["Platform and audience strategy", "Monthly content calendar with scripts and captions", "Reels, short video, carousels and stories", "Community management and comment handling", "Paid social campaigns with creative testing", "Monthly analytics with plain-language recommendations"],
    steps: [["Discover", "We study your audience, competitors and existing content to decide where you can win."], ["Strategy", "We define content pillars, formats, tone and the actions you want followers to take."], ["Create", "Our designers, editors and writers produce the month's content for your approval."], ["Publish and engage", "We schedule posts, reply to messages and comments, and run paid boosts where they make sense."], ["Measure", "We review reach, saves, clicks and enquiries and adjust next month's plan."]],
    faq: (a) => [
      [`What does social media marketing cost for a business in ${a.name}?`, "Packages depend on how many platforms, posts and videos you need, plus any paid ad budget. We give a fixed monthly quote after understanding your goals."],
      [`Can you create content that suits ${a.name} audiences?`, `Yes. ${a.lang} content is planned with references your audience recognises. You approve every post before it goes out, and we adjust tone, language and visuals based on your feedback.`],
      [`Which platforms do you manage?`, "Instagram, Facebook, YouTube, LinkedIn and X, with TikTok and WhatsApp channels where they fit. We recommend fewer platforms done well over all platforms done thinly."],
    ],
  },
  {
    slug: "podcast-production", phrase: "Podcast Production Company", noun: "podcast production", services: ["content-production", "video-production", "content-marketing"], pillar: "content-video",
    keywords: ["podcast production company", "podcast production services", "video podcast", "podcast editing", "podcast launch and marketing"],
    lead: (a) => `Podcast strategy, remote recording, editing, show notes, clips and distribution for founders, brands and creators in ${a.full}. You talk; we handle everything else.`,
    why: (a) => [
      `A podcast is one of the few formats that lets customers spend thirty minutes with you by choice. For a brand it builds authority; for a founder it builds a personal name; for a creator it builds a direct audience. The hard part is not recording; it is consistency, sound quality and getting each episode in front of people.`,
      `Because everything is done online, you can record from your own studio or a quiet room in ${a.name}, on a schedule that suits ${a.tz.split(",")[0]}. We handle editing, mastering, artwork, titles, show notes and publishing, and cut each episode into short clips for reels, Shorts and LinkedIn.`,
    ],
    tactic: (s) => `${s.name} can use a podcast to answer the questions customers already ask, which doubles as searchable, shareable content for the rest of the year.`,
    deliverables: ["Show concept, format and episode plan", "Remote recording setup and guest scheduling", "Audio and video editing with noise clean-up and mastering", "Cover art, intro and outro music or voice-over", "Titles, show notes and transcripts for search", "Distribution to Spotify, Apple Podcasts, YouTube and others", "Short clips for Instagram, YouTube Shorts and LinkedIn"],
    steps: [["Concept", "We define who the show is for, the format, the length and the first ten episode ideas."], ["Set-up", "We choose your recording tools, create artwork and branding, and prepare hosting and feeds."], ["Record", "You record remotely or in your own space with our guidance; we handle guest coordination."], ["Produce", "We edit, master, write show notes and cut clips, then send each episode for your approval."], ["Publish and grow", "We release on a steady schedule, promote across social channels and review listener data."]],
    faq: (a) => [
      [`Can you produce a podcast for me if I am in ${a.name}?`, `Yes. Recording is done remotely, so you can work from ${a.name} with a decent microphone and a quiet room. We guide you through the set-up and edit everything afterwards.`],
      ["Do I need professional equipment?", "No. A good USB microphone and headphones are enough to start. We will recommend equipment for your budget and upgrade as the show grows."],
      ["Do you also produce video podcasts?", "Yes. We can edit multi-camera or single-camera video, add captions and branding, and publish to YouTube alongside the audio feed."],
    ],
  },
  {
    slug: "graphic-design", phrase: "Graphic Design & Branding Studio", noun: "graphic design", services: ["graphic-design", "brand-identity-design", "ui-design"], pillar: "branding",
    keywords: ["graphic design company", "logo design", "brand identity design", "branding agency", "ui ux design studio"],
    lead: (a) => `Logo, brand identity, print, social and UI design for businesses in ${a.full}. One designer-led team, clear revisions and files ready for every channel.`,
    why: (a) => [
      `Design is not decoration; it is how a customer decides, in seconds, whether to trust you. A consistent identity (logo, colours, type, imagery and tone) makes every other piece of marketing cheaper and more effective, because people recognise you before they read a word.`,
      `${a.challenge.charAt(0).toUpperCase()}${a.challenge.slice(1)}. A distinctive, well-documented identity is the simplest way to stand out, and we deliver it as a brand guideline plus ready-to-use files so your team, printers and agencies stay consistent.`,
    ],
    tactic: (s) => `For ${s.name.toLowerCase()}, we design the identity and the first set of working assets (profiles, templates, packaging or signage) together so the brand is usable from day one.`,
    deliverables: ["Brand discovery workshop and moodboards", "Logo suite in every format", "Colour palette, typography and brand guidelines", "Stationery, packaging, signage and print layouts", "Social media templates and profile assets", "Website and app UI design in Figma"],
    steps: [["Discovery", "We learn your business, audience and competitors, and agree what the brand must say."], ["Concepts", "We present distinct design directions with reasoning, not just pretty options."], ["Refine", "We revise the chosen direction with your feedback until it is right."], ["System", "We build the guideline and every asset you need to use the brand consistently."], ["Handover", "You receive organised, editable files and a short walkthrough for your team."]],
    faq: (a) => [
      [`Can you design a logo and brand for a ${a.name} business remotely?`, "Yes. Discovery happens over calls and shared documents, concepts are presented on screen, and final files are delivered digitally. We also coordinate with your local printers when you need physical items."],
      ["How many revisions are included?", "Each package includes defined revision rounds, so feedback stays focused. We agree the scope and number of rounds in your quote before work begins."],
      ["Do I own the design?", "Yes. After final payment you own the final artwork. Terms are written into your agreement."],
    ],
  },
  {
    slug: "ai-agent-development", phrase: "AI Agent Development Company", noun: "AI agent development", services: ["automation", "instagram-automation", "technical-support"], pillar: "it-systems",
    keywords: ["ai agent development company", "ai agents for business", "ai chatbot development", "workflow automation", "whatsapp ai assistant"],
    lead: (a) => `Custom AI agents for businesses in ${a.full}: assistants that answer customers, qualify leads, update your systems and hand over to a human when it matters.`,
    why: (a) => [
      `An AI agent is software that understands a request, decides what to do and takes action in your tools: replying on WhatsApp, booking appointments, drafting quotes, updating a CRM or chasing invoices. Done well, it removes repetitive work and answers customers at any hour. Done badly, it frustrates people, so we design the guardrails, hand-off to staff and testing as carefully as the model itself.`,
      `${a.market} Most teams there do not need a research project; they need two or three dependable automations that save hours every week. We start with the most valuable one, prove it works, then extend it.`,
    ],
    tactic: (s) => `For ${s.name.toLowerCase()}, an agent can take on repetitive enquiries and routine admin so staff spend their time on the work only people can do.`,
    deliverables: ["Use-case discovery and a ranked automation roadmap", "Customer-facing agents for WhatsApp, web chat and email", "Internal agents for CRM, reporting and document handling", "Integrations with your existing tools and APIs", "Guardrails, human hand-off and activity logs", "Testing, monitoring and monthly improvement reviews"],
    steps: [["Discover", "We map your repetitive tasks and pick the one that saves the most time with the least risk."], ["Design", "We define what the agent can and cannot do, its tone, its data access and when it hands over to a person."], ["Build", "We build and connect the agent to your tools, using a model and architecture that fit your budget and privacy needs."], ["Test", "We test with real scenarios, edge cases and your team before any customer sees it."], ["Launch and improve", "We go live in stages, monitor conversations and refine the agent every month."]],
    faq: (a) => [
      [`Can AI agents handle customers in ${a.lang.split(",")[0].split(" and ")[0]}${a.lang.includes("Arabic") || a.lang.includes("Malayalam") ? " and local languages" : ""}?`, `Modern models handle many languages, including ${a.lang.toLowerCase()}. We test the agent on real examples of your customer conversations before launch and set it to hand over to a person when it is unsure.`],
      ["Is my customers' data safe?", "We keep data access to the minimum the agent needs, store credentials securely and agree where data is processed before building. We do not promise that no model will ever make a mistake; that is why we build guardrails and human review."],
      ["How long does an AI agent take to build?", "A focused first agent typically takes a few weeks including testing. Larger multi-system projects are scoped in phases so you see value early."],
    ],
  },
  {
    slug: "ai-development", phrase: "AI Development Company", noun: "AI development", services: ["automation", "custom-web-development", "app-development"], pillar: "it-systems",
    keywords: ["ai development company", "custom ai solutions", "ai software development", "machine learning development", "generative ai for business"],
    lead: (a) => `AI software development for companies in ${a.full}: practical products such as document processing, search, recommendations, forecasting and generative-AI features, built into your web or mobile app.`,
    why: (a) => [
      `Useful AI is rarely a standalone demo. It is a feature inside software people already use: a smarter search, a document reader that fills forms, a forecast on a dashboard, a writing assistant in a CRM. We build those features properly, with data handling, evaluation and cost control, so they keep working after the launch excitement fades.`,
      `${a.challenge.charAt(0).toUpperCase()}${a.challenge.slice(1)}. AI can help, but only if it is pointed at a specific, measurable problem. We start by defining that problem and the test that proves the solution works.`,
    ],
    tactic: (s) => `${s.name} typically have a repetitive, data-heavy task (sorting enquiries, reading documents, forecasting demand) where a focused AI feature can save real hours.`,
    deliverables: ["Opportunity assessment and feasibility check", "Generative-AI features: chat, summarisation, drafting, search", "Document, image and data extraction pipelines", "Recommendation and forecasting models where data supports them", "Secure APIs and integration with web and mobile apps", "Evaluation, cost monitoring and ongoing improvement"],
    steps: [["Assess", "We check whether AI is the right tool, what data you have and what success looks like."], ["Prototype", "We build a small working version and test it on your real examples."], ["Evaluate", "We measure accuracy, speed and cost, and decide together whether to go further."], ["Build", "We turn the prototype into a secure, maintainable feature in your product."], ["Operate", "We monitor quality and cost and improve the system as your data and needs grow."]],
    faq: (a) => [
      ["Do we need a lot of data to use AI?", "Not always. Many useful features use existing models with your documents or rules. Custom models need more data, and we will tell you honestly if you do not have enough to justify one."],
      [`Can you integrate AI into our existing system in ${a.name}?`, "Yes. We add AI features to existing web and mobile apps and internal tools through APIs, so you do not need to rebuild everything."],
      ["How do you control the cost of AI?", "We choose models by task, cache and batch where possible, set usage limits and report running costs, so there are no surprise bills."],
    ],
  },
  {
    slug: "web-design-development", phrase: "Web Design & Development Company", noun: "web design and development", services: ["web-development", "custom-web-development", "wordpress-websites", "shopify-stores"], pillar: "web-development",
    keywords: ["web design company", "website development company", "ecommerce website development", "wordpress developer", "shopify store design"],
    lead: (a) => `Fast, search-friendly websites and online stores for businesses in ${a.full}: designed to be found, trusted and used on a phone, and built so your team can update them.`,
    why: (a) => [
      `A website has three jobs: be found, be believed and be easy to act on. That means fast loading, clean structure that search engines can read, content that answers real questions, and a clear path to call, book or buy. We design and build for those jobs first and for ornament second.`,
      `${a.search} We reflect that in page structure, headings, language options and local details, so the site speaks to the way people in ${a.name} actually search and decide.`,
    ],
    tactic: (s) => `A site for ${s.name.toLowerCase()} should put the proof, prices or process where visitors look first, and make the next step (call, book, buy) obvious on a phone.`,
    deliverables: ["Sitemap, wireframes and visual design", "Custom, WordPress, Shopify or WooCommerce build", "Mobile-first, fast, accessible pages", "On-page SEO, schema markup and analytics set-up", "Forms, bookings, payments and CRM integrations", "Training, documentation and ongoing care plans"],
    steps: [["Plan", "We agree goals, audience, structure and content so the site is built for outcomes."], ["Design", "We design key pages in Figma and refine them with your feedback before development."], ["Build", "We develop the site on the platform that suits your needs and budget, with speed and security built in."], ["Test and launch", "We check devices, speed, forms, tracking and redirects, then launch carefully."], ["Support", "We monitor, update and improve the site after launch so it keeps performing."]],
    faq: (a) => [
      [`How much does a website cost in ${a.name}?`, `Costs depend on pages, features and platform. A simple business site and a custom e-commerce store are very different projects, so we quote a fixed price after a short discovery call, in the currency you prefer.`],
      ["Will my site rank on Google?", "We build sites that search engines can crawl and understand, with proper structure and speed. Ranking also depends on competition and content over time, and nobody can honestly guarantee a position."],
      ["Can I edit the website myself?", "Yes. We use content systems your team can update, and we train you. We also offer a care plan if you would rather have us handle updates."],
    ],
  },
  {
    slug: "it-software-solutions", phrase: "IT & Software Solutions Company", noun: "IT and software solutions", services: ["custom-web-development", "app-development", "e-pos-system", "accounting-software-solutions", "technical-support"], pillar: "it-systems",
    keywords: ["it solutions company", "custom software development", "business software solutions", "mobile app development", "it support services"],
    lead: (a) => `One team for the software a growing business needs in ${a.full}: custom web apps, mobile apps, internal tools, POS and accounting systems, email and IT support.`,
    why: (a) => [
      `Most small and mid-sized businesses end up with many disconnected tools: a website from one vendor, email from another, a spreadsheet for stock and a separate system for billing. We design these as one connected system, so information is entered once and flows to where it is needed.`,
      `${a.market} Our approach is to start with the most painful manual process, replace it with software that your team likes using, and extend from there, rather than selling a large system that takes a year to deliver.`,
    ],
    tactic: (s) => `For ${s.name.toLowerCase()}, we would map how work actually flows today, then replace the slowest manual step first so the benefit is visible within weeks.`,
    deliverables: ["Requirements workshop and a phased delivery plan", "Custom web applications and internal dashboards", "Android and iOS apps", "POS, inventory and accounting integrations", "Business email, Google Workspace and security set-up", "Support, maintenance and cybersecurity reviews"],
    steps: [["Understand", "We map your current processes, tools and pain points before proposing anything."], ["Scope", "We define a first release small enough to deliver quickly and valuable enough to matter."], ["Build", "We develop in short cycles with regular demos so you see progress."], ["Launch", "We migrate data, train your team and support you through the first weeks."], ["Support", "We maintain, secure and extend the system as your business grows."]],
    faq: (a) => [
      [`Can you build software for a business in ${a.name} without being on site?`, "Yes. Requirements, demos and training happen over video calls and shared documents, and we have delivered projects for clients in several countries this way."],
      ["Who owns the software and the data?", "You own your data. Ownership of the code and licensing terms are written into the agreement before work begins."],
      ["Do you provide support after launch?", "Yes. We offer maintenance and support plans covering updates, monitoring, backups and security."],
    ],
  },
];

export interface AreaPage { slug: string; area: Area; topic: Topic }

export function areaPageSlug(topic: Topic, area: Area) {
  const phrase = topic.phrase.toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${phrase}-${area.slug}`;
}

export function buildAreaPages(): AreaPage[] {
  const out: AreaPage[] = [];
  for (const area of AREAS) {
    for (const topic of TOPICS) {
      if (area.topics && !area.topics.includes(topic.slug)) continue;
      out.push({ slug: areaPageSlug(topic, area), area, topic });
    }
  }
  return out;
}

export function findAreaPage(region: string, slug: string): AreaPage | undefined {
  return buildAreaPages().find((p) => p.slug === slug && p.area.region === region);
}
