import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface ChocolateHeartProps {
  base: string;
  infusion: string | null;
  crunch: string | null;
  core: string | null;
  finish: string | null;
}

const BASE_COLORS: Record<string, string> = {
  "Intense Dark (55%)": "#3D1C12",
  "Creamy Milk": "#7B4226",
  "Velvet White": "#F5E6D3",
};

const BASE_SHADOW: Record<string, string> = {
  "Intense Dark (55%)": "rgba(61,28,18,0.5)",
  "Creamy Milk": "rgba(123,66,38,0.45)",
  "Velvet White": "rgba(200,170,140,0.4)",
};

const BASE_HIGHLIGHT: Record<string, string> = {
  "Intense Dark (55%)": "#6B3322",
  "Creamy Milk": "#A85E36",
  "Velvet White": "#FDF3E7",
};

const INFUSION_LABELS: Record<string, { label: string; color: string }> = {
  "Sea Salt": { label: "✦ Sea Salt", color: "#8FACC2" },
  "Madagascar Vanilla": { label: "✦ Vanilla", color: "#C4A96B" },
  "Spiced Cinnamon": { label: "✦ Cinnamon", color: "#C47A3A" },
};

const CRUNCH_ICONS: Record<string, string> = {
  "Whole Roasted Almonds": "🌰",
  "Toasted Melon Seeds": "🫘",
  "Pumpkin Seeds": "🌱",
};

interface Particle {
  id: number;
  x: number;
  delay: number;
}

export function ChocolateHeart({
  base,
  infusion,
  crunch,
  core: _core,
  finish,
}: ChocolateHeartProps) {
  const controls = useAnimationControls();
  const prevBase = useRef<string>(base);
  const prevCrunch = useRef<string | null>(crunch);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleCounter = useRef(0);

  // Trigger 360° Y-axis spin on base change
  useEffect(() => {
    if (prevBase.current !== base) {
      prevBase.current = base;
      controls.start({
        rotateY: [0, 180, 360],
        transition: { duration: 1.1, ease: "easeInOut" },
      });
    }
  }, [base, controls]);

  // Trigger particle drop on crunch change
  useEffect(() => {
    if (prevCrunch.current !== crunch && crunch !== null) {
      prevCrunch.current = crunch;
      const count = 5;
      const newParticles: Particle[] = Array.from(
        { length: count },
        (_, i) => ({
          id: particleCounter.current++,
          x: 20 + Math.random() * 60,
          delay: i * 0.15,
        }),
      );
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 2500);
    } else if (crunch === null) {
      prevCrunch.current = null;
    }
  }, [crunch]);

  const fillColor = BASE_COLORS[base] ?? BASE_COLORS["Intense Dark (55%)"];
  const shadowColor = BASE_SHADOW[base] ?? "rgba(61,28,18,0.5)";
  const highlightColor = BASE_HIGHLIGHT[base] ?? "#6B3322";
  const isWhiteBase = base === "Velvet White";
  const textColor = isWhiteBase ? "#2C1E1B" : "#FDFBF7";

  const showWhiteDrizzle = finish === "White Chocolate Drizzle";
  const showGoldDust = finish === "Gold Dusting";
  const showRosePetals = finish === "Rose Petals";
  const infusionMeta = infusion ? INFUSION_LABELS[infusion] : null;
  const crunchIcon = crunch ? CRUNCH_ICONS[crunch] : null;

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Ambient glow background */}
      <div
        className="absolute inset-0 rounded-[32px] opacity-20 blur-3xl"
        style={{ backgroundColor: fillColor }}
      />

      {/* Main heart container with breathing + spin */}
      <motion.div
        className="relative"
        animate={controls}
        style={{ transformPerspective: 800 }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          className="relative"
        >
          {/* SVG Heart */}
          <svg
            viewBox="0 0 200 185"
            width="260"
            height="242"
            className="drop-shadow-2xl"
            style={{ filter: `drop-shadow(0 12px 32px ${shadowColor})` }}
          >
            <title>mini Kore chocolate heart — {base}</title>
            <defs>
              <linearGradient
                id="heartGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={highlightColor} />
                <stop offset="50%" stopColor={fillColor} />
                <stop offset="100%" stopColor={fillColor} stopOpacity="0.85" />
              </linearGradient>
              <linearGradient
                id="heartGradDark"
                x1="30%"
                y1="0%"
                x2="70%"
                y2="100%"
              >
                <stop offset="0%" stopColor={fillColor} stopOpacity="0.7" />
                <stop
                  offset="100%"
                  stopColor={isWhiteBase ? "#D4C0AA" : "#1A0A06"}
                />
              </linearGradient>
              <filter id="innerShadow">
                <feOffset dx="0" dy="4" />
                <feGaussianBlur stdDeviation="4" result="offset-blur" />
                <feComposite
                  operator="out"
                  in="SourceGraphic"
                  in2="offset-blur"
                  result="inverse"
                />
                <feFlood floodColor="#000" floodOpacity="0.2" result="color" />
                <feComposite
                  operator="in"
                  in="color"
                  in2="inverse"
                  result="shadow"
                />
                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
              </filter>
              {/* Gold dust pattern */}
              {showGoldDust && (
                <pattern
                  id="goldDots"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="3" cy="3" r="1.2" fill="#D4AF37" opacity="0.8" />
                  <circle
                    cx="13"
                    cy="11"
                    r="0.8"
                    fill="#D4AF37"
                    opacity="0.6"
                  />
                  <circle cx="8" cy="17" r="1" fill="#EAC74B" opacity="0.7" />
                </pattern>
              )}
            </defs>

            {/* Geometric heart path */}
            <path
              d="M100 170 C100 170 12 115 12 62 C12 35 30 15 55 15 C70 15 85 24 100 38 C115 24 130 15 145 15 C170 15 188 35 188 62 C188 115 100 170 100 170Z"
              fill="url(#heartGrad)"
              filter="url(#innerShadow)"
            />

            {/* Geometric facet lines — luxury feel */}
            <path
              d="M100 38 L100 170"
              stroke={
                isWhiteBase ? "rgba(200,170,130,0.3)" : "rgba(255,255,255,0.07)"
              }
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M55 15 L100 90 L145 15"
              stroke={
                isWhiteBase
                  ? "rgba(200,170,130,0.25)"
                  : "rgba(255,255,255,0.06)"
              }
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M12 62 L100 90 L188 62"
              stroke={
                isWhiteBase ? "rgba(200,170,130,0.2)" : "rgba(255,255,255,0.05)"
              }
              strokeWidth="1"
              fill="none"
            />

            {/* Shine highlight */}
            <ellipse
              cx="70"
              cy="48"
              rx="18"
              ry="10"
              fill="white"
              opacity={isWhiteBase ? "0.25" : "0.12"}
              transform="rotate(-25 70 48)"
            />

            {/* White Drizzle overlay */}
            {showWhiteDrizzle && (
              <g opacity="0.9">
                <path
                  d="M55 55 Q65 45 75 60 Q85 75 95 58 Q105 42 115 62 Q125 80 135 55"
                  stroke="white"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <path
                  d="M48 80 Q58 68 70 82 Q82 96 94 78 Q106 62 118 80 Q128 95 140 78"
                  stroke="white"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <path
                  d="M65 108 Q75 96 87 110 Q99 124 111 106 Q121 90 133 108"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </g>
            )}

            {/* Gold Dusting overlay */}
            {showGoldDust && (
              <path
                d="M100 170 C100 170 12 115 12 62 C12 35 30 15 55 15 C70 15 85 24 100 38 C115 24 130 15 145 15 C170 15 188 35 188 62 C188 115 100 170 100 170Z"
                fill="url(#goldDots)"
                opacity="0.7"
              />
            )}

            {/* Rose Petal overlay */}
            {showRosePetals && (
              <g>
                <ellipse
                  cx="75"
                  cy="60"
                  rx="7"
                  ry="4"
                  fill="#E8A5B4"
                  opacity="0.8"
                  transform="rotate(-30 75 60)"
                />
                <ellipse
                  cx="110"
                  cy="75"
                  rx="6"
                  ry="3.5"
                  fill="#D4849A"
                  opacity="0.7"
                  transform="rotate(15 110 75)"
                />
                <ellipse
                  cx="90"
                  cy="100"
                  rx="5"
                  ry="3"
                  fill="#E8A5B4"
                  opacity="0.75"
                  transform="rotate(-10 90 100)"
                />
                <ellipse
                  cx="125"
                  cy="55"
                  rx="4.5"
                  ry="2.5"
                  fill="#C96B84"
                  opacity="0.65"
                  transform="rotate(40 125 55)"
                />
              </g>
            )}

            {/* Crunch icons scattered on heart */}
            {crunchIcon && (
              <g>
                <text
                  x="68"
                  y="72"
                  fontSize="14"
                  textAnchor="middle"
                  opacity="0.9"
                >
                  {crunchIcon}
                </text>
                <text
                  x="116"
                  y="68"
                  fontSize="12"
                  textAnchor="middle"
                  opacity="0.85"
                >
                  {crunchIcon}
                </text>
                <text
                  x="90"
                  y="110"
                  fontSize="10"
                  textAnchor="middle"
                  opacity="0.8"
                >
                  {crunchIcon}
                </text>
              </g>
            )}
          </svg>

          {/* Infusion badge */}
          <AnimatePresence>
            {infusionMeta && (
              <motion.div
                key={infusion}
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider"
                style={{
                  backgroundColor: infusionMeta.color,
                  color: textColor,
                  boxShadow: `0 2px 10px ${infusionMeta.color}60`,
                  fontFamily: "var(--font-body)",
                  whiteSpace: "nowrap",
                }}
              >
                {infusionMeta.label}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gold dust sparkle label */}
          <AnimatePresence>
            {showGoldDust && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute -top-3 right-2 text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "#D4AF37",
                  color: "#2C1E1B",
                  fontFamily: "var(--font-body)",
                }}
              >
                ✨ Gold Dust
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Falling particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute text-xl pointer-events-none"
            style={{ left: `${p.x}%`, top: 0, zIndex: 20 }}
            initial={{ y: -30, opacity: 1, scale: 0.8 }}
            animate={{ y: 160, opacity: [1, 1, 0], scale: [0.8, 1.1, 0.6] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, delay: p.delay, ease: "easeIn" }}
          >
            {crunchIcon ?? "🌰"}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
