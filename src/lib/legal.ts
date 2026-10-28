// Legal pages. Written for Amphin's actual set-up (UK company + India MSME, AMOS on Supabase in Mumbai,
// files on Cloudflare R2, website on Vercel) and for visitors in the UK, EU, US, India, UAE and Canada.
// Every page stays marked as a draft until a solicitor has reviewed it (see docs/LEGAL-CHECKLIST.md).
// In AMOS these become web_legal_pages rows with version numbers.
import { COMPANY, EMAILS, PHONES } from "./site";

export interface LegalPage { slug: string; title: string; summary: string; version: string; updated: string; sections: [string, string[]][] }

const UPDATED = "2026-10-24";
const VERSION = "1.0 draft";
const who = `${COMPANY.ukEntity}, ${COMPANY.ukRegistration.toLowerCase()} (company no. ${COMPANY.ukCompanyNumber}), and ${COMPANY.indiaEntity}, ${COMPANY.indiaRegistration.toLowerCase()}`;
const UK_OFFICE = "Office 19, 241E High St N, London E12 6SJ, United Kingdom";
const IN_OFFICE = "C3 V Square IT Hub, Kakkanad West, Kochi, Kerala 682030, India";

export const LEGAL: LegalPage[] = [
  {
    slug: "privacy-policy", title: "Privacy Policy", version: VERSION, updated: UPDATED,
    summary: "What personal data we collect through this website, why we use it, who we share it with, where it is stored and the rights you have wherever you live.",
    sections: [
      ["Who we are", [
        `This website (amphin.agency) is run by ${who} ("Amphin", "we", "us"). Amphin LTD is the controller for visitors and clients outside India; Amphin (India) is the data fiduciary for visitors and clients in India.`,
        `Privacy contact: ${EMAILS.support}, or write to us at ${UK_OFFICE}. In India, you can also write to our Grievance Officer at ${IN_OFFICE}.`,
      ]],
      ["What we collect", [
        "Enquiry and quote forms: your name, email, phone number, company, the service you are interested in, budget, region and your message.",
        "Job applications: your contact details, CV, portfolio links, the role you applied for and anything else you choose to send.",
        "Amphin Connect (creators and partners): your social media handles, audience information, rates and the brands or campaigns you are interested in.",
        "Newsletter: your email address and region.",
        "Phone calls, WhatsApp messages and emails you send us: the content of the conversation and your contact details.",
        "Website usage: the pages you visit, the region site you use, the type of device and the website that referred you. We count visits with a daily-changing anonymous code made from your IP address and browser. We do not store your IP address and cannot use the code to identify you.",
      ]],
      ["Why we use it and our legal basis", [
        "To reply to enquiries, prepare proposals and deliver services: taking steps at your request before a contract, performing a contract, or our legitimate interest in running our business.",
        "To assess job applications: our legitimate interest in recruiting, and steps before an employment contract.",
        "To send the newsletter: your consent, which you can withdraw at any time with the unsubscribe link or by emailing us.",
        "To measure how the website is used and keep it secure: our legitimate interest. Optional analytics tools (see the Cookie Policy) only run with your consent.",
        "To meet legal obligations such as tax, accounting and responding to lawful requests.",
        "In India, we process your data on the basis of your consent, given when you submit a form, or for the legitimate uses permitted by the Digital Personal Data Protection Act, 2023.",
        "We do not make decisions about you using only automated processing, and we do not sell your personal data.",
      ]],
      ["Who we share it with", [
        "Service providers that run our systems for us, under contract and only on our instructions: Vercel (website hosting), Supabase (database for our AMOS business system, hosted in Mumbai, India), Cloudflare (DNS, security checks on forms and file storage), Google (email and, if enabled, analytics and web fonts) and Microsoft (Clarity analytics, only if enabled and only with your consent).",
        "If you contact us on WhatsApp, Meta processes that conversation under its own terms and privacy policy.",
        "Videos embedded from YouTube or Instagram are delivered by Google or Meta when you choose to play them.",
        "Professional advisers, auditors, insurers and authorities where the law requires it, or to protect our rights.",
        "A buyer or successor if our business is reorganised or sold, under the same protections.",
      ]],
      ["International transfers", [
        "Amphin works across the UK, India and the UAE, and our providers operate in several countries, including the United States. Your data may therefore be processed outside the country where you live.",
        "When data leaves the UK or the European Economic Area, we use recognised safeguards such as the UK International Data Transfer Agreement or Addendum and the EU Standard Contractual Clauses, or rely on adequacy decisions where they exist.",
      ]],
      ["How long we keep it", [
        "Enquiries and proposals that do not lead to work: up to 3 years after our last contact.",
        "Client records: for the length of the engagement and up to 7 years afterwards for tax and legal purposes.",
        "Job applications: up to 12 months after the role is filled, unless you agree to us keeping them longer.",
        "Newsletter: until you unsubscribe.",
        "Anonymous visit counts: up to 25 months.",
      ]],
      ["How we protect it", [
        "Data is encrypted in transit (HTTPS) and access to our business system is limited to staff who need it, with role-based permissions and logged access. Sensitive employee and payroll fields are encrypted at rest.",
        "If a breach is likely to put your rights at risk, we will notify you and the relevant regulator as the law requires.",
      ]],
      ["Your rights", [
        "UK and EU: you can ask for access to your data, correction, deletion, restriction, a portable copy, and you can object to processing based on legitimate interests or to direct marketing. Where we rely on consent, you can withdraw it at any time.",
        "India: you can ask for a summary of your data and how it is processed, correction, completion, updating and erasure, nominate another person to act for you, and raise a grievance with our Grievance Officer.",
        "United States: we do not sell or share personal information for cross-context behavioural advertising. Residents of states with privacy laws can ask to know, correct or delete their information, and we will not treat you differently for doing so.",
        "UAE and Canada: you can ask for access to and correction of your data, and withdraw consent, as provided by local law.",
        `To use any of these rights, email ${EMAILS.support}. We may need to confirm your identity. We reply within one month (or sooner where local law requires).`,
      ]],
      ["Complaints", [
        `Please contact us first at ${EMAILS.support} so we can try to put things right.`,
        "UK: you can complain to the Information Commissioner's Office (ico.org.uk). EU: to the data protection authority where you live or work. India: once it is operating for your complaint, to the Data Protection Board of India, after first raising it with our Grievance Officer.",
      ]],
      ["Children", ["This website and our services are for businesses and adults. We do not knowingly collect data from anyone under 18. If you think a child has sent us their details, contact us and we will delete them."]],
      ["Changes", ["We will update this page when our practices change and show the date of the latest version at the top."]],
    ],
  },
  {
    slug: "cookie-policy", title: "Cookie Policy", version: VERSION, updated: UPDATED,
    summary: "The cookies and similar technologies this website uses, why, and how to control them.",
    sections: [
      ["Our approach", [
        "We keep cookies to a minimum. The website works without any optional cookies, and our own visit counting uses no cookies at all.",
        "Optional analytics only runs if you agree to it in the cookie banner. You can change your choice at any time with the \"Cookie settings\" link in the footer.",
      ]],
      ["Strictly necessary", [
        "amphin_region (first-party cookie, 1 year): remembers which regional site you chose (for example /uk or /in) so prices and contact details match your country.",
        "amphin_consent (browser storage, until you clear it): remembers your cookie choice so we do not ask again on every page.",
        "Preloader flag (browser session storage, cleared when you close the tab): stops the opening animation from replaying on every page.",
        "Cloudflare Turnstile (when you submit a form): a security check that tells people and automated spam apart. Cloudflare may set its own cookies for this.",
      ]],
      ["Analytics (optional, only with your consent)", [
        "Google Analytics (_ga, _ga_* cookies, up to 2 years): counts visits and shows how people move through the site. Only used if enabled by Amphin and accepted by you.",
        "Microsoft Clarity (_clck, _clsk, CLID cookies, up to 1 year): shows anonymised heatmaps of how pages are used. Only used if enabled by Amphin and accepted by you.",
      ]],
      ["Third-party content", [
        "Embedded videos: YouTube videos use YouTube's privacy-enhanced mode, which avoids setting cookies until you press play. Instagram embeds are delivered by Meta and may set Meta cookies.",
        "Web fonts: if a font is loaded from Google Fonts, your browser connects to Google, which receives your IP address. Google Fonts does not set cookies.",
        "WhatsApp: clicking a WhatsApp link takes you to WhatsApp, which applies its own terms and privacy policy.",
      ]],
      ["Managing cookies", [
        "Use the \"Cookie settings\" link in the footer to accept or reject optional analytics at any time.",
        "You can also block or delete cookies in your browser settings. Blocking the strictly necessary region cookie means the site may ask for your region again.",
      ]],
    ],
  },
  {
    slug: "terms-of-use", title: "Terms of Use", version: VERSION, updated: UPDATED,
    summary: "The rules for using amphin.agency, including our content, blog articles and prices shown on the site.",
    sections: [
      ["About these terms", [`These terms apply when you use amphin.agency. The website is run by ${who}. By using the site you agree to these terms. If you engage us for work, our Terms of Service and your proposal also apply.`]],
      ["Using the website", [
        "You may browse, read and share links to this website for personal and business purposes.",
        "Do not misuse the site: no attempts to break its security, overload it, introduce malicious code, collect data from it at scale with automated tools in breach of robots.txt, or use it for anything unlawful.",
        "Search engines and AI assistants may index and cite our public pages in line with robots.txt and llms.txt.",
      ]],
      ["Our content", [
        `The text, designs, case studies, images, the ${COMPANY.trademark} name and the Amphin logo belong to Amphin or to our clients and partners. You may quote short extracts with a link back to the source page. Any other reuse needs our written permission.`,
        "Client names, logos and work are shown with their permission and remain their property.",
      ]],
      ["Blog articles and information", [
        "Articles, guides and recaps are general information about marketing, technology and business. They are not legal, financial or professional advice for your situation. Check facts and figures against the original sources before relying on them.",
        "Recaps are dated by the period they cover. Read the Editorial Policy for how we prepare and update articles.",
      ]],
      ["Prices and availability", ["Prices on this site are starting prices in the currency of the region site you are viewing. They are not offers. The final scope and price are confirmed in a written proposal."]],
      ["Links to other sites", ["We link to other websites for convenience. We are not responsible for their content or privacy practices."]],
      ["Liability", [
        "We work hard to keep the site accurate and available, but we provide it \"as is\" and do not promise it will always be error-free or uninterrupted.",
        "We are not liable for indirect losses or for losses caused by relying on general information on the site. Nothing in these terms limits liability that cannot be limited by law, such as liability for death or personal injury caused by negligence, or for fraud.",
      ]],
      ["Governing law", ["These terms are governed by the laws of England and Wales, and the courts of England and Wales have jurisdiction. If you are a consumer, you keep any mandatory rights and the right to bring proceedings in the country where you live."]],
      ["Changes", ["We may update these terms. The date at the top shows the latest version."]],
    ],
  },
  {
    slug: "terms-of-service", title: "Terms of Service", version: VERSION, updated: UPDATED,
    summary: "How client engagements work: proposals, payment, approvals, ownership, confidentiality, data protection and ending the work.",
    sections: [
      ["Who you contract with", [`Clients in the UK, Europe, the Americas, the Middle East and elsewhere contract with Amphin LTD. Clients in India contract with ${COMPANY.indiaEntity} (India). Your proposal names the contracting company.`]],
      ["Proposals and scope", [
        "Each project or retainer is set out in a proposal or statement of work. It describes the deliverables, timeline, number of revision rounds and fees. Where it differs from these terms, the proposal takes priority.",
        "Work outside the agreed scope is quoted separately before we start it.",
      ]],
      ["Your responsibilities", [
        "Provide accurate information, content, access and approvals on time. Delays in feedback move the timeline.",
        "Make sure you have the rights to any materials you give us (logos, photos, text, music) and that your products, claims and offers comply with the law.",
      ]],
      ["Fees and payment", [
        "Retainers are invoiced monthly in advance. Projects are invoiced in stages as set out in the proposal. Invoices are due within 14 days unless agreed otherwise.",
        "Prices exclude VAT, GST or other taxes, which are added where they apply. Advertising spend paid to platforms such as Google or Meta is separate from our fees.",
        "If an invoice is overdue, we may pause work after giving notice. UK business clients may be charged statutory interest on late payments.",
      ]],
      ["Ownership and licences", [
        "When you have paid in full, you own the final deliverables we created for you. Drafts, unused concepts, our working files and our own tools (including AmOS) remain ours unless the proposal says otherwise.",
        "Third-party materials such as fonts, stock images, music, plugins and software stay under their own licences, which we will tell you about.",
        "We may show the work in our portfolio and case studies unless you ask us not to in writing.",
      ]],
      ["Confidentiality", ["Both of us will keep the other's confidential information private and use it only for the engagement, during the work and afterwards."]],
      ["Data protection", ["Where we process personal data on your behalf (for example running campaigns or managing customer lists), we act as your processor and will sign a data processing agreement that meets UK GDPR, EU GDPR and India DPDP requirements."]],
      ["Results", ["Marketing results depend on many factors outside our control, including platform algorithms, competition and your own operations. We do not guarantee specific rankings, followers, sales or media coverage unless a proposal expressly says so."]],
      ["Ending the work", [
        "Retainers can be ended by either of us with 30 days' written notice unless the proposal says otherwise. Work completed up to the end date is chargeable.",
        "Either of us may end the agreement immediately if the other seriously breaches it and does not fix the breach within 14 days of notice.",
      ]],
      ["Liability", ["Our total liability under an engagement is limited to the fees paid in the 12 months before the claim. We are not liable for indirect or consequential losses, such as lost profits. Nothing limits liability that cannot be limited by law."]],
      ["Governing law", ["Engagements with Amphin LTD are governed by the laws of England and Wales. Engagements with Amphin (India) are governed by the laws of India, with courts in Kochi, Kerala having jurisdiction. Your proposal can agree a different arrangement."]],
    ],
  },
  {
    slug: "refund-policy", title: "Refund & Cancellation Policy", version: VERSION, updated: UPDATED,
    summary: "When you can cancel and when refunds apply to our services.",
    sections: [
      ["Business clients", [
        "Because our work is made to order, fees for work already delivered or in progress are not refundable.",
        "If we cannot start work you have paid for, or we cancel it, we refund the unused amount in full.",
      ]],
      ["Consumers in the UK and EU", [
        "If you buy a service from us as an individual (not for your business) without meeting us in person, you can cancel within 14 days of agreeing to it.",
        "If you ask us to start within those 14 days, you will pay for the work done up to the point you cancel.",
      ]],
      ["Retainers", ["Monthly retainers can be cancelled with 30 days' written notice unless your proposal says otherwise. Months already started are not refunded."]],
      ["Problems with a deliverable", [`If you are unhappy with a deliverable, tell us within 14 days at ${EMAILS.support}. We will review it with you and make reasonable corrections within the agreed scope.`]],
      ["How refunds are paid", ["Refunds are paid to the original payment method within 14 days of being agreed."]],
    ],
  },
  {
    slug: "editorial-policy", title: "Editorial Policy", version: VERSION, updated: UPDATED,
    summary: "How we write, date, source and correct the articles on the Amphin blog.",
    sections: [
      ["What the blog is for", ["Our articles explain marketing, technology and business ideas in plain language for business owners. They are general information, not professional advice for your situation."]],
      ["How articles are prepared", [
        "Articles are written by the Amphin team. Some are prepared with the help of AI writing tools. Amphin is responsible for everything we publish.",
        "Examples described as illustrative are not client results. We do not invent case studies, quotes or statistics.",
      ]],
      ["Dates", ["Monthly and annual recaps are dated by the period they cover, so the archive reads in order. Many of these recaps were written or revised after that period, using the information available when they were prepared, and may be updated later."]],
      ["Sources", ["Where an article discusses a product launch, study or event, we link to or name the original source. Announcements, previews and general availability are different stages, and we try to say which one applies."]],
      ["Corrections", [`If you spot an error, email ${EMAILS.marketing}. We correct mistakes promptly and update the page.`]],
      ["Services and contact details", ["Articles may end with a link to a related Amphin service and our sales numbers. This is how we make the blog useful for readers who want help. It does not change what the article says."]],
    ],
  },
  {
    slug: "acceptable-use", title: "Acceptable Use Policy", version: VERSION, updated: UPDATED,
    summary: "What we will not create, publish or promote for clients, creators and Amphin Connect members.",
    sections: [
      ["Not allowed", [
        "Illegal content, or promotion of illegal products or services.",
        "Misleading claims, fake reviews, fake followers or bought engagement.",
        "Hate, harassment, or content that discriminates on the basis of a protected characteristic.",
        "Sexually explicit content, or any content involving minors in an inappropriate way.",
        "Gambling, financial, health or other regulated promotions without the required licences and disclosures.",
        "Content that infringes someone else's copyright, trademark, privacy or image rights.",
      ]],
      ["Influencer and creator content", ["Paid partnerships must be clearly labelled as advertising, in line with the rules where the audience is (for example the ASA and CAP Code in the UK, the FTC Endorsement Guides in the US and ASCI guidelines in India)."]],
      ["What we do", ["We may decline or stop work that breaks this policy and remove Connect members who repeatedly do."]],
    ],
  },
  {
    slug: "accessibility", title: "Accessibility Statement", version: VERSION, updated: UPDATED,
    summary: "Our commitment to an accessible website and how to tell us about problems.",
    sections: [
      ["Our aim", ["We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA."]],
      ["What we have done", [
        "Pages work with a keyboard and screen readers, use real headings and descriptive link text, and respect your device's reduced-motion setting.",
        "Text has strong contrast on our dark theme, and images that carry meaning have text alternatives.",
      ]],
      ["Known issues", ["Some older portfolio images and embedded videos from other platforms may not have full text alternatives or captions yet. We are working through them."]],
      ["Tell us about a problem", [`If something is hard to use, email ${EMAILS.support} or call ${PHONES.london}. Tell us the page and the problem, and we will reply within 5 working days.`]],
    ],
  },
  {
    slug: "modern-slavery", title: "Modern Slavery Statement", version: VERSION, updated: UPDATED,
    summary: "Our approach to preventing modern slavery and human trafficking in our business and supply chain.",
    sections: [
      ["Our position", ["Amphin does not tolerate slavery, servitude, forced or compulsory labour or human trafficking in our business or supply chain. We publish this statement voluntarily."]],
      ["Our business", ["We are a marketing and creative agency with teams in the UK and India. Our main suppliers are software providers, freelancers, photographers, videographers and print partners."]],
      ["What we do", [
        "We pay fair wages, keep written employment contracts and do not hold staff documents.",
        "We work with reputable suppliers and ask freelancers and production partners to confirm they meet these standards.",
        `Anyone can raise a concern confidentially at ${EMAILS.support}. We will investigate and act on it.`,
      ]],
    ],
  },
  {
    slug: "trademark", title: "Trademark Notice", version: VERSION, updated: UPDATED,
    summary: `${COMPANY.trademark} name and logo.`,
    sections: [
      ["Our marks", [`${COMPANY.trademark} and the Amphin logo are registered trademarks of Amphin. Please do not use them in a way that suggests we endorse or are connected with a product or service without our written permission.`]],
      ["Other marks", ["Client names, product names and logos shown on this site belong to their owners and are shown to describe work we have done for them."]],
      ["Reporting misuse", [`To report misuse of our marks, email ${EMAILS.hello}.`]],
    ],
  },
  {
    slug: "company-information", title: "Company Information", version: VERSION, updated: UPDATED,
    summary: "Registered details of the Amphin companies.",
    sections: [
      ["United Kingdom", [`${COMPANY.ukEntity}. ${COMPANY.ukRegistration}. Company number ${COMPANY.ukCompanyNumber}.`, `Office: ${UK_OFFICE}.`, `Phone: ${PHONES.london}.`]],
      ["India", [`${COMPANY.indiaEntity}. ${COMPANY.indiaRegistration}.`, `Office: ${IN_OFFICE}.`, `Phone: ${PHONES.india}.`]],
      ["Contact", [`General enquiries: ${EMAILS.hello}. Clients and privacy requests: ${EMAILS.support}. Partnerships and press: ${EMAILS.marketing}.`]],
    ],
  },
  {
    slug: "grievance-redressal", title: "Grievance Redressal (India)", version: VERSION, updated: UPDATED,
    summary: "How to raise a complaint about this website or your personal data under Indian law.",
    sections: [
      ["Grievance Officer", [
        `Grievance Officer, ${COMPANY.indiaEntity} (India), ${IN_OFFICE}.`,
        `Email: ${EMAILS.support} (subject: "Grievance"). Phone: ${PHONES.india}. Monday to Friday, 10:00 to 18:00 IST.`,
      ]],
      ["What you can raise", ["Complaints about content on this website, how we handle your personal data, or how we have responded to a request about your data."]],
      ["How we respond", ["We acknowledge grievances within 24 hours and aim to resolve them within 15 days, or sooner where the law requires."]],
      ["Escalation", ["If you are not satisfied with our response, you may escalate a personal data complaint to the Data Protection Board of India once it is available for your complaint."]],
    ],
  },
  {
    slug: "careers-privacy", title: "Careers Privacy Notice", version: VERSION, updated: UPDATED,
    summary: "How we handle the personal data of people who apply to work with us.",
    sections: [
      ["What we collect", ["Your contact details, CV, portfolio, work history, the role you applied for, interview notes and, if you receive an offer, the checks needed to employ you legally."]],
      ["How we use it", ["Only to assess you for the role you applied for, and for similar roles if you agree. HR and the hiring manager can see your application in our HR system."]],
      ["How long we keep it", ["Up to 12 months after the role is filled, then we delete it, unless you ask us to keep it for future roles. If you join us, your application becomes part of your employee record."]],
      ["Your rights", [`You can ask to see, correct or delete your application at any time by emailing ${EMAILS.support}. See our Privacy Policy for your full rights.`]],
    ],
  },
];

export const getLegal = (slug: string) => LEGAL.find((l) => l.slug === slug);
