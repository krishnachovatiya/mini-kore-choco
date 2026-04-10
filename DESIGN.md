# mini Kore — Luxury Artisanal Chocolate Boutique

## Design Direction

**Aesthetic**: Quiet luxury — minimalist, spacious, high-end. Premium boutique aesthetic (luxury perfume / watch brand). No clutter, no trends, intentional precision.

**Tone**: Sophisticated, elegant, artisanal. Conveys handcrafted excellence and premium positioning.

## Color Palette

| Token | OKLCH | Hex | Usage |
|-------|-------|-----|-------|
| Background | 0.99 0 0 | #FDFBF7 | Primary canvas, soft bone white |
| Cocoa (Foreground) | 0.15 0.02 25 | #2C1E1B | Primary text, typography |
| Sage Green (Primary) | 0.55 0.08 142 | #7D8471 | Accent buttons, active states, navigation |
| Gold (Highlight) | 0.72 0.18 82 | #D4AF37 | Premium accent, hover states, flourishes |
| Muted | 0.95 0 0 | #F5F3F0 | Soft backgrounds, dividers |
| Border | 0.92 0.01 142 | #EAE8E1 | Subtle dividers, card edges |

## Typography

| Layer | Font | Family | Weight | Usage |
|-------|------|--------|--------|-------|
| Display | Fraunces | Serif | 400–900 | Headlines, hero text, luxury emphasis |
| Body | DM Sans | Sans | 400–700 | UI, body text, navigation, forms |
| Mono | System | Monospace | 400 | Code snippets, data |

**Type Scale**: H1 (3.75rem), H2 (2.25rem), H3 (1.5rem), Body (1rem), Small (0.875rem)

## Radius & Spacing

- **Corner Radius**: 24px (primary), 12px (interactive), 0 (sharp accents)
- **Spacing Scale**: 4px → 8px → 12px → 16px → 24px → 32px → 48px (multiples of 4)
- **Grid**: 12-column responsive (mobile-first)

## Structural Zones

| Zone | Background | Border | Elevation | Notes |
|------|-----------|--------|-----------|-------|
| Header (Sticky) | bg-background | border-border/30 | shadow-subtle | MK diamond logo, navigation, order CTA |
| Hero Split | bg-background | none | none | Left: text (Playfair), Right: chocolate heart image |
| Configurator | bg-card | border-border/20 | shadow-elevated | Fixed heart (left) + step drawer (right), mobile: stacked |
| Ingredient Scroll | bg-background | none | none | Horizontal scroll with icons, clean labels |
| Product Gallery | bg-background | none | shadow-sm | 3 card tiers with hover-lift, marble backdrop |
| Footer | bg-muted/20 | border-t border-border/20 | none | Centered social icons, small craft attribution |

## Motion Choreography

| Element | Animation | Duration | Trigger | Motion Library |
|---------|-----------|----------|---------|-----------------|
| Hero Text | Staggered drift-up | 0.8s each (200ms gap) | Page load | motion v12 (Framer Motion successor) |
| Heart Hero | Breathing scale | 3s infinite | Always active | scale(1.0 → 1.05) |
| Configurator Heart | 360° Y-axis spin | 1.2s | Base selection change | rotateY(0deg → 360deg) |
| Ingredient Icon | Particle drop | 1.2s | Selection click | translateY(-100px → +100px), fade-out |
| Scroll Parallax | Multi-layer drift | Variable | Window scroll | Background ingredients float at 0.3–0.7x speed |
| Button Hover | Liquid fill effect | 0.3s | Hover (Primary/Accent) | Sage green wave left-to-right |

## Component Patterns

- **Buttons**: `btn-liquid` utility — sage green background, rounded-full, shadow on hover, transition-smooth
- **Cards**: `bg-soft-card` utility — 24px radius, subtle border/shadow, hover: shadow-elevated
- **Hero Image**: 16:9 aspect ratio, soft natural lighting (window-lit aesthetic), high-definition
- **Interactive Elements**: Always motion-enabled via motion library; no jarring instant changes
- **Floating WhatsApp Button**: Fixed bottom-right on mobile, always accessible, jade green, shadow-elevated

## Constraints & Guardrails

- ✓ Only OKLCH colors (no hex literals, no generic blues)
- ✓ Motion library for all animations (no CSS-only)
- ✓ Playfair Display (serif) + DM Sans (sans) only — no system fonts
- ✓ Mobile-first responsive (sm/md/lg breakpoints)
- ✓ 24px default radius — no small, tight corners
- ✓ Generous white space — never crowd elements
- ✓ Soft shadows only (`shadow-subtle`, `shadow-elevated`) — no harsh drop-shadows
- ✓ Product photography must show artisanal craftsmanship (marble surfaces, natural lighting)

## Signature Detail

**Liquid Fill Button Hover**: On primary/accent buttons, sage green fills from left-to-right with smooth easing. Conveys premium interactivity without flashiness. Motion: 0.3s cubic-bezier(0.4, 0, 0.2, 1).

---

**Design by**: Tobias van Schneider–inspired quiet luxury discipline.
**Token System**: OKLCH with semantic naming (background, foreground, primary, accent, sage green, gold).
**Platform**: React + Tailwind CSS + motion v12 (Framer Motion successor).
**Deployment**: Internet Computer via Caffeine platform.
