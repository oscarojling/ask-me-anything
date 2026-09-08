---
name: Ask Oscar Anything
description: A quiet, journal-toned AI chat that lets recruiters ask a real person's questions and get honest answers.
colors:
  forest-deep:
    value: "#12211d"
  cream-paper:
    value: "#f2ede1"
  card-forest:
    value: "#17281f"
  gold-leaf:
    value: "#b8823f"
  moss-secondary:
    value: "#1e2f26"
  moss-muted:
    value: "#1c2b23"
  sage-muted-text:
    value: "#8fa39a"
  hairline-border:
    value: "#2a3a31"
  field-input:
    value: "#23342b"
  rust-destructive:
    value: "#b8493f"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "Work Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.6
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.875rem"
components:
  button-primary:
    backgroundColor: "{colors.gold-leaf}"
    textColor: "{colors.forest-deep}"
    rounded: "{rounded.lg}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.sage-muted-text}"
    rounded: "{rounded.lg}"
  button-ghost-hover:
    textColor: "{colors.cream-paper}"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.cream-paper}"
    rounded: "{rounded.lg}"
---

# Design System: Ask Oscar Anything

## Overview

**Creative North Star: "The Field Journal"**

This is a naturalist's field notebook, not a SaaS chat widget: deep forest green stands in for a well-worn cover, warm gold leaf marks the parts worth noticing, and cream text sits on the page like ink. The whole interface is built around a single conceit — a visitor's question renders as a quoted, hand-annotated line in the margin (large italic serif, a real curly quotation mark in gold), and Oscar's answer reads back as plain typed text underneath. There is no bubble, no card, no shadow anywhere in the product; the page is genuinely flat, and the only structure comes from thin 1px gold or hairline-green rules, used the way a journal uses a ruled line rather than a box.

The palette and type pairing (serif display italics against a clean geometric sans body) both do real work: the serif quote marks the *question* as something personal and human-authored, while the sans-serif answer reads as considered, typed, deliberate. Nothing here should ever read as a typical AI-chat product — no rounded bubble columns, no avatar icons, no card elevation, no bright SaaS blue.

**Key Characteristics:**
- Flat by default — zero shadows, zero card backgrounds, anywhere in the product
- One accent color (gold), used sparingly and only with intent
- Serif italics exclusively mark the visitor's own words; the assistant's voice is always the plain sans body
- Structure comes from thin hairline rules, never boxes or borders-as-containers
- Generous negative space; the page breathes like a printed page, not a dense app shell

## Colors

A near-monochrome dark palette (forest green family) with a single warm accent; no secondary or tertiary hue exists yet, and none should be added without a documented reason.

### Primary
- **Gold Leaf** (`#b8823f`): the one accent color in the entire system. Used for the header's underline rule, the visitor-quote mark, focus rings, and any primary action. **The One Accent Rule.** Gold appears in small, precise strokes only — a 1px rule, a glyph, a ring — never as a fill covering more than a button.

### Neutral
- **Forest Deep** (`#12211d`): the page background — the "cover" of the journal.
- **Card Forest** (`#17281f`): reserved for popover/sidebar surfaces if ever needed; not currently used for message content, which stays on the bare page background.
- **Moss Secondary** (`#1e2f26`) / **Moss Muted** (`#1c2b23`): low-emphasis surface fills, used sparingly.
- **Cream Paper** (`#f2ede1`): all body text — the "ink" color.
- **Sage Muted Text** (`#8fa39a`): secondary/muted text (placeholders, the portfolio link at rest, timestamps).
- **Hairline Border** (`#2a3a31`): the only border color in the system — used exclusively as a 1px rule, never as a box outline around content.
- **Field Input** (`#23342b`): input/textarea fill, barely distinguishable from the page — inputs should feel like part of the page, not a separate control.

### Named Rules
**The Flat Ledger Rule.** No `box-shadow` appears anywhere in this product. Depth and grouping come only from color contrast and hairline rules (`#2a3a31`), never elevation.

## Typography

**Display Font:** Fraunces (serif, italic used deliberately)
**Body Font:** Work Sans (sans-serif)

**Character:** Fraunces italic is reserved for two things only — the page title and a visitor's own question, both marked as "written by a person." Work Sans carries everything else: it's the typed, considered voice of the assistant and all interface chrome.

### Hierarchy
- **Display** (Fraunces, `text-3xl`, italic where quoting): the page title ("Ask Oscar Anything") and the oversized opening quotation mark that precedes every visitor message.
- **Question quote** (Fraunces italic, `text-xl`): the visitor's own message text, rendered as a quoted line.
- **Body** (Work Sans, `text-lg`/`text-sm` depending on context, line-height 1.6): the assistant's streamed answers and all UI copy.
- **Label** (Work Sans, `text-sm`, muted color): secondary chrome like the portfolio link and placeholder text.

### Named Rules
**The One Voice Rule.** Only a visitor's own words ever appear in the italic serif "quote" treatment. The assistant's voice is never italicized and never rendered as a quote — it reads as plain, typed text, reinforcing that Oscar's answers are considered, not performed.

## Layout

Single-column, centered content at a `max-w-2xl` (42rem) reading width — deliberately narrow, like a page rather than a dashboard. Horizontal padding steps from `px-4` on mobile to `px-6` from the `sm` breakpoint up. The page is a full-height flex column (`h-dvh`, mobile-safe against browser chrome resizing) with three stacked regions: a short header, a scrolling conversation area that takes the remaining space, and a fixed input bar pinned to the bottom with `env(safe-area-inset-bottom)` padding for notched phones. There is no sidebar, no multi-column layout, and no fixed max-width container wider than the reading column — the product never needs to accommodate dense, dashboard-style information.

## Elevation & Depth

Flat. There are no shadows anywhere in this product and none should be introduced. Grouping and hierarchy come entirely from a hairline 1px border/rule (`#2a3a31`) or from the gold accent rule, never from a raised or floating surface.

### Named Rules
**The Flat-By-Default Rule.** Surfaces never lift. A hairline divider (the header's underline, the border above the input bar) is the only separator this product uses.

## Shapes

Corners are gently rounded, never sharp and never pill-shaped except on icon-only circular controls (the scroll-to-bottom button). The base radius is `0.625rem` (10px), used consistently on the input field, its submit button, and standard buttons; smaller controls scale down proportionally (`0.5rem`/`0.375rem`) rather than using a different corner language. No component uses a hard 0px corner or a fully sharp edge.

## Components

### Buttons
- **Shape:** rounded corners (10px on standard/icon-sm buttons, scaling down for smaller sizes) — never sharp, never pill except icon-only circular controls.
- **Primary/Submit:** gold leaf background and dark-forest text, reserved for the send/submit action; this is the only button that carries a filled background at rest.
- **Ghost (default for all other buttons):** transparent at rest, muted sage-green text, brightening to cream on hover. **The Quiet Button Rule.** Every button that isn't the primary send action stays nearly invisible until interacted with — restraint is the point, not a lesser treatment.
- **Focus:** a 3px gold-tinted ring (`ring-ring/50`) on keyboard focus; no visible focus state relies on color alone.

### Inputs / Fields
- **Style:** borderless-feeling — a transparent fill barely distinct from the page, sitting inside a rounded 10px container whose only visible edge is a 1px hairline border.
- **Focus:** the container border shifts to the gold ring color and gains the same 3px focus ring buttons use, so focus is unmistakable even though the resting state is deliberately quiet.
- **Disabled:** reduced opacity, no separate visual language.

### Navigation / Header
- **Style:** no nav bar chrome at all — just the page title in Fraunces italic-capable serif, a single external "Portfolio" link (sage, brightening gold on hover — the one link on the page allowed to turn gold), and a 1px gold underline rule beneath the whole header block. **The Header Rule.** The header never gains a background, border-box, or shadow of its own; it is typography and one hairline, nothing else.

### Message Transcript (signature component)
The product's one truly distinctive pattern. A visitor's question renders with a large italic Fraunces quotation mark in gold leaf, followed by the question itself in italic serif at `text-xl` — visually, a hand-annotated quote in the margin. The assistant's answer that follows carries no visual wrapper at all: no bubble, no background tint, no avatar — just Work Sans body text at `text-lg`, letting the two voices (quoted question, typed answer) read as naturally distinct without any chrome separating them.

## Do's and Don'ts

### Do:
- **Do** keep gold leaf (`#b8823f`) rare — a rule, a ring, a glyph, one filled button. Its scarcity is what makes it read as considered rather than decorative.
- **Do** render any user-authored text (a visitor's question, a quoted excerpt) in italic Fraunces; keep every system/assistant voice in plain Work Sans.
- **Do** use a 1px hairline (`#2a3a31` or gold) as the only separator between regions — never a box, card, or shadow.
- **Do** keep the reading column narrow (`max-w-2xl`) even as new features are added; this product is a page, not a dashboard.

### Don't:
- **Don't** add a chat-bubble treatment, avatar icons, or card backgrounds to messages — it would erase the entire "field journal" premise.
- **Don't** introduce a second accent color or a bright/saturated blue; the palette stays a single warm accent against forest green.
- **Don't** add box-shadows, drop-shadows, or any elevation effect anywhere in the product, including on hover states.
