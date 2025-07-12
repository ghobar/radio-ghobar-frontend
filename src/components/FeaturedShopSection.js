// FeaturedShopSection.js
import React from "react";
export default function FeaturedShopSection() {
  const products = [
    { name: "نام محصول 1", price: "۳۵۰,۰۰۰ تومان", id: 1 },
    { name: "نام محصول 2", price: "۲۰۰,۰۰۰ تومان", id: 2 },
    { name: "نام محصول 3", price: "۴۵۰,۰۰۰ تومان", id: 3 },
  ];

  return (
    <section className="featured-shop-section">
      <h2>محصولات ویژه رادیو غبار</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src="/assets/images/product_placeholder.png" alt={product.name} />
            <h3>{product.name}</h3>
            <p>قیمت: {product.price}</p>
            <button className="view-product-button">
              مشاهده محصول
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}