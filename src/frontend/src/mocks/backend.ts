import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  addOrder: async (_config, _totalPrice) => ({
    __kind__: "ok",
    ok: "order-001",
  }),
  getOrders: async () => [
    {
      id: "order-001",
      createdAt: BigInt(1712000000000),
      config: {
        base: "Intense Dark (55%)",
        infusion: "Sea Salt",
        crunch: "Whole Roasted Almonds",
        core: "Jammy Black Raisin",
        finish: "Gold Dusting",
      },
      totalPrice: BigInt(120),
    },
  ],
  getProducts: async () => [
    {
      id: "product-001",
      name: "The Joy of One",
      description: "A single geometric dark chocolate heart with whole roasted almonds and premium seeds.",
      price: BigInt(80),
    },
    {
      id: "product-002",
      name: "The Heart Collection of Four",
      description: "A curated sleeve box of four handcrafted hearts — a gift worthy of the occasion.",
      price: BigInt(299),
    },
    {
      id: "product-003",
      name: "The Signature Twelve",
      description: "Our luxury rigid box of twelve hearts. The pinnacle of artisanal chocolate gifting.",
      price: BigInt(899),
    },
  ],
};
