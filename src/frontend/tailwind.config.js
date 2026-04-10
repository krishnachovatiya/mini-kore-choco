import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        /* Direct brand tokens for safe use */
        bone: "#FDFBF7",
        sage: "#7D8471",
        cocoa: "#2C1E1B",
        gold: "#D4AF37",
      },
      fontFamily: {
        display: ["Playfair Display", "var(--font-display)", "serif"],
        body: ["Inter", "var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(44,30,27,0.05)",
        subtle: "0 2px 8px 0 rgba(44,30,27,0.06)",
        elevated: "0 8px 32px 0 rgba(44,30,27,0.1)",
        gold: "0 4px 16px 0 rgba(212,175,55,0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "drift-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "drift-up-lg": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "breathing": {
          "0%, 100%": { transform: "scale(1.0)" },
          "50%": { transform: "scale(1.05)" },
        },
        "spin-y": {
          "0%": { transform: "perspective(800px) rotateY(0deg)" },
          "100%": { transform: "perspective(800px) rotateY(360deg)" },
        },
        "particle-drop": {
          "0%": { opacity: "1", transform: "translateY(-100px) scale(1)" },
          "70%": { opacity: "0.9", transform: "translateY(10px) scale(0.95)" },
          "100%": { opacity: "0.7", transform: "translateY(0px) scale(0.9)" },
        },
        "liquid-fill": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "drift-up": "drift-up 0.8s ease-out forwards",
        "drift-up-lg": "drift-up-lg 1s ease-out forwards",
        "drift-up-delay-1": "drift-up 0.8s 0.15s ease-out forwards",
        "drift-up-delay-2": "drift-up 0.8s 0.3s ease-out forwards",
        "drift-up-delay-3": "drift-up 0.8s 0.45s ease-out forwards",
        "breathing": "breathing 3s ease-in-out infinite",
        "spin-y": "spin-y 1.2s ease-in-out",
        "particle-drop": "particle-drop 1.2s ease-out forwards",
        "liquid-fill": "liquid-fill 0.4s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
        "float": "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
