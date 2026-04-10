import {
  BASE_OPTIONS,
  PREMIUM_CORES,
  PREMIUM_CRUNCHES,
  PREMIUM_FINISHES,
  PREMIUM_INFUSIONS,
  useConfigurator,
} from "@/hooks/use-configurator";
import { useAddOrder } from "@/hooks/use-orders";
import type {
  BaseOption,
  CoreOption,
  CrunchOption,
  FinishOption,
  InfusionOption,
} from "@/types";
import { AnimatePresence, motion, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChocolateHeart } from "./ChocolateHeart";

import { WHATSAPP_NUMBER as WHATSAPP_PHONE } from "@/lib/constants";

// Animated number counter
function AnimatedPrice({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 180, damping: 20 });
  const display = useTransform(spring, (v) => `₹${Math.round(v)}`);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

// Step option button with liquid fill effect
interface OptionBtnProps {
  label: string;
  description?: string;
  isPremium?: boolean;
  isSelected: boolean;
  onSelect: () => void;
  emoji?: string;
  colorSwatch?: string;
}

function OptionBtn({
  label,
  description,
  isPremium,
  isSelected,
  onSelect,
  emoji,
  colorSwatch,
}: OptionBtnProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-ocid={`option-${label.toLowerCase().replace(/\s+/g, "-")}`}
      className="w-full text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D8471]"
      style={{
        borderColor: isSelected ? "#7D8471" : "rgba(44,30,27,0.12)",
        backgroundColor: isSelected ? "rgba(125,132,113,0.08)" : "transparent",
      }}
    >
      {/* Liquid fill on hover — pure CSS approach */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: "rgba(125,132,113,0.05)" }}
      />
      <div className="relative z-10 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            {colorSwatch && (
              <span
                className="w-5 h-5 rounded-full flex-shrink-0 border-2"
                style={{
                  backgroundColor: colorSwatch,
                  borderColor: isSelected ? "#7D8471" : "rgba(44,30,27,0.2)",
                }}
              />
            )}
            {emoji && <span className="text-lg flex-shrink-0">{emoji}</span>}
            <span
              className="font-semibold text-sm tracking-wide truncate"
              style={{
                fontFamily: "var(--font-body)",
                color: isSelected ? "#7D8471" : "#2C1E1B",
              }}
            >
              {label}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isPremium && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "rgba(212,175,55,0.15)",
                  color: "#D4AF37",
                  fontFamily: "var(--font-body)",
                }}
              >
                +₹20
              </span>
            )}
            {isSelected && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                style={{ backgroundColor: "#7D8471" }}
              >
                ✓
              </motion.span>
            )}
          </div>
        </div>
        {description && (
          <p
            className="mt-1 text-xs leading-relaxed ml-0"
            style={{
              color: "#5a4a46",
              fontFamily: "var(--font-body)",
              paddingLeft: colorSwatch || emoji ? "28px" : "0",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </button>
  );
}

// Step card wrapper
function StepCard({
  number,
  title,
  subtitle,
  children,
  delay = 0,
}: {
  number: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-[24px] p-6"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(44,30,27,0.08)",
        boxShadow: "0 2px 16px rgba(44,30,27,0.04)",
      }}
    >
      <div className="mb-4">
        <div className="flex items-baseline gap-3 mb-1">
          <span
            className="text-xs font-bold tracking-[0.2em]"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(44,30,27,0.3)",
            }}
          >
            {number}
          </span>
          <h3
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-display)", color: "#2C1E1B" }}
          >
            {title}
          </h3>
        </div>
        <p
          className="text-xs ml-7"
          style={{ color: "#5a4a46", fontFamily: "var(--font-body)" }}
        >
          {subtitle}
        </p>
      </div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </motion.div>
  );
}

// Animated cost row for breakdown
function CostRow({ label, active }: { label: string; active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="flex justify-between items-center text-xs overflow-hidden"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(253,251,247,0.5)",
          }}
        >
          <span className="truncate mr-2">{label}</span>
          <span style={{ color: "#D4AF37", flexShrink: 0 }}>+₹20</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Base color swatches
const BASE_SWATCHES: Record<BaseOption, string> = {
  "Intense Dark (55%)": "#3D1C12",
  "Creamy Milk": "#7B4226",
  "Velvet White": "#F5E6D3",
};

const BASE_DESCRIPTIONS: Record<BaseOption, string> = {
  "Intense Dark (55%)": "Van Houten 55% dark — bold & complex",
  "Creamy Milk": "Silky milk chocolate — sweet & smooth",
  "Velvet White": "Buttery white — delicate & luxurious",
};

const INFUSION_DESCRIPTIONS: Record<InfusionOption, string> = {
  "Sea Salt": "Flaked Atlantic sea salt — sweet-savory contrast",
  "Madagascar Vanilla": "Pure Madagascar vanilla bean dust",
  "Spiced Cinnamon": "Warm Ceylon cinnamon — aromatic spice",
};

const CRUNCH_DESCRIPTIONS: Record<CrunchOption, string> = {
  "Whole Roasted Almonds": "Stovetop roasted whole almonds — signature crunch",
  "Toasted Melon Seeds": "Toasted magaj seeds — light & nutty",
  "Pumpkin Seeds": "Raw organic pumpkin seeds — earthy & crunchy",
};

const CRUNCH_EMOJI: Record<CrunchOption, string> = {
  "Whole Roasted Almonds": "🌰",
  "Toasted Melon Seeds": "🫘",
  "Pumpkin Seeds": "🌱",
};

const CORE_DESCRIPTIONS: Record<CoreOption, string> = {
  "Jammy Black Raisin": "Plump Kashmiri raisins — jammy hidden center",
  "Salted Caramel": "Handmade butter caramel with sea salt",
  "Honey-Roasted Nut Paste": "Slow-roasted mixed nuts in raw honey",
};

const FINISH_DESCRIPTIONS: Record<FinishOption, string> = {
  "White Chocolate Drizzle": "Fine white chocolate hand-drizzled",
  "Gold Dusting": "Food-grade 24K gold dust — pure artistry",
  "Rose Petals": "Crystallised rose petals — floral accent",
};

const FINISH_EMOJI: Record<FinishOption, string> = {
  "White Chocolate Drizzle": "🤍",
  "Gold Dusting": "✨",
  "Rose Petals": "🌸",
};

export function Configurator() {
  const {
    selectedBase,
    selectedInfusion,
    selectedCrunch,
    selectedCore,
    selectedFinish,
    totalPrice,
    setBase,
    setInfusion,
    setCrunch,
    setCore,
    setFinish,
    generateWhatsAppLink,
  } = useConfigurator();

  const addOrder = useAddOrder();
  const [isOrdering, setIsOrdering] = useState(false);

  async function handleOrder() {
    setIsOrdering(true);
    try {
      await addOrder.mutateAsync({
        config: {
          base: selectedBase,
          infusion: selectedInfusion ?? "None",
          crunch: selectedCrunch ?? "None",
          core: selectedCore ?? "None",
          finish: selectedFinish ?? "None",
        },
        totalPrice,
      });
    } catch {
      // Non-blocking — still open WhatsApp even if save fails
    }

    const waLink = generateWhatsAppLink(WHATSAPP_PHONE);
    window.open(waLink, "_blank", "noopener,noreferrer");

    toast.success("Your creation is on its way to WhatsApp! 🍫", {
      description: "Complete your order via WhatsApp chat.",
      duration: 5000,
    });
    setIsOrdering(false);
  }

  return (
    <section
      className="w-full py-16 px-4"
      style={{ backgroundColor: "#FDFBF7" }}
      data-ocid="configurator-section"
    >
      {/* Section label */}
      <div className="text-center mb-12 max-w-xl mx-auto">
        <p
          className="text-xs font-bold tracking-[0.25em] mb-3"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(44,30,27,0.35)",
          }}
        >
          BUILD YOUR OWN
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{ fontFamily: "var(--font-display)", color: "#2C1E1B" }}
        >
          Craft Your Creation
        </h2>
        <p
          className="text-base"
          style={{ color: "#5a4a46", fontFamily: "var(--font-body)" }}
        >
          Every heart is made to order. Five steps to pure indulgence.
        </p>
      </div>

      {/* Main two-column layout */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 relative">
        {/* HEART VISUALIZER */}
        {/* Mobile: sticky at top */}
        <div
          className="md:hidden sticky top-0 z-10 pt-2 pb-3"
          style={{ backgroundColor: "#FDFBF7" }}
        >
          <div
            className="relative rounded-[28px] overflow-hidden mx-auto"
            style={{
              height: "min(46vw, 260px)",
              minHeight: "180px",
              background:
                "linear-gradient(135deg, rgba(125,132,113,0.07) 0%, rgba(212,175,55,0.05) 100%)",
              border: "1px solid rgba(44,30,27,0.07)",
            }}
          >
            <ChocolateHeart
              base={selectedBase}
              infusion={selectedInfusion}
              crunch={selectedCrunch}
              core={selectedCore}
              finish={selectedFinish}
            />
          </div>
        </div>

        {/* Desktop: sticky left column */}
        <div className="hidden md:block w-[42%] flex-shrink-0 sticky top-[10vh] self-start">
          <div
            className="relative rounded-[32px] overflow-hidden"
            style={{
              aspectRatio: "4/5",
              maxHeight: "68vh",
              background:
                "linear-gradient(135deg, rgba(125,132,113,0.08) 0%, rgba(212,175,55,0.06) 100%)",
              border: "1px solid rgba(44,30,27,0.07)",
              boxShadow: "0 8px 40px rgba(44,30,27,0.07)",
            }}
          >
            <ChocolateHeart
              base={selectedBase}
              infusion={selectedInfusion}
              crunch={selectedCrunch}
              core={selectedCore}
              finish={selectedFinish}
            />
            {/* Base label */}
            <motion.div
              key={selectedBase}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-widest uppercase"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(44,30,27,0.4)",
                whiteSpace: "nowrap",
              }}
            >
              {selectedBase}
            </motion.div>
          </div>
        </div>

        {/* STEP DRAWER */}
        <div
          className="flex-1 flex flex-col gap-5"
          data-ocid="configurator-drawer"
        >
          {/* STEP 01 — BASE */}
          <StepCard
            number="01"
            title="The Base"
            subtitle="Choose your chocolate foundation"
            delay={0}
          >
            {BASE_OPTIONS.map((opt) => (
              <OptionBtn
                key={opt}
                label={opt}
                description={BASE_DESCRIPTIONS[opt]}
                colorSwatch={BASE_SWATCHES[opt]}
                isSelected={selectedBase === opt}
                onSelect={() => setBase(opt)}
              />
            ))}
          </StepCard>

          {/* STEP 02 — INFUSION */}
          <StepCard
            number="02"
            title="The Infusion"
            subtitle="A flavour note woven through the chocolate"
            delay={0.08}
          >
            <OptionBtn
              label="None"
              description="Let the chocolate shine on its own"
              isSelected={selectedInfusion === null}
              onSelect={() => setInfusion(null)}
            />
            {PREMIUM_INFUSIONS.map((opt) => (
              <OptionBtn
                key={opt}
                label={opt}
                description={INFUSION_DESCRIPTIONS[opt]}
                isPremium
                isSelected={selectedInfusion === opt}
                onSelect={() =>
                  setInfusion(selectedInfusion === opt ? null : opt)
                }
              />
            ))}
          </StepCard>

          {/* STEP 03 — CRUNCH */}
          <StepCard
            number="03"
            title="The Crunch"
            subtitle="The signature texture that defines mini Kore"
            delay={0.16}
          >
            <OptionBtn
              label="None"
              description="Pure, uninterrupted chocolate"
              isSelected={selectedCrunch === null}
              onSelect={() => setCrunch(null)}
            />
            {PREMIUM_CRUNCHES.map((opt) => (
              <OptionBtn
                key={opt}
                label={opt}
                description={CRUNCH_DESCRIPTIONS[opt]}
                isPremium
                emoji={CRUNCH_EMOJI[opt]}
                isSelected={selectedCrunch === opt}
                onSelect={() =>
                  setCrunch(
                    selectedCrunch === opt ? null : (opt as CrunchOption),
                  )
                }
              />
            ))}
          </StepCard>

          {/* STEP 04 — CORE */}
          <StepCard
            number="04"
            title="The Core"
            subtitle="A hidden surprise at the heart of every piece"
            delay={0.24}
          >
            <OptionBtn
              label="None"
              description="Solid through and through"
              isSelected={selectedCore === null}
              onSelect={() => setCore(null)}
            />
            {PREMIUM_CORES.map((opt) => (
              <OptionBtn
                key={opt}
                label={opt}
                description={CORE_DESCRIPTIONS[opt]}
                isPremium
                isSelected={selectedCore === opt}
                onSelect={() =>
                  setCore(selectedCore === opt ? null : (opt as CoreOption))
                }
              />
            ))}
          </StepCard>

          {/* STEP 05 — FINISH */}
          <StepCard
            number="05"
            title="The Final Touch"
            subtitle="The finishing flourish that makes it yours"
            delay={0.32}
          >
            <OptionBtn
              label="None"
              description="Clean, minimal — beautiful as is"
              isSelected={selectedFinish === null}
              onSelect={() => setFinish(null)}
            />
            {PREMIUM_FINISHES.map((opt) => (
              <OptionBtn
                key={opt}
                label={opt}
                description={FINISH_DESCRIPTIONS[opt]}
                isPremium
                emoji={FINISH_EMOJI[opt]}
                isSelected={selectedFinish === opt}
                onSelect={() =>
                  setFinish(
                    selectedFinish === opt ? null : (opt as FinishOption),
                  )
                }
              />
            ))}
          </StepCard>

          {/* PRICING + ORDER CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-[24px] p-6 sticky bottom-4 md:relative md:bottom-auto"
            style={{
              backgroundColor: "#2C1E1B",
              boxShadow: "0 8px 40px rgba(44,30,27,0.28)",
            }}
            data-ocid="order-pricing-card"
          >
            {/* Price breakdown */}
            <div className="mb-5 space-y-2">
              <div
                className="flex justify-between items-center text-xs"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(253,251,247,0.45)",
                }}
              >
                <span>Base chocolate</span>
                <span>₹80</span>
              </div>
              <CostRow
                label={selectedInfusion ?? ""}
                active={!!selectedInfusion}
              />
              <CostRow label={selectedCrunch ?? ""} active={!!selectedCrunch} />
              <CostRow label={selectedCore ?? ""} active={!!selectedCore} />
              <CostRow label={selectedFinish ?? ""} active={!!selectedFinish} />
              <div
                className="flex justify-between items-center pt-3 border-t"
                style={{ borderColor: "rgba(253,251,247,0.1)" }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(253,251,247,0.75)",
                  }}
                >
                  Total
                </span>
                <span
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#D4AF37",
                  }}
                >
                  <AnimatedPrice value={totalPrice} />
                </span>
              </div>
            </div>

            {/* Order button */}
            <button
              type="button"
              onClick={handleOrder}
              disabled={isOrdering}
              data-ocid="order-cta-btn"
              className="w-full py-4 rounded-2xl font-semibold text-sm tracking-wider transition-all duration-300 relative overflow-hidden group disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              style={{
                backgroundColor: "#D4AF37",
                color: "#2C1E1B",
                fontFamily: "var(--font-body)",
              }}
            >
              {/* Liquid fill on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: "rgba(44,30,27,0.12)" }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isOrdering ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      ◌
                    </motion.span>
                    Preparing your order…
                  </>
                ) : (
                  <>
                    <span>🍫</span>
                    Order this Creation
                  </>
                )}
              </span>
            </button>

            <p
              className="text-center mt-3 text-[10px]"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(253,251,247,0.3)",
              }}
            >
              Opens WhatsApp with your full configuration
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
