// Draft legal pages. Written for Amphin's set-up (UK company + India MSME, Supabase in Mumbai,
// Cloudflare R2, Vercel hosting). Every page is marked as a draft until reviewed by a solicitor.
// In AMOS these become web_legal_pages rows with version numbers.
import { COMPANY, EMAILS } from "./site";

export interface LegalPage { slug: string; title: string; summary: string; version: string; updated: string; sections: [string, string[]][] }

const UPDATED = "2026-10-24";
const who = `${COMPANY.ukEntity}, ${COMPANY.ukRegistration.toLowerCase()} (company no. ${COMPANY.ukCompanyNumber}), and ${COMPANY.indiaEntity}, ${COMPANY.indiaRegistration.toLowerCase()}`;

export const LEGAL: LegalPage[] = [
  {
    slug: "privacy-policy", title: "Privacy Policy", version: "0.1 draft", updated: UPDATED,
    summary: "What personal data we collect through this website, why, where it is stored and your rights.",
    sections: [
      ["Who we are", [`This website is run by ${who} ("Amphin", "we"). For privacy questions or requests, email ${EMAILS.support}.`]],
      ["What we collect", [
        "Details you send us through forms: name, email, phone, company, the service you are interested in, budget and your message.",
        "Job applications: your contact details, links, CV and anything you choose to tell us.",
        "Amphin Connect signups: social handles, audience information, brand and campaign details.",
        "Newsletter: your email address and region.",
        "Technical data: pages visited, approximate country (from your IP address, used to choose your region and not stored with your identity), browser and referring page.",
      ]],
      ["Why we use it", [
        "To reply to your enquiry and prepare proposals (legitimate interests, or steps before a contract).",
        "To assess job applications (legitimate interests).",
        "To send the newsletter you asked for (consent, which you can withdraw at any time).",
        "To keep the website secure and understand how it is used (legitimate interests; analytics cookies only with consent).",
      ]],
      ["Where it is stored", [
        "Form submissions are stored in our customer relationship system (AMOS), hosted on Supabase in Mumbai, India. Files such as CVs are stored on Cloudflare R2. The website is hosted by Vercel.",
        "Where data leaves the UK or EEA, we rely on appropriate safeguards such as the UK International Data Transfer Addendum or EU Standard Contractual Clauses.",
      ]],
      ["How long we keep it", ["Enquiries: up to 3 years after our last contact. Job applications: up to 12 months unless you agree to longer. Newsletter: until you unsubscribe."]],
      ["Your rights", [
        "Depending on where you live (UK GDPR, EU GDPR, India's Digital Personal Data Protection Act 2023), you may access, correct, delete or move your data, object to or restrict processing, and withdraw consent.",
        `Email ${EMAILS.support} and we will respond within one month. In the UK you can also complain to the Information Commissioner's Office (ico.org.uk).`,
      ]],
    ],
  },
  {
    slug: "cookie-policy", title: "Cookie Policy", version: "0.1 draft", updated: UPDATED,
    summary: "The cookies this website sets and how to control them.",
    sections: [
      ["Strictly necessary", ["amphin_region: remembers the region you chose (e.g. /uk/ or /in/) for one year. Security cookies may be set by our CAPTCHA provider (Cloudflare Turnstile) when you submit a form."]],
      ["Analytics (optional)", ["Only set if you accept analytics cookies. They help us understand which pages are useful. You can change your choice at any time from the cookie settings link in the footer."]],
      ["Marketing (optional)", ["Only set if you accept marketing cookies, for example to measure advertising campaigns."]],
    ],
  },
  {
    slug: "terms-of-use", title: "Terms of Use", version: "0.1 draft", updated: UPDATED,
    summary: "The rules for using this website.",
    sections: [
      ["Using this site", ["You may browse and share links to this website for personal and business use. Do not misuse it, attempt to break its security, or scrape it at scale."]],
      ["Our content", [`All content, including case studies, images and the ${COMPANY.trademark} name and logo, belongs to Amphin or our clients and may not be reused without permission.`]],
      ["Accuracy", ["Prices on this site are starting prices and not offers. Final pricing is confirmed in a written proposal."]],
      ["Liability", ["We provide this website as it is. Nothing in these terms limits liability that cannot be limited by law."]],
      ["Law", ["These terms are governed by the laws of England and Wales, unless you are a consumer elsewhere with mandatory local rights."]],
    ],
  },
  {
    slug: "terms-of-service", title: "Terms of Service", version: "0.1 draft", updated: UPDATED,
    summary: "How client engagements work: proposals, payment, ownership and cancellation.",
    sections: [
      ["Engagements", ["Each project or retainer is set out in a proposal or statement of work, which takes priority over these terms where they differ."]],
      ["Payment", ["Retainers are invoiced monthly in advance. Projects are invoiced in stages. UK clients are invoiced by Amphin LTD; India clients by Amphin (India). Late payments may pause work."]],
      ["Ownership", ["Once paid in full, you own the final deliverables created for you. We may show the work in our portfolio unless agreed otherwise. Third-party assets (fonts, stock, software) remain under their own licences."]],
      ["Cancellation", ["Retainers can be cancelled with 30 days' written notice unless your proposal says otherwise. Work completed up to cancellation is chargeable."]],
    ],
  },
  {
    slug: "refund-policy", title: "Refund & Cancellation Policy", version: "0.1 draft", updated: UPDATED,
    summary: "When refunds apply to our services.",
    sections: [
      ["Services", ["Because our work is custom, fees for work already delivered are not refundable. If we cannot start work you have paid for, we refund the unused amount in full."]],
      ["Disputes", [`If you are unhappy with a deliverable, tell us within 14 days at ${EMAILS.support} and we will work with you to put it right.`]],
    ],
  },
  {
    slug: "acceptable-use", title: "Acceptable Use Policy", version: "0.1 draft", updated: UPDATED,
    summary: "What we will not create or promote for clients or Connect members.",
    sections: [["Not allowed", ["Content that is illegal, misleading, hateful, sexually explicit, or that infringes someone else's rights; gambling or other regulated promotions without the required licences; fake reviews or engagement."]]],
  },
  {
    slug: "accessibility", title: "Accessibility Statement", version: "0.1 draft", updated: UPDATED,
    summary: "Our commitment to an accessible website.",
    sections: [["Our aim", [`We aim to meet WCAG 2.1 level AA. The site supports keyboard navigation, screen readers and reduced-motion settings. If something is hard to use, email ${EMAILS.support}.`]]],
  },
  {
    slug: "modern-slavery", title: "Modern Slavery Statement", version: "0.1 draft", updated: UPDATED,
    summary: "Our approach to preventing modern slavery in our business and supply chain.",
    sections: [["Statement", ["Amphin does not tolerate slavery, forced labour or human trafficking in our business or supply chain. We pay fair wages, work with reputable suppliers and will act on any concern raised with us."]]],
  },
  {
    slug: "trademark", title: "Trademark Notice", version: "0.1 draft", updated: UPDATED,
    summary: `${COMPANY.trademark} name and logo.`,
    sections: [["Trademark", [`${COMPANY.trademark} and the Amphin logo are registered trademarks. Please do not use them in a way that suggests endorsement without written permission. Client names and logos belong to their owners.`]]],
  },
  {
    slug: "company-information", title: "Company Information", version: "0.1 draft", updated: UPDATED,
    summary: "Registered details of the Amphin companies.",
    sections: [
      ["United Kingdom", [`${COMPANY.ukEntity}. ${COMPANY.ukRegistration}. Company number ${COMPANY.ukCompanyNumber}.`, "Office: Office 19, 241E High St N, London E12 6SJ."]],
      ["India", [`${COMPANY.indiaEntity}. ${COMPANY.indiaRegistration}. Udyam registration number: to be added.`, "Office: C3 V Square IT Hub, Kakkanad West, Kochi, Kerala 682030."]],
      ["Contact", [`${EMAILS.hello} · ${EMAILS.support}`]],
    ],
  },
  {
    slug: "careers-privacy", title: "Careers Privacy Notice", version: "0.1 draft", updated: UPDATED,
    summary: "How we handle job applicants' data.",
    sections: [["Applicants", ["We use your application only to assess you for the role you applied for (and similar roles if you agree). HR and the hiring manager can see it. We keep it for up to 12 months, then delete it unless you ask us to keep it longer."]]],
  },
];

export const getLegal = (slug: string) => LEGAL.find((l) => l.slug === slug);
