'use client';

import Link from 'next/link';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/shop/${product.slug || product.id}`}
      className="product-card-link"
    >
      <div className="product-card">

        {/* IMAGE */}
        <div className="product-image">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="img-main"
          />

          {product.images?.[1] && (
            <img
              src={product.images[1]}
              alt={`${product.title} design`}
              className="img-hover"
            />
          )}
        </div>

        {/* INFO */}
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>

          <div className="product-price">
            {product.price.toLocaleString()} تومان
          </div>
        </div>

      </div>
    </Link>
  );
}
