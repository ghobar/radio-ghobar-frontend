'use client';

import React from 'react';
import '@/styles/product-page.css';

export default function RelatedProducts() {
  const items = [
    { id: 1, title: 'تی‌شرت رادیو غبار' },
    { id: 2, title: 'هودی چاپ سفید' },
    { id: 3, title: 'دورس مینیمال' },
    { id: 4, title: 'PDF ویژه (دیجیتال)' },
  ];

  return (
    <div className="rg-related">
      <h3 className="rg-related-title">محصولات مرتبط</h3>
      <div className="rg-related-grid">
        {items.map((x) => (
          <a key={x.id} className="rg-related-card" href="#">
            <div className="img" />
            <div className="t">{x.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
