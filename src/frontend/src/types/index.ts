export type BaseOption = "Intense Dark (55%)" | "Creamy Milk" | "Velvet White";
export type InfusionOption =
  | "Sea Salt"
  | "Madagascar Vanilla"
  | "Spiced Cinnamon";
export type CrunchOption =
  | "Whole Roasted Almonds"
  | "Toasted Melon Seeds"
  | "Pumpkin Seeds";
export type CoreOption =
  | "Jammy Black Raisin"
  | "Salted Caramel"
  | "Honey-Roasted Nut Paste";
export type FinishOption =
  | "White Chocolate Drizzle"
  | "Gold Dusting"
  | "Rose Petals";

export interface OrderConfig {
  base: string;
  infusion: string;
  crunch: string;
  core: string;
  finish: string;
}

export interface Order {
  id: string;
  config: OrderConfig;
  totalPrice: bigint;
  createdAt: bigint;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: bigint;
}

export interface ConfiguratorState {
  selectedBase: BaseOption;
  selectedInfusion: InfusionOption | null;
  selectedCrunch: CrunchOption | null;
  selectedCore: CoreOption | null;
  selectedFinish: FinishOption | null;
  totalPrice: number;
  currentStep: number;
}

export type ConfiguratorStep = 1 | 2 | 3 | 4 | 5;

export interface StepOption {
  value: string;
  label: string;
  description: string;
  emoji?: string;
  isPremium?: boolean;
}

export interface ProductCard {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  description: string;
  image: string;
}
