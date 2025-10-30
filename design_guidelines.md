# Panafrica Invest - Design Guidelines

## Design Foundation

**Approach:** Design system referencing Stripe (trust/clarity), Coinbase (crypto UX), Robinhood (investment UI), Bloomberg (data density)

**Principles:**
1. Trust through clarity - reinforce credibility
2. Data density with breathing room
3. Progressive disclosure - simple entry, deep functionality
4. African-centric global appeal

---

## Typography

**Fonts:**
- **Inter** (Google Fonts): Body, UI, tables
- **Space Grotesk** (Google Fonts): Headings, hero
- **JetBrains Mono**: Financial data, IDs, blockchain addresses

**Scale:**
```
Display Large: text-6xl font-bold (hero)
Display Medium: text-5xl font-bold (sections)
H1: text-4xl font-semibold (page titles)
H2: text-3xl font-semibold (card headers)
H3: text-2xl font-semibold (subsections)
H4: text-xl font-semibold (components)
Body Large: text-lg (key descriptions)
Body: text-base (standard)
Body Small: text-sm (helper text)
Caption: text-xs (timestamps)
Financial: text-2xl font-mono font-semibold (values)
Tables: text-sm font-medium (cells)
```

---

## Layout & Spacing

**Spacing Units:** 2, 4, 6, 8, 12, 16, 24
- Micro: space-2, 4 (related elements)
- Component: space-6, 8 (padding, cards)
- Section: space-12, 16, 24 (major sections)

**Grid Systems:**
- Dashboard: `grid-cols-12`
- Content: `max-w-7xl` container
- Sidebar: `w-64` + `flex-1` main
- Tables: Full-width, mobile horizontal scroll

**Breakpoints:**
- Mobile: base (single column)
- Tablet: md (2-column, condensed sidebar)
- Desktop: lg (multi-column, full sidebar)
- Wide: xl (3-4 columns, high density)

---

## Navigation Components

**Header:**
- Sticky: `sticky top-0 z-50 h-16`
- Logo left (h-8), nav center (space-x-8 text-sm font-medium), user/wallet right
- Mobile: Hamburger → drawer `w-full max-w-xs`

**Sidebar (Dashboard):**
- `w-64` fixed left, collapsible on tablet
- Groups: `text-xs uppercase tracking-wide`
- Items: `h-10 rounded-lg` with icon `w-5 h-5` + label, `space-x-3`
- Distinct active vs hover states

---

## Dashboard Components

**Top Performers Scoreboard:**
```
flex space-x-4 overflow-x-auto
Card: min-w-[320px] rounded-xl p-6
  - Flag icon: h-8 w-8
  - Country: text-xl font-semibold
  - Top 3: font-mono ticker + name + %
  - Large %: text-3xl font-bold + arrows
```

**Portfolio Summary Cards:**
```
grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
Card: rounded-xl p-6 min-h-[140px]
  - Icon/chart: h-12 w-12
  - Label: text-sm
  - Value: text-3xl font-semibold
  - Change: text-sm with indicator
```

**Asset Table:**
- Full-width, sticky header, `h-14` rows
- Columns: Asset (flex-1), Type, Country, Value, 24h%, 7d%, Actions
- Sortable headers, alternating rows
- Action buttons: text-sm per row

**Charts:**
- Portfolio: Area chart, gradient, `h-[400px]`
- Allocation: Donut, `h-[300px]`
- Time selector: Segmented (1D/1W/1M/3M/1Y/ALL)

---

## AI Recommendation Engine

**Questionnaire:**
```
Multi-step wizard (4-5 steps)
Progress: Stepped dots/bars at top
Cards: max-w-2xl mx-auto p-8 rounded-xl
Inputs: Radio (gap-4), sliders (w-full), multi-select chips
Nav: Back + Continue (space-x-4 bottom)
```

**Recommendation Cards:**
```
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
Card: rounded-xl overflow-hidden
  - Header: Asset image/icon, p-6
  - Content: Name (text-xl font-semibold), badge, flag
  - Metrics: grid-cols-3 gap-4 (Return/Risk/Horizon)
  - AI reasoning: Expandable "Why this?" text-sm
  - CTA: Full-width button
```

**Investment Instructions:**
```
lg:grid-cols-2 gap-8
Left: Asset summary (sticky)
Right: Numbered steps
Step: rounded-lg p-6, badge (h-8 w-8), description
Hedera wallet integration buttons
```

---

## Forms & Inputs

**Standard Form:**
```
Label: text-sm font-medium mb-2 (above input)
Input: h-11 rounded-lg px-4
Select: h-11 (matches inputs)
Textarea: min-h-[120px]
Helper: text-xs mt-1
Error: Red accent + icon + message
```

**Wallet Connection:**
```
Header button: rounded-full px-6 h-10
Modal: max-w-md centered p-6
Wallet list: Icons, hover states, h-14 items
```

**Search & Filters:**
```
Search: h-11, rounded-full (landing), rounded-lg (dashboard)
Filter pills: rounded-full px-4 h-8, dismissible
Advanced: Slide-out panel, w-[400px]
```

---

## Data Visualization

**Real-time Indicators:**
- Live pulse on price updates
- Arrows: h-4 w-4 green/red
- % badges: `rounded-full px-2 py-1 text-xs font-semibold`
- Sparklines: `h-8 w-24` inline charts

**Tokenization Display:**
- Token card with RWA details
- Ownership: Progress bar (% owned)
- Tx hash: `font-mono text-xs` truncated + copy button

---

## Page Layouts

### Landing Page

**Hero:**
```
h-[600px] full-width bg-image
Content: max-w-4xl mx-auto text-center
  - Headline: text-6xl font-bold (2-line max)
  - Subhead: text-xl max-w-2xl mx-auto
  - CTAs: space-x-4, primary (h-14 px-8 rounded-full) + secondary
  - Trust indicators: grid-cols-4 opacity-70
```

**Features:** `py-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- Cards: `p-8 rounded-xl`, icon (h-12 w-12), title (text-2xl), description

**Top Performers Preview:** `py-16`, country tabs/scroll, 6-8 assets in `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`

**How It Works:** Timeline/numbered cards (4 steps), `min-h-[200px]` each

**Social Proof:** `grid-cols-1 md:grid-cols-2 gap-8`, user photo (h-12 w-12 rounded-full)

**Footer:** `grid-cols-2 md:grid-cols-4 gap-8`, newsletter, grouped links

### Dashboard

**Layout:** Fixed sidebar `w-64` + main `flex-1 max-w-7xl px-6 py-8`

**Top:** Total value `w-full h-[200px]` + 4 metrics `grid-cols-4 gap-6`

**Middle:** `lg:grid-cols-3 gap-8`
- Left (col-span-2): Table/chart
- Right (col-span-1): AI insights

**Bottom:** Full-width regional map/chart

### AI Flow

**Steps 1-4:** `max-w-3xl mx-auto py-16`, fixed progress bar

**Step 5:** Hero (py-12 text-center) + grid + sticky summary panel

---

## Interactions & Animation

**Micro-interactions:**
```
Button hover: scale-105 + shadow
Card hover: shadow + translate-y-[-2px]
Tabs: duration-200 fade
Numbers: Count-up animation
Accordion: Smooth height transition
```

**Loading:** Skeleton pulse (tables), spinner h-6 w-6 (wallet)

---

## Accessibility

**Focus:** All interactive elements: `ring-2 ring-offset-2`

**Forms:** 
- Consistent `h-11` across inputs/selects/buttons
- Clear errors with icons
- Labels associated with inputs

**Color Independence:** Icons supplement color (arrows + red/green), chart patterns for colorblind

---

## Images

**Hero Image (Required):**
- **Location:** Landing hero background (h-[600px])
- **Content:** Modern African cityscape/financial market with tech overlay (stock exchanges, diverse professionals, traditional + modern fusion)
- **Treatment:** Dark overlay for text readability, bottom gradient, backdrop-blur on CTA buttons

**Additional:**
- Feature icons: Abstract AI/blockchain/portfolio illustrations
- Flags: h-6 w-6 (asset identification)
- RWA images: Real estate/farmland/infrastructure
- Avatars: h-10 w-10 rounded-full (testimonials/profiles)

---

**Token Budget Used:** ~1,950 tokens