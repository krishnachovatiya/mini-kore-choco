import type {
  BaseOption,
  ConfiguratorState,
  CoreOption,
  CrunchOption,
  FinishOption,
  InfusionOption,
} from "@/types";
import { create } from "zustand";

const BASE_PRICE = 80;
const PREMIUM_TOPPING_PRICE = 20;

const BASE_OPTIONS: BaseOption[] = [
  "Intense Dark (55%)",
  "Creamy Milk",
  "Velvet White",
];
const PREMIUM_INFUSIONS: InfusionOption[] = [
  "Sea Salt",
  "Madagascar Vanilla",
  "Spiced Cinnamon",
];
const PREMIUM_CRUNCHES: CrunchOption[] = [
  "Whole Roasted Almonds",
  "Toasted Melon Seeds",
  "Pumpkin Seeds",
];
const PREMIUM_CORES: CoreOption[] = [
  "Jammy Black Raisin",
  "Salted Caramel",
  "Honey-Roasted Nut Paste",
];
const PREMIUM_FINISHES: FinishOption[] = [
  "White Chocolate Drizzle",
  "Gold Dusting",
  "Rose Petals",
];

export {
  BASE_OPTIONS,
  PREMIUM_INFUSIONS,
  PREMIUM_CRUNCHES,
  PREMIUM_CORES,
  PREMIUM_FINISHES,
};

function calcPrice(
  infusion: InfusionOption | null,
  crunch: CrunchOption | null,
  core: CoreOption | null,
  finish: FinishOption | null,
): number {
  let price = BASE_PRICE;
  if (infusion) price += PREMIUM_TOPPING_PRICE;
  if (crunch) price += PREMIUM_TOPPING_PRICE;
  if (core) price += PREMIUM_TOPPING_PRICE;
  if (finish) price += PREMIUM_TOPPING_PRICE;
  return price;
}

interface ConfiguratorActions {
  setBase: (base: BaseOption) => void;
  setInfusion: (infusion: InfusionOption | null) => void;
  setCrunch: (crunch: CrunchOption | null) => void;
  setCore: (core: CoreOption | null) => void;
  setFinish: (finish: FinishOption | null) => void;
  setCurrentStep: (step: number) => void;
  resetConfig: () => void;
  generateWhatsAppLink: (phone: string) => string;
}

const initialState: ConfiguratorState = {
  selectedBase: "Intense Dark (55%)",
  selectedInfusion: null,
  selectedCrunch: null,
  selectedCore: null,
  selectedFinish: null,
  totalPrice: BASE_PRICE,
  currentStep: 1,
};

export const useConfigurator = create<ConfiguratorState & ConfiguratorActions>(
  (set, get) => ({
    ...initialState,

    setBase: (base) =>
      set((s) => ({
        selectedBase: base,
        totalPrice: calcPrice(
          s.selectedInfusion,
          s.selectedCrunch,
          s.selectedCore,
          s.selectedFinish,
        ),
      })),

    setInfusion: (infusion) =>
      set((s) => ({
        selectedInfusion: infusion,
        totalPrice: calcPrice(
          infusion,
          s.selectedCrunch,
          s.selectedCore,
          s.selectedFinish,
        ),
      })),

    setCrunch: (crunch) =>
      set((s) => ({
        selectedCrunch: crunch,
        totalPrice: calcPrice(
          s.selectedInfusion,
          crunch,
          s.selectedCore,
          s.selectedFinish,
        ),
      })),

    setCore: (core) =>
      set((s) => ({
        selectedCore: core,
        totalPrice: calcPrice(
          s.selectedInfusion,
          s.selectedCrunch,
          core,
          s.selectedFinish,
        ),
      })),

    setFinish: (finish) =>
      set((s) => ({
        selectedFinish: finish,
        totalPrice: calcPrice(
          s.selectedInfusion,
          s.selectedCrunch,
          s.selectedCore,
          finish,
        ),
      })),

    setCurrentStep: (step) => set({ currentStep: step }),

    resetConfig: () => set({ ...initialState }),

    generateWhatsAppLink: (phone: string) => {
      const state = get();
      const infusion = state.selectedInfusion ?? "None";
      const crunch = state.selectedCrunch ?? "None";
      const core = state.selectedCore ?? "None";
      const finish = state.selectedFinish ?? "None";
      const lines = [
        "🍫 *mini Kore Custom Order*",
        "",
        `🔹 Base: ${state.selectedBase}`,
        `🔹 Infusion: ${infusion}`,
        `🔹 Crunch: ${crunch}`,
        `🔹 Core: ${core}`,
        `🔹 Finish: ${finish}`,
        "",
        `💰 *Total: ₹${state.totalPrice}*`,
        "",
        "Handcrafted with love in Surat 🌿",
      ];
      const text = encodeURIComponent(lines.join("\n"));
      const cleanPhone = phone.replace(/\D/g, "");
      return `https://wa.me/${cleanPhone}?text=${text}`;
    },
  }),
);
