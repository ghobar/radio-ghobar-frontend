'use client';

import { useState } from 'react';
import ShopSidebar from '@/components/shop/ShopSidebar';
import ShopToolbar from '@/components/shop/ShopToolbar';
import '@/styles/shop-layout.css';
import ProductCard from "@/components/shop/ProductCard";

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
            <ProductCard
              product={{
                title: 'تی‌شرت Pantera',
                price: 1900000,
                images: [
                  '/assets/images/11-1.jpg',
                  '/assets/images/PANTERA FLOODS.jpeg'
                ]
              }}
            />
                        <ProductCard
              product={{
                title: 'تی‌شرت acdc',
                price: 1900000,
                images: [
                  '/assets/images/1-1.jpg',
                  '/assets/images/PANTERA FLOODS.jpeg'
                ]
              }}
            />
            <ProductCard
              product={{
                title: 'تی‌شرت Pantera',
                price: 1900000,
                images: [
                  '/assets/images/5-1.jpg',
                  '/assets/images/PANTERA FLOODS.jpeg'
                ]
              }}
            />
                        <ProductCard
              product={{
                title: 'تی‌شرت acdc',
                price: 1900000,
                images: [
                  '/assets/images/12-1.jpg',
                  '/assets/images/PANTERA FLOODS.jpeg'
                ]
              }}
            />
            <ProductCard
              product={{
                title: 'تی‌شرت Pantera',
                price: 1900000,
                images: [
                  '/assets/images/10.jpg',
                  '/assets/images/PANTERA FLOODS.jpeg'
                ]
              }}
            />
                        <ProductCard
              product={{
                title: 'تی‌شرت acdc',
                price: 1900000,
                images: [
                  '/assets/images/13-1.jpg',
                  '/assets/images/PANTERA FLOODS.jpeg'
                ]
              }}
            />
          </div>

        </section>

      </div>
    </main>
  );
}
