import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import "../styles/product-card.css";


//  ProductCard -- Reusable tile for listing grids.
//  Expects: { id, title, image, price, variants?: [{label, value}], inStock?: boolean }
 
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const {
    id,
    title,
    image,
    price,
    variants: rawVariants,
    inStock: rawInStock,
  } = product;

  // Fallbacks for datasets that do not expose variants or stock
  const variants = useMemo(() => {
    if (Array.isArray(rawVariants) && rawVariants.length > 0) return rawVariants;
    return [{ label: "Standard", value: "standard" }];
  }, [rawVariants]);

  const inStock = useMemo(() => {
    if (typeof rawInStock === "boolean") return rawInStock;
    // Fake Store API has no stock flag, so we can keep it available by default
    return true;
  }, [rawInStock]);

  const [selectedVariant, setSelectedVariant] = useState(variants[0]?.value);

  const handleAdd = () => {
    dispatch(addCart({ ...product, selectedVariant }));
  };

  return (
    <div className="card product-card  h-100 shadow-sm border-0">
      <div className="ratio ratio-1x1 bg-light">
        <img
          src={image}
          alt={title}
          className="object-fit-contain p-3"
          loading="lazy"
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h6 className="card-title mb-1 text-truncate" title={title}>
          {title}
        </h6>

        <div className="mb-2 fw-semibold">
          {typeof price === "number" ? `$${price.toFixed(2)}` : price}
        </div>

        <label htmlFor={`variant-${id}`} className="form-label small mb-1">
          Variant
        </label>
        <select
          id={`variant-${id}`}
          className="form-select form-select-sm mb-3"
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(e.target.value)}
          disabled={!inStock || variants.length === 1}
        >
          {variants.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          className={`btn btn-sm mt-auto ${inStock ? "btn-dark" : "btn-secondary"}`}
          onClick={handleAdd}
          disabled={!inStock}
          aria-disabled={!inStock}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
