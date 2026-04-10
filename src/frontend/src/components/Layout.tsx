import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

interface LayoutProps {
  children: React.ReactNode;
}

function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full font-semibold text-sm shadow-elevated"
      style={{ backgroundColor: "#25D366", color: "#fff" }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      aria-label="Order via WhatsApp"
      data-ocid="floating-whatsapp"
    >
      <SiWhatsapp size={20} />
      <span className="hidden sm:inline">Order Now</span>
    </motion.a>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#FDFBF7" }}
    >
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
