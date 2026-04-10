import { ChevronDown, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const BADGES = ["Zero Preservatives", "Stovetop Roasted", "Surat Made"];

// Floating ingredient shapes — cocoa beans, almond silhouettes
function CocoaBean({ style }: { style: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 40 56"
      fill="none"
      aria-hidden="true"
      style={style}
      className="absolute pointer-events-none select-none"
    >
      <ellipse cx="20" cy="28" rx="14" ry="22" fill="rgba(44,30,27,0.07)" />
      <ellipse cx="20" cy="28" rx="8" ry="14" fill="rgba(44,30,27,0.05)" />
      <line
        x1="20"
        y1="6"
        x2="20"
        y2="50"
        stroke="rgba(44,30,27,0.06)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function AlmondShape({ style }: { style: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 36 52"
      fill="none"
      aria-hidden="true"
      style={style}
      className="absolute pointer-events-none select-none"
    >
      <path
        d="M18 2 C28 2 34 14 34 26 C34 40 28 50 18 50 C8 50 2 40 2 26 C2 14 8 2 18 2Z"
        fill="rgba(212,175,55,0.08)"
        stroke="rgba(212,175,55,0.12)"
        strokeWidth="1"
      />
    </svg>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers at different speeds
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bean1Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bean2Y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const almond1Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const makeTextTransition = (delay: number) => ({
    duration: 0.9,
    delay,
    ease: "easeOut" as const,
  });

  const handleScrollDown = () => {
    document
      .querySelector("#collection")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#FDFBF7", position: "relative" }}
    >
      {/* Floating ingredients — parallax background */}
      <motion.div
        style={{ y: bean1Y }}
        className="absolute top-1/4 left-[5%] w-10 h-14 opacity-60"
      >
        <CocoaBean
          style={{ width: "100%", height: "100%", position: "static" }}
        />
      </motion.div>
      <motion.div
        style={{ y: bean2Y }}
        className="absolute top-1/3 left-[12%] w-7 h-10 opacity-40"
      >
        <CocoaBean
          style={{
            width: "100%",
            height: "100%",
            position: "static",
            transform: "rotate(25deg)",
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: almond1Y }}
        className="absolute top-[20%] left-[8%] w-8 h-12 opacity-50"
      >
        <AlmondShape
          style={{
            width: "100%",
            height: "100%",
            position: "static",
            transform: "rotate(-15deg)",
          }}
        />
      </motion.div>
      <motion.div
        style={{ y: bean1Y }}
        className="absolute bottom-[25%] left-[3%] w-6 h-9 opacity-30"
      >
        <CocoaBean
          style={{
            width: "100%",
            height: "100%",
            position: "static",
            transform: "rotate(40deg)",
          }}
        />
      </motion.div>

      {/* Main content grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center py-24 md:py-20">
        {/* LEFT — Copy */}
        <motion.div
          className="flex flex-col gap-7 order-2 md:order-1"
          style={{ y: textY }}
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={makeTextTransition(0)}
            className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              backgroundColor: "rgba(125,132,113,0.1)",
              color: "#7D8471",
              border: "1px solid rgba(125,132,113,0.22)",
            }}
          >
            <Sparkles size={11} />
            1st-in-Market Textures
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={makeTextTransition(0.12)}
              className="font-display font-bold leading-tight tracking-tight"
              style={{
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
                color: "#2C1E1B",
                lineHeight: 1.1,
              }}
            >
              The Art of the
              <br />
              <span style={{ color: "#7D8471" }}>Perfect Snap.</span>
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={makeTextTransition(0.28)}
            className="font-body text-lg leading-relaxed max-w-md"
            style={{ color: "rgba(44,30,27,0.68)" }}
          >
            Handcrafted geometric hearts loaded with whole roasted almonds and
            premium seeds. Experience addictive textures you won't find anywhere
            else.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={makeTextTransition(0.42)}
            className="flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#configurator")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-liquid text-sm"
              data-ocid="hero-build-cta"
            >
              <span>Build Your Own</span>
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#collection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-outline-liquid text-sm"
              data-ocid="hero-explore-cta"
            >
              <span>Explore the Collection</span>
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={makeTextTransition(0.55)}
            className="flex flex-wrap gap-5 pt-1"
          >
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="font-body text-xs font-medium"
                style={{ color: "rgba(44,30,27,0.42)" }}
              >
                ✦ {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — Chocolate heart */}
        <motion.div
          className="order-1 md:order-2 flex justify-center"
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            {/* Glow blob */}
            <div
              className="absolute inset-0 rounded-[40px] blur-3xl"
              style={{
                backgroundColor: "rgba(212,175,55,0.12)",
                transform: "scale(0.9) translateY(8%)",
              }}
            />

            {/* Breathing animation on the image wrapper */}
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <img
                src="/assets/generated/chocolate-hero.dim_900x900.jpg"
                alt="mini Kore geometric heart chocolate, cut open to reveal whole roasted almonds and pumpkin seeds"
                className="relative rounded-[32px] object-cover w-full max-w-sm md:max-w-md lg:max-w-lg"
                style={{
                  boxShadow:
                    "0 32px 80px rgba(44,30,27,0.18), 0 8px 24px rgba(44,30,27,0.08)",
                }}
              />
            </motion.div>

            {/* Price badge */}
            <motion.div
              className="absolute -bottom-4 -right-2 md:bottom-8 md:-right-6 px-4 py-2.5 rounded-2xl"
              style={{
                backgroundColor: "#FDFBF7",
                boxShadow: "0 4px 20px rgba(44,30,27,0.13)",
                border: "1px solid rgba(212,175,55,0.25)",
              }}
              initial={{ opacity: 0, scale: 0.75, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 1.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p
                className="font-display text-xs font-bold"
                style={{ color: "#D4AF37" }}
              >
                From ₹80
              </p>
              <p
                className="font-body text-xs"
                style={{ color: "rgba(44,30,27,0.48)" }}
              >
                per heart
              </p>
            </motion.div>

            {/* Handcrafted badge */}
            <motion.div
              className="absolute -top-3 -left-2 md:top-6 md:-left-8 px-3 py-2 rounded-2xl"
              style={{
                backgroundColor: "#2C1E1B",
                boxShadow: "0 4px 16px rgba(44,30,27,0.2)",
              }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <p
                className="font-body text-xs font-semibold"
                style={{ color: "#FDFBF7" }}
              >
                ✦ Handcrafted
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-0"
        style={{ opacity: heroOpacity as unknown as number }}
        onClick={handleScrollDown}
        aria-label="Scroll down"
        data-ocid="hero-scroll-indicator"
      >
        <span
          className="font-body text-xs tracking-widest uppercase"
          style={{ color: "rgba(44,30,27,0.32)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={16} style={{ color: "rgba(44,30,27,0.32)" }} />
        </motion.div>
      </motion.button>
    </section>
  );
}
