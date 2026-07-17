---
version: alpha
name: Celso Neto Personal Website
description: >-
  A sparse personal site and writing space built around editorial restraint,
  lightweight typography, and a single high-contrast accent band that shifts
  between magenta and violet across light and dark color schemes.
colors:
  primary: "#BB2649"
  primary-dark: "#5F4B8B"
  on-primary: "#FFFFFF"
  background: "#FFFFFF"
  background-dark: "#030712"
  surface: "#FFFFFF"
  surface-dark: "#030712"
  on-background: "#000000"
  on-background-dark: "#FFFFFF"
  on-surface: "#000000"
  on-surface-dark: "#FFFFFF"
  visited-link: "#5F4B8B"
  visited-link-dark: "#B3ADCC"
  border-subtle: "#D1D5DB"
  border-subtle-dark: "#4B5563"
  blockquote-border: "#D1D5DB"
  blockquote-border-dark: "#4B5563"
  note-text: "#4B5563"
  note-text-dark: "#9CA3AF"
  table-stripe: "#E5E7EB"
  table-stripe-dark: "#1F2937"
  code-surface: "#1F2937"
  code-text: "#E5E7EB"
typography:
  display:
    fontFamily: Source Sans Pro
    fontSize: 3rem
    fontWeight: 200
    lineHeight: 1.1
    letterSpacing: -0.01em
  heading-lg:
    fontFamily: Source Sans Pro
    fontSize: 2.25rem
    fontWeight: 200
    lineHeight: 1.15
    letterSpacing: -0.01em
  heading-md:
    fontFamily: Source Sans Pro
    fontSize: 1.875rem
    fontWeight: 200
    lineHeight: 1.2
  heading-sm:
    fontFamily: Source Sans Pro
    fontSize: 1.5rem
    fontWeight: 200
    lineHeight: 1.25
  title:
    fontFamily: Source Sans Pro
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.3
  body-lg:
    fontFamily: Source Sans Pro
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Source Sans Pro
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Source Sans Pro
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.4
  label-section:
    fontFamily: Source Sans Pro
    fontSize: 1.5rem
    fontWeight: 200
    lineHeight: 1.2
    letterSpacing: 0.14em
  label-nav:
    fontFamily: Source Sans Pro
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0.08em
rounded:
  none: 0px
  sm: 0.5rem
spacing:
  xxs: 0.25rem
  xs: 0.5rem
  sm: 0.75rem
  md: 1rem
  lg: 1.25rem
  xl: 2rem
  header-padding: 0.75rem
  content-padding: 1rem
  section-gap: 2rem
  prose-gap: 1rem
  blockquote-padding-x: 1rem
  blockquote-padding-y: 0.5rem
  container-max-width: 80rem
elevation:
  flat: 0px
  emphasis-rule: 1px
motion:
  none: 0ms
  instant: 150ms
  standard-easing: ease
shadows:
  none: none
components:
  app-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-background}"
    typography: "{typography.body-md}"
    padding: "{spacing.content-padding}"
  app-shell-dark:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.on-background-dark}"
    typography: "{typography.body-md}"
    padding: "{spacing.content-padding}"
  site-band:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    height: 5rem
    padding: "{spacing.header-padding}"
  site-band-dark:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.on-primary}"
    height: 5rem
    padding: "{spacing.header-padding}"
  section-heading:
    textColor: "{colors.on-surface}"
    typography: "{typography.label-section}"
  body-copy:
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  body-copy-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-surface-dark}"
    typography: "{typography.body-md}"
  lead-copy:
    textColor: "{colors.on-surface}"
    typography: "{typography.body-lg}"
  visited-link:
    textColor: "{colors.visited-link}"
    typography: "{typography.body-md}"
  visited-link-dark:
    textColor: "{colors.visited-link-dark}"
    typography: "{typography.body-md}"
  post-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    width: 18rem
  post-cover:
    rounded: "{rounded.none}"
    height: 9rem
    width: 18rem
  prose-blockquote:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    padding: "{spacing.blockquote-padding-y} {spacing.blockquote-padding-x}"
  prose-blockquote-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-surface-dark}"
    padding: "{spacing.blockquote-padding-y} {spacing.blockquote-padding-x}"
  prose-blockquote-rule:
    backgroundColor: "{colors.blockquote-border}"
    width: 1px
  prose-blockquote-rule-dark:
    backgroundColor: "{colors.blockquote-border-dark}"
    width: 1px
  prose-table:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
  prose-table-row-odd:
    backgroundColor: "{colors.table-stripe}"
    textColor: "{colors.on-surface}"
  prose-table-row-odd-dark:
    backgroundColor: "{colors.table-stripe-dark}"
    textColor: "{colors.on-surface-dark}"
  prose-note:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.note-text}"
    padding: "{spacing.prose-gap}"
  prose-note-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.note-text-dark}"
    padding: "{spacing.prose-gap}"
  rule-subtle:
    backgroundColor: "{colors.border-subtle}"
    height: 1px
  rule-subtle-dark:
    backgroundColor: "{colors.border-subtle-dark}"
    height: 1px
  code-block:
    backgroundColor: "{colors.code-surface}"
    textColor: "{colors.code-text}"
    rounded: "{rounded.sm}"
---

## Overview

This interface is intentionally understated. It feels closer to a lightweight personal publication than a branded product: a clean white reading surface, black text, and one saturated accent bar that frames the page at the top and bottom.

The visual identity comes from restraint rather than ornament. There are no decorative panels, gradients, or heavy card treatments. Most content sits directly on the page, which makes the typography, spacing rhythm, and accent color do nearly all of the expressive work.

The dark color scheme is not a separate brand. It is the same design translated into a dimmed reading environment: the page background drops to near-black, text flips to white, and the accent band shifts from vivid magenta to muted violet.

## Colors

The palette is extremely compact.

- **Accent bands:** The header and footer are the only consistently saturated surfaces. In light mode they use a strong magenta red. In dark mode they shift to a subdued violet, softening the page while preserving recognizability.
- **Page surface:** Main content is plain white in light mode and near-black in dark mode. Large uninterrupted fields of background are part of the aesthetic.
- **Text:** Body text stays fully black on light surfaces and fully white on dark surfaces. This keeps the site bluntly readable and avoids the softer gray-on-off-white editorial trend.
- **Secondary states:** Visited links are the main secondary chromatic signal. They introduce violet into the otherwise monochrome reading experience.
- **Utility neutrals:** Light and dark grays appear only in article furniture such as blockquotes, note separators, and striped tables.

Color should stay sparse. If a new element does not need to be in the accent family, it should probably remain neutral.

## Typography

The entire site relies on **Source Sans Pro**, which reinforces the plainspoken editorial character.

- **Headings:** Many headings use an unusually light weight. This gives the site a quiet, airy tone and prevents the simple layout from feeling heavy.
- **Body copy:** Paragraphs remain conventional, readable, and unembellished. The typography does not try to feel luxurious or highly designed; it aims to feel direct and human.
- **Section labels:** Uppercase section titles with wide tracking provide the strongest typographic styling outside the header band. They act as subtle wayfinding rather than dramatic headlines.
- **Resume content:** The resume page keeps the same type family but tightens the hierarchy into practical document styling with larger names, underlined section titles, and dense but readable information blocks.

Avoid introducing a second typeface unless the entire identity is being reconsidered.

## Layout

The layout is simple, centered, and content-first.

- **Shell:** The page uses a three-row application shell: header, content, footer.
- **Content area:** Main content is padded lightly and otherwise allowed to breathe. On article and resume pages, a centered container keeps line lengths controlled without feeling boxed in.
- **Sections:** Home page content is stacked as discrete sections separated by generous vertical gaps rather than borders or background panels.
- **Cards:** Post summaries on the home page are only loosely card-like. They are fixed-width content columns with an image on top, not enclosed tiles.
- **Responsiveness:** Mobile and desktop share the same visual language. Desktop mainly increases text size, cover image height, and the padding of the colored site bands.

This system should continue to prefer flow layout, wrapping, and spacing over complex grid choreography.

## Elevation & Depth

There is effectively no conventional elevation system.

- Most surfaces are flat.
- Separation is created with whitespace, text hierarchy, underlines, and occasional rules.
- Article-specific elements such as blockquotes and tables use borders and stripe fills rather than shadow.
- Syntax-highlighted code blocks are the main exception, using a dark filled surface and slight corner rounding to establish a contained reading region.

If new depth is introduced, it should be very subtle. Heavy shadow would feel out of character.

## Shapes

The shape language is almost entirely square.

- Images, content blocks, and main layout containers read as rectangular by default.
- Rounded corners only appear where utility styles provide them, most visibly on code blocks.
- Underlines are more important than radii for signaling interaction.

Prefer sharp edges and structural clarity over softness.

## Components

### Site Header And Footer

The top and bottom bands are the clearest branded elements. They should feel bold in color but simple in construction: solid fill, white text, no gradients, no decorative borders, and no layered treatments.

### Home Sections

Section titles are uppercase, loosely tracked, and lightweight. The content beneath them should feel informal and hand-arranged rather than rigidly templated.

### Post Summaries

Home page post summaries combine a cover image, title, summary, and tag line in a narrow vertical stack. They should remain visually light, without card borders, fills, or shadow. The image supplies most of the visual variety.

### Prose Content

Long-form writing should preserve default document behaviors: visible link underlines, clear heading steps, relaxed paragraph leading, and straightforward lists. Supporting elements such as blockquotes, tables, and notes can be styled, but only enough to improve scanability.

### Resume View

The resume is still part of the same system, but it leans into document pragmatism. Information density is higher, headings are clearer, and print behavior matters. It should feel like a well-formatted CV that happens to live inside the same site shell.

## Do's and Don'ts

- **Do** preserve the minimal editorial tone.
- **Do** use the accent family sparingly, mainly for the page bands and visited-link feedback.
- **Do** keep headings light in weight unless a denser document view requires stronger emphasis.
- **Do** let whitespace and simple type hierarchy organize the page.
- **Don't** add decorative backgrounds, glass effects, gradients, or elaborate card chrome.
- **Don't** replace underlines with ambiguous low-contrast interaction cues.
- **Don't** introduce heavy shadows or plush rounded corners.
- **Don't** make the interface feel like a marketing site; it should still read as a personal publication and working notebook.
