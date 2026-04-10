import { WHATSAPP_NUMBER } from "@/lib/constants";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  description: string;
  image: string;
  tag: string;
  tagStyle?: React.CSSProperties;
}

const PRODUCTS: Product[] = [
  {
    id: "single",
    name: "The Joy of One",
    subtitle: "Single Heart",
    price: 80,
    description:
      "One perfect geometric heart. Stovetop roasted almonds sealed in Van Houten 55% dark chocolate. The ideal introduction.",
    image: "/assets/generated/chocolate-single.dim_600x600.jpg",
    tag: "Bestseller",
    tagStyle: { backgroundColor: "#2C1E1B", color: "#FDFBF7" },
  },
  {
    id: "sleeve",
    name: "The Heart Collection",
    subtitle: "Sleeve Box of Four",
    price: 299,
    description:
      "Four handcrafted hearts in an elegant sleeve. Each uniquely textured with whole seeds and premium fillings.",
    image: "/assets/generated/chocolate-sleeve.dim_600x600.jpg",
    tag: "Most Gifted",
    tagStyle: { backgroundColor: "#7D8471", color: "#FDFBF7" },
  },
  {
    id: "signature",
    name: "The Signature Twelve",
    subtitle: "Luxury Rigid Box",
    price: 899,
    description:
      "Our most celebrated collection — twelve geometric hearts in a rigid luxury box. Gold-dusted, gift-ready.",
    image: "/assets/generated/chocolate-signature.dim_600x600.jpg",
    tag: "Luxury",
    tagStyle: { backgroundColor: "#D4AF37", color: "#2C1E1B" },
  },
];

const buildWhatsAppUrl = (product: Product) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi! I'd like to order: ${product.name} (${product.subtitle}) — ₹${product.price}`,
  )}`;

export function ProductGallery() {
  return (
    <section
      id="collection"
      className="py-24 px-6 md:px-12"
      style={{ backgroundColor: "#FDFBF7" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="flex flex-col gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="font-body text-xs tracking-widest uppercase font-semibold"
            style={{ color: "#7D8471" }}
          >
            The Collection
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: "#2C1E1B" }}
          >
            Choose Your Indulgence
          </h2>
          <p
            className="font-body text-base max-w-sm"
            style={{ color: "rgba(44,30,27,0.55)" }}
          >
            Every box is handcrafted to order — never mass-produced.
          </p>
        </motion.div>

        {/* Product grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-ocid="product-grid"
        >
          {PRODUCTS.map((product, i) => (
            <motion.article
              key={product.id}
              className="group relative flex flex-col rounded-[24px] overflow-hidden cursor-default"
              style={{
                backgroundColor: "oklch(var(--card))",
                boxShadow: "0 2px 10px rgba(44,30,27,0.06)",
                border: "1px solid rgba(44,30,27,0.06)",
              }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.13,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 56px rgba(44,30,27,0.13)",
                transition: { duration: 0.3 },
              }}
              data-ocid={`product-card-${product.id}`}
            >
              {/* Tag badge */}
              <div
                className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                style={product.tagStyle}
              >
                {product.tag}
              </div>

              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "1 / 1" }}
              >
                <img
                  src={product.image}
                  alt={`${product.name} — ${product.subtitle}`}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle gradient overlay for text readability */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(44,30,27,0.15) 0%, transparent 50%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div>
                  <p
                    className="font-body text-xs tracking-widest uppercase font-medium"
                    style={{ color: "#7D8471" }}
                  >
                    {product.subtitle}
                  </p>
                  <h3
                    className="font-display text-xl font-bold mt-1"
                    style={{ color: "#2C1E1B" }}
                  >
                    {product.name}
                  </h3>
                </div>

                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "rgba(44,30,27,0.62)" }}
                >
                  {product.description}
                </p>

                {/* Price + CTA */}
                <div
                  className="flex items-center justify-between mt-auto pt-4"
                  style={{ borderTop: "1px solid rgba(44,30,27,0.08)" }}
                >
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="font-display text-2xl font-bold"
                      style={{ color: "#D4AF37" }}
                    >
                      ₹{product.price}
                    </span>
                    <span
                      className="font-body text-xs"
                      style={{ color: "rgba(44,30,27,0.38)" }}
                    >
                      per box
                    </span>
                  </div>

                  <a
                    href={buildWhatsAppUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-liquid text-sm flex items-center gap-2"
                    data-ocid={`product-order-${product.id}`}
                  >
                    <SiWhatsapp size={14} className="relative z-10" />
                    <span>Order</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Collection CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p
            className="font-body text-sm mb-5"
            style={{ color: "rgba(44,30,27,0.5)" }}
          >
            Want something bespoke? We do custom orders.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20custom%20order!`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-liquid text-sm inline-flex items-center gap-2"
            data-ocid="collection-custom-order"
          >
            <SiWhatsapp size={14} className="relative z-10" />
            <span>Enquire About Custom Orders</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
