# Modernization Guide

## Overview

This document describes the modernization efforts applied to the warm.lat website, based on aelix.ltd design principles.

## Component Library

### Location
`src/components/ui/`

### Available Components

#### Button
A versatile button component with multiple variants and sizes.

```tsx
import { Button } from "@/components/ui"

<Button variant="primary" size="lg">
  Click Me
</Button>
```

**Variants:**
- `primary` - White background with black text (default)
- `secondary` - Translucent with border
- `ghost` - No background, subtle hover
- `outline` - Border only

**Sizes:**
- `sm` - Small padding
- `md` - Medium padding (default)
- `lg` - Large padding

#### Card
A container component with hover effects and optional gradients.

```tsx
import { Card } from "@/components/ui"

<Card hover={true} gradient={false}>
  Content goes here
</Card>
```

#### Container
A responsive container with consistent max-widths and padding.

```tsx
import { Container } from "@/components/ui"

<Container size="lg">
  Content goes here
</Container>
```

#### Section
A semantic section component with consistent vertical spacing.

```tsx
import { Section } from "@/components/ui"

<Section spacing="lg">
  Content goes here
</Section>
```

## Design System

### Colors
- Primary background: `bg-[#0A0A0B]`
- Card backgrounds: `bg-white/[0.02]`
- Card hover: `bg-white/[0.03]`
- Borders: `border-white/10`
- Text: `text-white`, `text-white/60`, `text-white/40`

### Border Radius
- Buttons/small cards: `rounded-xl` (12px)
- Cards/sections: `rounded-2xl` (16px)
- Large images: `rounded-3xl` (24px)

### Spacing
- Section spacing: `py-32` (large), `py-24` (medium), `py-12` (small)
- Card padding: `p-8` (default), `p-6` (compact)
- Grid gaps: `gap-6` (default), `gap-8` (spacious)

## Home Page Components

### Location
`src/components/home/`

Components:
- **HeroSection** - Main hero with logo, title, and stats
- **FeaturesSection** - Grid of feature cards
- **StatsSection** - Statistics with CTA

## Migration Guide

Replace inline styles with components:

**Before:**
```tsx
<div className="max-w-7xl mx-auto px-4 py-32">
  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
    Content
  </div>
</div>
```

**After:**
```tsx
<Section>
  <Container>
    <Card>Content</Card>
  </Container>
</Section>
```

## Resources

- [aelix.ltd](https://aelix.ltd) - Design inspiration
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Next.js](https://nextjs.org) - Framework
