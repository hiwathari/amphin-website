import { COMPANY, EMAILS, PHONES, mainPhone, salesPhone, WHATSAPP } from "@/lib/site";
import type { RegionCode } from "@/lib/regions";
import { AmosLogo } from "./Logo";

const tel = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;

export default function AmosFooter({ base, region }: { base: string; region: RegionCode }) {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="am-foot">
        <div className="am-wrap am-foot-main">
          <div>
            <AmosLogo href="#overview" />
            <p>AmOS is the operating system built by Amphin, a growth marketing and creative agency in London, Kochi and Abu Dhabi.</p>
            <p><a href={base}>← Back to the Amphin website</a></p>
          </div>
          <div>
            <h5>Contacts</h5>
            <a className="big" href={tel(salesPhone(region))}>{salesPhone(region)}</a>
            <ul>
              <li>Main line <a href={tel(mainPhone(region))}>{mainPhone(region)}</a></li>
              <li><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">WhatsApp {PHONES.london}</a></li>
              <li><a href={`mailto:${EMAILS.hello}`}>{EMAILS.hello}</a></li>
            </ul>
          </div>
          <div>
            <h5>AmOS</h5>
            <ul>
              <li><a href="#editions">Editions</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#timeline">Timeline</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#demo">Book a demo</a></li>
            </ul>
          </div>
          <div>
            <h5>Amphin</h5>
            <ul>
              <li><a href={base}>Website</a></li>
              <li><a href={`${base}/about`}>About</a></li>
              <li><a href={`${base}/work`}>Work</a></li>
              <li><a href={`${base}/careers`}>Careers</a></li>
              <li><a href={`${base}/contact`}>Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="am-legalbar">
          <span>© {year} {COMPANY.ukEntity}. AmOS is a product of {COMPANY.trademark}. {COMPANY.ukRegistration}, company no. {COMPANY.ukCompanyNumber}.</span>
          <nav aria-label="Legal">
            <a href={`${base}/legal/terms-of-use`}>Terms of use</a>
            <a href={`${base}/legal/privacy-policy`}>Privacy</a>
            <a href={`${base}/legal/cookie-policy`}>Cookies</a>
            <a href={`${base}/legal`}>All policies</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
