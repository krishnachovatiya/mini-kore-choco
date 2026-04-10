import { motion } from "motion/react";

interface IngredientCard {
  icon: React.ReactNode;
  label: string;
  desc: string;
  badge: string;
}

function FlameIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      width="44"
      height="44"
      aria-hidden="true"
    >
      <path
        d="M24 42C33.941 42 42 33.941 42 24C42 16 36 10 30 8C30 14 26 18 22 20C22 16 20 12 16 10C14 16 12 20 12 26C12 34.837 17.163 40 24 40"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="24"
        cy="30"
        r="5"
        fill="rgba(212,175,55,0.18)"
        stroke="#D4AF37"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CacaoIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      width="44"
      height="44"
      aria-hidden="true"
    >
      <ellipse
        cx="24"
        cy="24"
        rx="10"
        ry="16"
        stroke="#D4AF37"
        strokeWidth="2"
        fill="rgba(212,175,55,0.08)"
      />
      <path
        d="M24 8 Q28 16 24 24 Q20 32 24 40"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 18 Q18 22 24 24 Q30 26 34 30"
        stroke="rgba(212,175,55,0.5)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M14 30 Q18 26 24 24 Q30 22 34 18"
        stroke="rgba(212,175,55,0.5)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      width="44"
      height="44"
      aria-hidden="true"
    >
      <path
        d="M24 40 C24 40 8 32 8 18 C8 10 16 6 24 8 C32 6 40 10 40 18 C40 32 24 40 24 40Z"
        fill="rgba(125,132,113,0.12)"
        stroke="#7D8471"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M24 8 L24 40"
        stroke="#7D8471"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M24 22 L16 16"
        stroke="rgba(125,132,113,0.5)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M24 28 L32 22"
        stroke="rgba(125,132,113,0.5)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CraftIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      width="44"
      height="44"
      aria-hidden="true"
    >
      <path
        d="M12 20 C12 14 18 10 24 10 C30 10 36 14 36 20"
        stroke="#D4AF37"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10 24 L14 20 L20 24 L24 20 L28 24 L34 20 L38 24"
        stroke="#7D8471"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect
        x="16"
        y="30"
        width="16"
        height="8"
        rx="3"
        fill="rgba(212,175,55,0.1)"
        stroke="#D4AF37"
        strokeWidth="1.5"
      />
      <path
        d="M20 30 L20 38 M24 30 L24 38 M28 30 L28 38"
        stroke="rgba(212,175,55,0.4)"
        strokeWidth="1"
      />
    </svg>
  );
}

const CARDS: IngredientCard[] = [
  {
    icon: <FlameIcon />,
    label: "Stovetop Roasted",
    desc: "Every batch fired to order on an open flame — never factory-processed.",
    badge: "01",
  },
  {
    icon: <CacaoIcon />,
    label: "Van Houten 55%",
    desc: "Belgian-origin dark cacao with complex depth and a clean snap.",
    badge: "02",
  },
  {
    icon: <LeafIcon />,
    label: "Zero Preservatives",
    desc: "Pure ingredients only. No fillers, no artificial additives, ever.",
    badge: "03",
  },
  {
    icon: <CraftIcon />,
    label: "Small Batch Craft",
    desc: "Handmade in Surat in small batches — every heart shaped by hand.",
    badge: "04",
  },
];

export function IngredientStory() {
  return (
    <section
      id="story"
      className="py-24 px-6 md:px-12 overflow-hidden"
      style={{
        backgroundColor: "rgba(44,30,27,0.025)",
        borderTop: "1px solid rgba(44,30,27,0.07)",
        borderBottom: "1px solid rgba(44,30,27,0.07)",
      }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-14">
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="font-body text-xs tracking-widest uppercase font-semibold"
            style={{ color: "#7D8471" }}
          >
            Our Ingredients
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: "#2C1E1B" }}
          >
            The Craft Behind the Snap
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll cards */}
      <div className="max-w-7xl mx-auto" data-ocid="ingredient-scroll">
        {/* Desktop: 4-col grid | Mobile: horizontal scroll */}
        <div
          className="flex gap-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              className="flex-shrink-0 flex flex-col gap-5 p-7 rounded-[24px]"
              style={{
                width: "clamp(260px, 28vw, 320px)",
                backgroundColor: "#FDFBF7",
                border: "1px solid rgba(125,132,113,0.2)",
                boxShadow: "0 2px 12px rgba(44,30,27,0.05)",
              }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              data-ocid={`ingredient-card-${i + 1}`}
            >
              {/* Number badge */}
              <div className="flex items-start justify-between">
                <div
                  className="p-2.5 rounded-2xl"
                  style={{ backgroundColor: "rgba(212,175,55,0.08)" }}
                >
                  {card.icon}
                </div>
                <span
                  className="font-display text-4xl font-bold leading-none"
                  style={{ color: "rgba(212,175,55,0.22)" }}
                >
                  {card.badge}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <h3
                  className="font-display text-xl font-bold"
                  style={{ color: "#2C1E1B" }}
                >
                  {card.label}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "rgba(44,30,27,0.62)" }}
                >
                  {card.desc}
                </p>
              </div>

              {/* Accent line */}
              <div
                className="h-px w-12 mt-auto"
                style={{ backgroundColor: "#7D8471" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
