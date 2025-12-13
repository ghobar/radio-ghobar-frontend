'use client';

import { useState } from 'react';
import ShopSidebar from '@/components/shop/ShopSidebar';
import ShopToolbar from '@/components/shop/ShopToolbar';
import '@/styles/shop-layout.css';

export default function ShopPage() {

  /* ---------------------------
     FILTER STATE (SIDEBAR)
  ---------------------------- */
  const [filters, setFilters] = useState({
    mainGroup: 'clothing',
    productTypes: [],
    topicKey: null,
    musicGenres: [],
    artists: [],
  });

  /* ---------------------------
     TOOLBAR STATE
  ---------------------------- */
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  return (
    <main className="shop-page">
      <div className="shop-container">

        {/* SIDEBAR */}
        <aside className="shop-sidebar-area">
          <ShopSidebar
            filters={filters}
            onFilterChange={setFilters}
          />
        </aside>

        {/* PRODUCTS AREA */}
        <section className="shop-products-area">

          {/* TOOLBAR */}
          <ShopToolbar
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
          />

          {/* PRODUCTS GRID */}
          <div className="shop-products-grid">
            <div className="product-card">محصول ۱</div>
            <div className="product-card">محصول ۲</div>
            <div className="product-card">محصول ۳</div>
            <div className="product-card">محصول ۴</div>
            <div className="product-card">محصول ۵</div>
            <div className="product-card">محصول ۶</div>
          </div>

        </section>

      </div>
    </main>
  );
}
