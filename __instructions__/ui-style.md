# Scheduler Booking Application UI Style Guide

## 1. Color Palette

### Primary Colors

- **Primary**: `#0C56DB` (blue-600) - Main actions, buttons, active states
- **Secondary**: `#64748B` (slate-500) - Secondary actions, less prominent elements
- **Accent**: `#F8FAFC` (slate-50) - Light backgrounds, subtle highlights

### Semantic Colors

- **Success**: `#10B981` (green-500) - Confirmations
- **Warning**: `#F59E0B` (amber-500) - Warnings, pending states
- **Error**: `#EF4444` (red-500) - Errors, cancellations
- **Info**: `#3B82F6` (blue-500) - Informational elements

### Neutral Colors

- **Background**: White (light) / slate-900 (dark)
- **Foreground**: slate-900 (light) / slate-100 (dark)
- **Border**: slate-200 (light) / slate-700 (dark)

## 2. Typography

- **Font**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Scale**:
  - Display: 36px/2.25rem (700)
  - H1: 30px/1.875rem (700)
  - H2: 24px/1.5rem (600)
  - H3: 20px/1.25rem (600)
  - Body: 16px/1rem (400)
  - Small: 14px/0.875rem (400)

## 3. Components

### Buttons

- **Primary**: Blue filled for main actions
- **Secondary**: Slate for alternative actions
- **Outline**: White with border for less prominent actions
- **Ghost**: No background for subtle actions
- **Destructive**: Red for cancellations

### Cards

- White background with subtle border and shadow
- Rounded corners (rounded-xl)
- Consistent padding (p-6)

### Forms & Inputs

- Consistent height (h-9), rounded corners
- Labels above inputs
- Clear validation messages

## 4. Layout

- **Max Width**: 1280px for content areas
- **Spacing**:
  - Micro: 0.25-0.5rem (4-8px)
  - Component: 1rem (16px)
  - Section: 1.5-2.5rem (24-40px)
- **Responsive Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

## 5. Page-Specific Styling

### Store Browsing

- Prominent search/filter
- Grid of store cards
- Clear sort options

### Booking Flow

- Step indicators
- Visual service/team selection
- Calendar and time slot picker
- Clear booking summary

### Dashboard

- Overview cards and upcoming bookings
- Connected stores list
- Sortable booking management
- Tabbed settings

## 6. Animation & Accessibility

- Subtle transitions (150-300ms)
- WCAG AA compliance (4.5:1 contrast)
- Visible focus indicators
- Proper ARIA labels
- Dark mode support
