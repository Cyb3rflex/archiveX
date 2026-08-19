---
name: ArchiveX
colors:
  surface: "#ecfcff"
  surface-dim: "#c6dfe2"
  surface-bright: "#ecfcff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#dff8fc"
  surface-container: "#daf2f6"
  surface-container-high: "#d4edf1"
  surface-container-highest: "#cee7eb"
  on-surface: "#071f22"
  on-surface-variant: "#43474e"
  inverse-surface: "#1d3437"
  inverse-on-surface: "#dcf5f9"
  outline: "#73777f"
  outline-variant: "#c3c7cf"
  surface-tint: "#406184"
  primary: "#00162b"
  on-primary: "#ffffff"
  primary-container: "#002b4c"
  on-primary-container: "#7393ba"
  inverse-primary: "#a8c9f2"
  secondary: "#3a6475"
  on-secondary: "#ffffff"
  secondary-container: "#bee9fd"
  on-secondary-container: "#406a7b"
  tertiary: "#290c00"
  on-tertiary: "#ffffff"
  tertiary-container: "#4a1b00"
  on-tertiary-container: "#cc7c52"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#d1e4ff"
  primary-fixed-dim: "#a8c9f2"
  on-primary-fixed: "#001d35"
  on-primary-fixed-variant: "#27496b"
  secondary-fixed: "#bee9fd"
  secondary-fixed-dim: "#a2cde0"
  on-secondary-fixed: "#001f29"
  on-secondary-fixed-variant: "#204c5c"
  tertiary-fixed: "#ffdbcb"
  tertiary-fixed-dim: "#ffb691"
  on-tertiary-fixed: "#341100"
  on-tertiary-fixed-variant: "#733511"
  background: "#ecfcff"
  on-background: "#071f22"
  surface-variant: "#cee7eb"
typography:
  display:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: "700"
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
    letterSpacing: 0.05em
  display-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: "700"
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 40px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 80px
---

## Brand & Style

The design system is anchored in the principles of academic rigor and organizational precision. It targets students, educators, and administrators who require a platform that prioritizes information density without sacrificing clarity.

The aesthetic is **Modern Corporate**, leaning heavily into high-contrast layouts and generous whitespace to facilitate long-form reading and data management. It avoids trendy visual effects like glassmorphism or heavy gradients in favor of a "Type-First" philosophy. Every interface element must feel intentional, reliable, and grounded, evoking the atmosphere of a digital library or a high-end research institution.

## Colors

The palette is built on a foundation of "Deep Navy" to establish immediate authority and trust.

- **Primary (#002B4C):** Reserved for core branding, primary actions, and structural navigation headers.
- **Accent (#F59E71):** A muted orange used sparingly for call-to-actions, notifications, or highlighting specific search results within a list.
- **Secondary Tones:** A range of blues (#C0EBFF, #50E8F4, #C7F8FE) are used for "Soft" UI states—backgrounds for selected items, category tags, and subtle information alerts.
- **Neutral/Obsidian (#001619):** Used primarily for high-contrast typography and deep-dark backgrounds in admin sidebars to create a clear visual separation between workspace and content.

## Typography

This design system utilizes **Inter** for its exceptional legibility in data-heavy environments.

- **Hierarchy:** We utilize a strict scale. Display and H1 styles are reserved for landing pages and major section headers. H2 and H3 drive the structure of document previews and dashboard modules.
- **Technical Specs:** Headlines use slightly tighter letter spacing to maintain a cohesive look at larger sizes. Labels are capitalized and tracked out to provide a distinct visual "stamp" for metadata.
- **Responsiveness:** For mobile devices, Display and H1 sizes scale down significantly to ensure headers do not push primary content off-screen.

## Layout & Spacing

The design system employs a **Fixed Grid** model for desktop to ensure scholarly content remains readable and doesn't stretch excessively on ultrawide monitors.

- **Grid:** A 12-column system with 24px gutters.
- **Admin Layout:** Uses a permanent 280px left-hand sidebar. The main content area utilizes a fluid sub-grid for data tables.
- **Public Layout:** Centered 1280px container for browsing resources.
- **Rhythm:** Spacing follows an 8px baseline. Use 16px for internal component padding and 40px+ for separating distinct content blocks.

## Elevation & Depth

This design system avoids traditional shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface Levels:** The base background is white (#FFFFFF). Secondary surfaces like sidebars or secondary card sections use the Pale Cyan (#C7F8FE) at 20-30% opacity.
- **Borders:** Instead of shadows, use 1px borders in #E5E7EB (Light Grey) for cards and inputs.
- **Active Elevation:** When an element is hovered (like a Resource Card), apply a very soft, high-diffusion shadow (0px 4px 20px rgba(0, 43, 76, 0.08)) to indicate interactivity without breaking the flat academic aesthetic.

## Shapes

The shape language is **Soft and Precise**.

- **Standard Corners:** Buttons, input fields, and cards use a 0.25rem (4px) radius. This maintains a professional, "architectural" feel.
- **Large Elements:** Upload zones and large containers may use 0.5rem (8px) to soften the layout slightly.
- **Badges:** Status indicators use a 100px "Pill" radius to distinguish them clearly from interactive buttons.

## Components

- **Buttons:**
  - _Primary:_ Deep Navy (#002B4C) with White text.
  - _Secondary:_ Pale Cyan (#C7F8FE) with Primary text.
  - _Ghost:_ No fill, Primary text, 1px border.
- **Search Fields:** Large search bars on the home page should feature a Primary color icon and 16px internal padding. Standard search fields in the Admin header should be subtle with a 1px border.
- **Cards:** Course and Resource cards use a white background, 1px border, and a "Top-Bar" accent color indicating the category or level.
- **Tables:** Minimalist design. No vertical dividers. Use a 1px horizontal rule between rows. The header row should have a Soft Blue (#C0EBFF) background at 10% opacity.
- **Upload Zones:** Dotted border using Primary color at 40% opacity. Background should be the Pale Cyan (#C7F8FE) to denote a "drop zone."
- **PDF Viewer:** Dark Obsidian (#001619) backdrop for the viewer container to focus attention entirely on the document. Tools should be housed in a top-floating bar with a 4px corner radius.
- **Badges:** Use small, uppercase Label-font. Colors should correspond to status (e.g., #F59E71 for "Pending," #50E8F4 for "Active").
