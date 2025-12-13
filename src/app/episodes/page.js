"use client";
import React, { useState } from "react";
import "../../styles/episodes.css";

export default function EpisodesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");

  const categories = ["همه", "فصل ۱", "فصل ۲", "فصل ۳", "ویژه"];
  const episodes = [
    { id: 1, title: "قسمت ۱: آغاز", category: "فصل ۱" },
    { id: 2, title: "قسمت ۲: ادامه مسیر", category: "فصل ۱" },
    { id: 3, title: "قسمت ویژه نوروز", category: "ویژه" },
    { id: 4, title: "قسمت ۳: بازگشت", category: "فصل ۲" },
  ];

  const filtered = episodes.filter(
    (e) =>
      (selectedCategory === "همه" || e.category === selectedCategory) &&
      e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1 className="page-title">قسمت‌ها</h1>

      <div className="filter-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>جستجو</button>
        </div>

        <div className="sort-dropdown">
          <select>
            <option>مرتب‌سازی بر اساس جدیدترین</option>
            <option>قدیمی‌ترین</option>
            <option>پرمخاطب‌ترین</option>
          </select>
        </div>
      </div>

      <div className="categories">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={selectedCategory === c ? "active" : ""}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="items-grid">
        {filtered.map((e) => (
          <div key={e.id} className="item-card">
            <div className="thumbnail"></div>
            <h3>{e.title}</h3>
            <p>{e.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
