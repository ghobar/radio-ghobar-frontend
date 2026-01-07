'use client';

import React, { useState } from 'react';
import '@/styles/product-tabs.css';

export default function ProductTabs({ description, specs = [], reviewCount = 0 }) {
  const [tab, setTab] = useState('desc'); // desc | specs | reviews

  return (
    <div className="rg-tabs">
      <div className="tab-head">
        <button className={tab === 'desc' ? 't active' : 't'} onClick={() => setTab('desc')} type="button">
          توضیحات
        </button>
        <button className={tab === 'specs' ? 't active' : 't'} onClick={() => setTab('specs')} type="button">
          مشخصات
        </button>
        <button className={tab === 'reviews' ? 't active' : 't'} onClick={() => setTab('reviews')} type="button">
          نظرات ({reviewCount})
        </button>
      </div>

      <div className="tab-body">
        {tab === 'desc' && <p className="desc">{description}</p>}

        {tab === 'specs' && (
          <div className="specs">
            {specs.map((x) => (
              <div className="spec-row" key={x.k}>
                <span className="k">{x.k}</span>
                <span className="v">{x.v}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'reviews' && (
          <div className="reviews">
            <div className="empty">فعلاً نظری ثبت نشده. اولین نفر باش 🙂</div>
          </div>
        )}
      </div>
    </div>
  );
}
