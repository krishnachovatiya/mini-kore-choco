import { WHATSAPP_BASE_URL } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_URL = WHATSAPP_BASE_URL;

const NAV_LINKS = [
  { label: "The Collection", href: "#collection" },
  { label: "Our Story", href: "#story" },
];

function MKLogo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      {/* Diamond shape */}
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
        fill="rgba(212,175,55,0.05)"
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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transition:
          "background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease",
        backgroundColor: scrolled ? "rgba(253,251,247,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(44,30,27,0.07)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(44,30,27,0.05)" : "none",
      }}
      data-ocid="header-nav"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#hero")}
          className="flex items-center gap-2.5 group bg-transparent border-0 cursor-pointer p-0"
          aria-label="mini Kore home"
          data-ocid="header-logo"
        >
          <MKLogo />
          <span
            className="font-display font-bold text-xl tracking-wide"
            style={{
              color: "#2C1E1B",
              transition: "color 0.3s ease",
            }}
          >
            mini Kore
          </span>
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-10"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="font-body text-sm font-medium relative group"
              style={{ color: "#2C1E1B" }}
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full"
                style={{
                  backgroundColor: "#7D8471",
                  transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-liquid text-sm flex items-center gap-2"
            data-ocid="header-whatsapp-cta"
          >
            <SiWhatsapp size={15} className="relative z-10" />
            <span>Order via WhatsApp</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-xl"
          style={{
            color: "#2C1E1B",
            transition: "opacity 0.2s",
          }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          data-ocid="mobile-menu-toggle"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mobileOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: "rgba(253,251,247,0.98)",
              borderBottom: "1px solid rgba(44,30,27,0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-body text-base font-medium py-1"
                  style={{ color: "#2C1E1B" }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid text-sm text-center mt-2 flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                data-ocid="mobile-whatsapp-cta"
              >
                <SiWhatsapp size={15} className="relative z-10" />
                <span>Order via WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
