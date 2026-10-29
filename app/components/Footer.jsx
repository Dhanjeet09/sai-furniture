import { navigation, site, whatsappLink } from "../lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="wordmark">
          SAI <span>FURNITURE</span>
        </p>
        <p>
          Custom furniture, modular kitchens, wardrobes and interior woodwork,
          made for homes and workspaces in Bhopal.
        </p>
      </div>

      <div>
        <h2 className="footer-heading">Visit or call</h2>
        <div className="footer-links">
          <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          <span>
            {site.address.line1}, {site.address.area}
          </span>
          <span>
            {site.address.city}, {site.address.state} {site.address.pincode}
          </span>
          <span>Please call to arrange a visit.</span>
          <a
            href={whatsappLink(
              "Hello Sai Furniture, I would like to ask about my project."
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Message on WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div>
        <h2 className="footer-heading">Explore</h2>
        <nav className="footer-links" aria-label="Footer navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name} · {site.address.city}
        </span>
        <span>Design references are illustrative; finishes are confirmed in consultation.</span>
      </div>
    </footer>
  );
}
