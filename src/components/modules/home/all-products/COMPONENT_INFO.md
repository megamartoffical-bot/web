# All Products Component

## Overview
A comprehensive product listing section for the Mega Mart homepage. Located after "New Spring Knits" section.

## Features

### 1. **Dual View Modes**
   - **Grid View** (Default): Responsive grid layout (2-5 columns)
   - **List View**: Detailed row-based layout with more information

### 2. **Category Filtering**
   - Dynamic tabs from product categories
   - Auto-selects first category on load
   - Real-time product filtering

### 3. **Product Display (Grid)**
   - Product image with hover zoom effect
   - Product name and brand
   - Discount percentage badge (auto-calculated)
   - Sale price (red) + Original price (strikethrough)
   - Quick view button on hover

### 4. **Product Display (List)**
   - Compact image thumbnail
   - Full product details
   - Description preview (2 lines)
   - Category tags
   - Discount badge
   - Brand information

### 5. **Pagination**
   - Load More button
   - Shows 12 products initially
   - Loads additional 12 on click
   - Only displays when more products exist

### 6. **Responsive Design**
   - Mobile: 2 columns (grid)
   - Tablet: 3 columns (grid)
   - Desktop: 4 columns (grid)
   - Large Screen: 5 columns (grid)
   - List view toggle hidden on mobile (for better UX)

## File Structure
```
all-products/
├── AllProducts.tsx (Main component)
├── AllProductsSkeleton.tsx (Loading state)
├── index.ts (Exports)
└── COMPONENT_INFO.md (This file)
```

## Data Source
- Products from Redux API: `useGetAllProductsQuery()`
- Categories auto-extracted from product data
- Real-time filtering and display

## Component Props
None - Component handles its own state and data fetching

## Usage
```typescript
import AllProducts from "@/components/modules/home/all-products/AllProducts";

// In parent component
<AllProducts />
```

## Key Features
✅ Dynamic category filtering
✅ Grid and List view toggle
✅ Lazy loading with Load More
✅ Auto-calculated discount badges
✅ Responsive across all devices
✅ Skeleton loading state
✅ Direct product links
✅ Hover effects and animations
✅ Bengali currency symbol (৳)
✅ Empty state handling

## Integration
- Imported in: `web/src/app/(userLayout)/page.tsx`
- Position: After NewSpringKnits, Before SaveMore
- Spacing: Uses homepage spacing system (md:space-y-16 lg:space-y-20)

## Future Enhancements
- Sort options (price, newest, popularity)
- Product search
- Advanced filtering sidebar
- Favorites/wishlist
- Product comparison
- Review ratings display
