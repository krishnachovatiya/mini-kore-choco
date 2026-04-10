import { Configurator } from "@/components/Configurator";
import { Hero } from "@/components/Hero";
import { IngredientStory } from "@/components/IngredientStory";
import { ProductGallery } from "@/components/ProductGallery";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <Hero />

      {/* INGREDIENT STORY */}
      <IngredientStory />

      {/* PRODUCT COLLECTION */}
      <ProductGallery />

      {/* CONFIGURATOR */}
      <section
        id="configurator"
        style={{
          backgroundColor: "rgba(44,30,27,0.025)",
          borderTop: "1px solid rgba(44,30,27,0.06)",
        }}
      >
        <Configurator />
      </section>

      {/* OUR STORY */}
      <section
        id="about"
        className="py-24 px-6 md:px-12"
        style={{ backgroundColor: "#FDFBF7" }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="font-body text-xs tracking-widest uppercase font-semibold"
              style={{ color: "#7D8471" }}
            >
              Our Story
            </p>
            <h2
              className="font-display text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "#2C1E1B" }}
            >
              Obsessed with the Texture.
            </h2>
            <p
              className="font-body text-base leading-loose"
              style={{ color: "rgba(44,30,27,0.7)" }}
            >
              mini Kore was born in a Surat kitchen from one obsession — the
              satisfying snap of a geometric chocolate heart revealing a core of
              whole roasted almonds. Every single piece is made in small
              batches, using only Van Houten 55% Belgian cacao, stovetop roasted
              nuts, and zero preservatives.
            </p>
            <p
              className="font-body text-base leading-loose"
              style={{ color: "rgba(44,30,27,0.7)" }}
            >
              We don't outsource. We don't cut corners. We simply believe that a
              ₹80 chocolate heart should feel like a ₹800 experience.
            </p>
            <div
              className="flex flex-col gap-3 pt-4"
              style={{ borderTop: "1px solid rgba(44,30,27,0.08)" }}
            >
              {[
                ["100%", "Natural Ingredients"],
                ["500+", "Hearts Made Weekly"],
                ["3", "Years of Craft"],
              ].map(([num, label]) => (
                <div key={label} className="flex items-center gap-4">
                  <span
                    className="font-display text-2xl font-bold"
                    style={{ color: "#D4AF37" }}
                  >
                    {num}
                  </span>
                  <span
                    className="font-body text-sm"
                    style={{ color: "rgba(44,30,27,0.65)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div
                className="absolute -inset-8 rounded-[48px]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)",
                }}
              />
              <img
                src="/assets/generated/chocolate-hero.dim_900x900.jpg"
                alt="mini Kore artisan chocolate — geometric heart on marble surface"
                className="relative rounded-[32px] object-cover w-full max-w-xs md:max-w-sm"
                style={{ boxShadow: "0 24px 64px rgba(44,30,27,0.15)" }}
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
