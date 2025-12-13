'use client';

import React from "react";
import "@/styles/shop-toolbar.css";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ShopToolbar({ search, setSearch, sort, setSort }) {
  return (
    <div className="shop-toolbar">
      <div className="toolbar-search">
        <Search className="icon" />
        <input
          type="text"
          placeholder="جستجو در محصولات..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="toolbar-sort">
        <SlidersHorizontal className="icon" />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">مرتب‌سازی</option>
          <option value="price-asc">قیمت (کم به زیاد)</option>
          <option value="price-desc">قیمت (زیاد به کم)</option>
          <option value="popularity">محبوبیت</option>
        </select>
      </div>
    </div>
  );
}
