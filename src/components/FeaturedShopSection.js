'use client';

import React, { useEffect, useState } from 'react';

export default function FeaturedShopSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:8000/api/shop/products/');
        if (!response.ok) throw new Error('خطا در دریافت محصولات');

        const data = await response.json();
        setProducts(data.slice(0, 3)); // Take only the first 3 products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <section className="featured-shop-section">در حال بارگذاری...</section>;
  if (error) return <section className="featured-shop-section">خطا: {error}</section>;
  if (products.length === 0) return <section className="featured-shop-section">هیچ محصولی یافت نشد.</section>;

  return (
    <section className="featured-shop-section">
      <h2>محصولات ویژه رادیو غبار</h2>
      <div className="product-grid">
        {products.map((product) => {
          const mainImage =
            product.images?.find((img) => img.is_main)?.image ||
            product.images?.[0]?.image ||
            '/assets/images/product_placeholder.png';

          return (
            <div className="product-card" key={product.id}>
              <img src={mainImage} alt={product.name} />
              {/* NEW WRAPPER: card-details for consistent height */}
              <div className="card-details">
                <h3>{product.name}</h3>
                <p>
                  قیمت:{' '}
                  {new Intl.NumberFormat('fa-IR').format(parseFloat(product.base_price))} تومان
                </p>
              </div>
              <button className="view-product-button">مشاهده محصول</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}