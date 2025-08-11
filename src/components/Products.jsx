import { useDispatch } from "react-redux";
import React, { useState, useMemo, useEffect } from "react";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "../pages/ProductCard";

const Products = () => {
  const [all, setAll] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Map buttons to Fake Store API categories
  const categories = useMemo(
    () => [
      { key: "all", label: "All" },
      { key: "men's clothing", label: "Men" },
      { key: "women's clothing", label: "Women" },
      { key: "jewelery", label: "Jewelery" },
      { key: "electronics", label: "Electronics" },
    ],
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products/", {
          signal: controller.signal,
        });
        const data = await res.json();

        // Enrich with simple variants and stock so the card UI is test ready.
        const enriched = data.map((p) => ({
          ...p,
          variants: [
            { label: "Small", value: "S" },
            { label: "Medium", value: "M" },
            { label: "Large", value: "L" },
          ],
          inStock: true,
        }));

        setAll(enriched);
        setList(enriched);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("Failed to load products", e);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, []);

  const filterBy = (catKey) => {
    if (catKey === "all") {
      setList(all);
    } else {
      setList(all.filter((p) => p.category === catKey));
    }
  };

  const Loading = () => (
    <div className="text-center py-5">Loading products...</div>
  );

  const Grid = () => (
    <>
      <div className="buttons d-flex flex-wrap justify-content-center gap-2 mb-4">
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            className="btn btn-outline-dark btn-sm"
            onClick={() => filterBy(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {list.map((product) => (
        <div
          key={product.id}
          className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 d-flex"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </>
  );

  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-12">
          <h2 className="display-6 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>

      <div className="row justify-content-center">
        {loading ? <Loading /> : <Grid />}
      </div>
    </div>
  );
};

export default Products;
