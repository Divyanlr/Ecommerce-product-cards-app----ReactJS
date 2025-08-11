# Frontend Developer Test - Product Card

## What I have built
I added a reusable `ProductCard` component for the product listing page. It shows the product image, name, price, a small variant selector, and an action button that switches to *Out of Stock* when the item is not available. The card is responsive, clean, and easy to reuse across the app.

## How I approached it
- Kept the existing stack and patterns, used Bootstrap grid for responsiveness.
- Created a square media area so all cards keep the same height.
- Used a compact info block and safe text truncation for long titles.
- If the API does not provide variants or stock, I add a small demo set of variants and set `inStock` to true so the UI is reviewable.

## Files to check
- `ecommerce/src/components/ProductCard.jsx`  
  Reusable card with variant handling, price, and button states.
- `ecommerce/src/components/Products.jsx`  
  Fetches data, enriches with demo variants if needed, renders the grid.
- `ecommerce/src/styles/product-card.css`  
  Small CSS layer for hover, spacing, and the square image area.

## Responsiveness
- Grid adapts at common breakpoints with Bootstrap columns.
- Images sit inside a 1:1 ratio box to keep tiles consistent.
- Long titles truncate so the layout stays tidy on small screens.

## Accessibility
- Images have `alt` text from the product title.
- The action button disables and reads *Out of Stock* when unavailable.
- Native select control for variants, which is keyboard friendly.

## Data assumptions
If real test data includes `variants` and `inStock`, pass them directly to `ProductCard` and remove the enrichment in `Products.jsx`.  

Temporary enrichment I used for the demo:
js:
variants: [{ label: "Small", value: "S" }, { label: "Medium", value: "M" }, { label: "Large", value: "L" }],
inStock: true


## Tech used

React, Create React App, Bootstrap. Redux is kept as in the base project.

## Run locally

```bash
cd ecommerce
npm install
npm start
```

App runs at `http://localhost:3000`.

## Time spent

About 1 hour, including styling and small refactors.

## Notes for reviewers

The card is self-contained and ready to drop into any grid. I focused on clarity, predictable layout, and a simple variant flow. Happy to extend it with loading states, tests, and currency formatting if needed.