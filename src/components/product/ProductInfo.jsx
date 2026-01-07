'use client';

import React from 'react';
import '@/styles/product-info.css';
import { Heart, ShoppingCart, Truck } from 'lucide-react';

export default function ProductInfo({
  product,
  color,
  setColor,
  size,
  setSize,
  qty,
  setQty,
  finalPrice,
}) {
  const inStock = !!product.inStock;

  const inc = () => setQty((q) => Math.min(10, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  const formatPrice = (n) => n?.toLocaleString('fa-IR');

  return (
    <div className="rg-product-info">
      <div className="top">
        <h1 className="title">{product.title}</h1>
        <div className="meta">
          <span className="brand">{product.brand}</span>
          <span className={inStock ? 'stock in' : 'stock out'}>
            {inStock ? 'موجود' : 'ناموجود'}
          </span>
        </div>
      </div>

      <p className="short">{product.shortDesc}</p>

      <div className="price-row">
        <div className="price">
          <span className="current">{formatPrice(finalPrice)} تومان</span>
          {product.oldPrice ? (
            <span className="old">{formatPrice(product.oldPrice)} تومان</span>
          ) : null}
        </div>

        <button className="fav-btn" type="button" title="علاقه‌مندی">
          <Heart size={18} />
        </button>
      </div>

      {/* رنگ */}
      {product.colors?.length ? (
        <div className="block">
          <div className="label">رنگ</div>
          <div className="colors">
            {product.colors.map((c) => (
              <button
                key={c.key}
                type="button"
                className={c.key === color ? 'color active' : 'color'}
                onClick={() => setColor?.(c.key)}
                title={c.label}
              >
                <span className="dot" style={{ background: c.hex }} />
                <span className="name">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* سایز */}
      {product.sizes?.length ? (
        <div className="block">
          <div className="label">سایز</div>
          <div className="sizes">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                className={s === size ? 'size active' : 'size'}
                onClick={() => setSize?.(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* تعداد + افزودن به سبد */}
      <div className="cta-row">
        <div className="qty">
          <button type="button" onClick={inc}>+</button>
          <span>{qty}</span>
          <button type="button" onClick={dec}>-</button>
        </div>

        <button
          className="add-to-cart"
          type="button"
          disabled={!inStock}
          onClick={() => {
            // TODO: add to cart
            console.log('add to cart', { id: product.id, color, size, qty });
          }}
        >
          <ShoppingCart size={18} />
          افزودن به سبد خرید
        </button>
      </div>

      <div className="info-cards">
        <div className="info-card">
          <Truck size={18} />
          <span>ارسال برای ایران (قابل تنظیم)</span>
        </div>
        <div className="info-card">
          <span className="badge">غبار</span>
          <span>هماهنگ با تم سایت شما</span>
        </div>
      </div>
    </div>
  );
}
