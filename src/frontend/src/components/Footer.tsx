import { WHATSAPP_NUMBER } from "@/lib/constants";
import { motion } from "motion/react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";

function MKLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <polygon
        points="18,3 33,13 28,31 8,31 3,13"
        stroke="#7D8471"
        strokeWidth="1.5"
        fill="none"
      />
      <polygon
        points="18,8 28,16 24,28 12,28 8,16"
        stroke="#D4AF37"
        strokeWidth="0.5"
        fill="rgba(212,175,55,0.06)"
      />
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fontFamily="Playfair Display, serif"
        fontWeight="700"
        fontSize="10"
        fill="#2C1E1B"
        letterSpacing="-0.5"
      >
        MK
      </text>
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    id: "instagram",
    label: "Instagram",
    icon: <SiInstagram size={20} />,
    href: "https://instagram.com",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: <SiWhatsapp size={20} />,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
];

const NAV_LINKS = [
  { label: "The Collection", href: "#collection" },
  { label: "Our Story", href: "#story" },
  { label: "Build Your Own", href: "#configurator" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "minikore";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="pt-20 pb-10 px-6 md:px-12"
      style={{
        backgroundColor: "rgba(44,30,27,0.04)",
        borderTop: "2px solid transparent",
        backgroundImage: `
          linear-gradient(rgba(44,30,27,0.04), rgba(44,30,27,0.04)),
          linear-gradient(90deg, #7D8471, #D4AF37, #7D8471)
        `,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
      data-ocid="footer"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-14">
          {/* Brand */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <MKLogo />
              <span
                className="font-display text-2xl font-bold tracking-wide"
                style={{ color: "#2C1E1B" }}
              >
                mini Kore
              </span>
            </div>
            <p
              className="font-body text-sm max-w-xs leading-relaxed"
              style={{ color: "rgba(44,30,27,0.5)" }}
            >
              Artisanal luxury chocolate boutique.
              <br />
              Handcrafted in small batches in Surat, India.
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            className="flex flex-col md:flex-row gap-4 md:gap-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            aria-label="Footer navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-body text-sm font-medium relative group"
                style={{ color: "rgba(44,30,27,0.6)" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full"
                  style={{
                    backgroundColor: "#7D8471",
                    transition: "width 0.3s ease",
                  }}
                />
              </a>
            ))}
          </motion.nav>

          {/* Social links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full transition-smooth"
                style={{
                  backgroundColor: "rgba(125,132,113,0.1)",
                  color: "#7D8471",
                  border: "1px solid rgba(125,132,113,0.2)",
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(125,132,113,0.18)",
                }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
                data-ocid={`footer-${social.id}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider with gold dot */}
        <div className="relative flex items-center mb-8">
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: "rgba(44,30,27,0.08)" }}
          />
          <div
            className="mx-4 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#D4AF37" }}
          />
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: "rgba(44,30,27,0.08)" }}
          />
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p
            className="font-display text-sm italic"
            style={{ color: "rgba(44,30,27,0.45)" }}
          >
            Proudly Handcrafted in Surat.
          </p>

          <p
            className="font-body text-xs"
            style={{ color: "rgba(44,30,27,0.35)" }}
          >
            © {year} mini Kore. All rights reserved. &nbsp;|&nbsp;{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-smooth hover:opacity-70"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
