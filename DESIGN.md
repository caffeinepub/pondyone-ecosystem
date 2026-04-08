# Design Brief: PondyOne Hyper-Local Marketplace

## Purpose & Context
Three-tier hyper-local marketplace for Puducherry/Chennai: User (browse/book), Owner (manage listings), Admin (control center). Mobile-first with role-based routing.

## Visual Direction
Bold, trustworthy, discovery-focused. Deep saffron primary signals marketplace energy. Clean card grid emphasizes browsing. Category colors enable instant recognition.

## Tone & Differentiation
Dynamic hyper-local energy. Category-color-coded cards in results, emoji badges, strong bottom nav affordance, modal overlays for order alerts (owner app).

## Color Palette (Light / Dark)

| Token | Light OKLCH | Dark OKLCH | Usage |
|-------|------------|-----------|-------|
| Primary | 0.6 0.18 45 | 0.68 0.18 45 | Deep saffron — buttons, nav, alerts |
| Background | 0.99 0 0 | 0.11 0 0 | Page background |
| Foreground | 0.16 0 0 | 0.97 0 0 | Text |
| Card | 1.0 0 0 | 0.16 0 0 | Listings, forms |
| Muted | 0.93 0 0 | 0.2 0 0 | Disabled, secondary text |
| Border | 0.88 0 0 | 0.25 0 0 | Card edges, dividers |
| Success | 0.65 0.18 130 | 0.65 0.18 130 | Booking confirmed, active slots |
| Warning | 0.72 0.19 60 | 0.72 0.19 60 | Urgent alerts, order arrived |
| Destructive | 0.55 0.22 25 | 0.65 0.22 25 | Decline, cancel, delete |
| Sidebar | 0.145 0 0 | 0.13 0 0 | Admin sidebar (dark) |

## Typography
- **Display**: Bricolage Grotesque (bold, geometric, marketplace personality)
- **Body**: Figtree (warm, approachable, readable)
- **Mono**: JetBrains Mono (codes, order IDs, UPI refs)

## Structural Zones

| Zone | Treatment |
|------|-----------|
| Header | Card background with bottom border, fixed top |
| Nav (User/Owner) | Fixed bottom, card background, emoji + label, active indicator bold saffron |
| Nav (Admin) | Dark sidebar (0.145 OKLCH), primary accent on active items |
| Content Grid | Alternating bg-card (1.0 OKLCH light) and transparent for breathing room |
| Cards | shadow-card (0.08 opacity), border, rounded-md (8px) |
| Modals | shadow-elevated, overlay with 40% backdrop, pulse-alarm animation for order alerts |
| Footer | bg-muted/50 with border-t |

## Spacing & Rhythm
- **Gutters**: 16px base (mobile), 24px (tablet+)
- **Card padding**: 16px interior spacing
- **Gap**: 12px (list items), 16px (grid columns)
- **Dense**: 8px (compact controls, badges)

## Component Patterns
- **Buttons**: saffron primary, white text, shadow-card on hover, rounded-md
- **Cards**: white card with shadow, border 0.88 OKLCH, rounded-md
- **Search**: full-width hero input, white bg, border below
- **Category chips**: outlined style, emoji + label, saffron on active
- **Bottom nav**: fixed, equal-width tabs, emoji + 10px label, active = bg-primary + white text
- **Alerts/Modals**: center viewport, shadow-elevated, pulse-alarm for urgent (new orders)

## Motion & Animation
- **Transition default**: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Slide up**: entry animation for cards (slide-up 0.3s)
- **Pulse alarm**: looping 1.5s for order-alert modal, owner app
- **Fade**: status badge transitions (booking states)

## Constraints
- Mobile-first: stack vertically, 12px gutters (sm breakpoint)
- No dark mode override for light theme (light is primary)
- Admin sidebar always dark (0.145 OKLCH), never light
- All colors semantic tokens, no hex/rgb literals in components
- Category colors (Food/Stay/Play/Retail) assigned by backend, not hardcoded

## Signature Detail
Category-color badges on search results (e.g., orange pill for Food, blue for Stay) + emoji icon. Creates instant visual scanning advantage in marketplace context.
