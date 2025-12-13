'use client';

import React, { useMemo } from "react";
import "@/styles/shop-sidebar.css";

const BRAND_YELLOW = "#E39D0A";

const MAIN_GROUPS = [
  { key: "clothing", label: "پوشاک" },
  { key: "digital", label: "کالای دیجیتال" },
];

const PRODUCT_TYPES = {
  clothing: [
    { key: "tshirt", label: "تی‌شرت" },
    { key: "hoodie", label: "هودی" },
    { key: "dors", label: "دورس" },
  ],
  digital: [
    { key: "pdf", label: "فایل PDF" },
    { key: "special-episode", label: "اپیزود ویژه" },
    { key: "course", label: "پروژه آموزشی" },
  ],
};

const TOPIC_GROUPS = [
  { key: "music", label: "موسیقی" },
  { key: "game", label: "بازی" },
  { key: "cinema", label: "سینما / سریال" },
  { key: "art", label: "نقاشی / گرافیک" },
];

const MUSIC_GENRES = [
  { key: "metal", label: "متال" },
  { key: "rock", label: "راک" },
  { key: "jazz", label: "جز" },
  { key: "hiphop", label: "هیپ‌هاپ" },
];

const BANDS_BY_GENRE = {
  metal: [
    { key: "metallica", label: "Metallica" },
    { key: "slipknot", label: "Slipknot" },
    { key: "tool", label: "Tool" },
  ],
  rock: [
    { key: "pink-floyd", label: "Pink Floyd" },
    { key: "radiohead", label: "Radiohead" },
  ],
};

export default function ShopSidebar({ filters, onFilterChange }) {
  const mainGroup = filters.mainGroup || "clothing";
  const productTypes = filters.productTypes || [];
  const topicKey = filters.topicKey || null;      // music / game / ...
  const musicGenres = filters.musicGenres || []; // array
  const bands = filters.bands || [];             // array

  const hasBandBlock = useMemo(() => {
    // اگر یکی از ژانرهایی که دیتای band دارد انتخاب شده باشد
    return musicGenres.some((g) => BANDS_BY_GENRE[g]?.length);
  }, [musicGenres]);

  const updateFilters = (patch) => {
    const next = { ...filters, ...patch };
    onFilterChange?.(next);
  };

  const toggleFromArray = (currentArr, key) => {
    return currentArr.includes(key)
      ? currentArr.filter((k) => k !== key)
      : [...currentArr, key];
  };

  return (
    <div className="rg-sidebar">

      <h3 className="rg-sidebar-title">محصولات</h3>

      {/* --- دسته اصلی --- */}
      <div className="rg-sidebar-section">
        <div className="rg-section-label">دسته اصلی</div>
        <div className="rg-main-group-toggle">
          {MAIN_GROUPS.map((g) => (
            <button
              key={g.key}
              type="button"
              className={
                mainGroup === g.key
                  ? "rg-main-btn active"
                  : "rg-main-btn"
              }
              onClick={() =>
                updateFilters({
                  mainGroup: g.key,
                  // وقتی دیجیتال می‌شود، موضوع طرح را خالی کن
                  ...(g.key === "digital"
                    ? { topicKey: null, musicGenres: [], bands: [] }
                    : {}),
                })
              }
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- نوع محصول --- */}
      <div className="rg-sidebar-section">
        <div className="rg-section-label">نوع محصول</div>
        <div className="rg-checkbox-list">
          {(PRODUCT_TYPES[mainGroup] || []).map((pt) => (
            <label key={pt.key} className="rg-checkbox-row">
              <span>{pt.label}</span>
              <input
                type="checkbox"
                checked={productTypes.includes(pt.key)}
                onChange={() =>
                  updateFilters({
                    productTypes: toggleFromArray(productTypes, pt.key),
                  })
                }
              />
            </label>
          ))}
        </div>
      </div>

      {/* --- موضوع طرح: فقط وقتی پوشاک انتخاب شده --- */}
      {mainGroup === "clothing" && (
        <>
          <div className="rg-sidebar-section">
            <div className="rg-section-label">موضوع طرح</div>
            <div className="rg-topic-buttons">
              {TOPIC_GROUPS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className={
                    topicKey === t.key
                      ? "rg-topic-btn active"
                      : "rg-topic-btn"
                  }
                  onClick={() =>
                    updateFilters({
                      topicKey: t.key,
                      // اگر چیزی غیر از موسیقی انتخاب شد، ژانر و بند را خالی کن
                      ...(t.key !== "music"
                        ? { musicGenres: [], bands: [] }
                        : {}),
                    })
                  }
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* --- سبک / ژانر: فقط وقتی موضوع = موسیقی --- */}
          {topicKey === "music" && (
            <div className="rg-sidebar-section">
              <div className="rg-section-label">سبک / ژانر</div>
              <div className="rg-checkbox-list">
                {MUSIC_GENRES.map((g) => (
                  <label key={g.key} className="rg-checkbox-row">
                    <span>{g.label}</span>
                    <input
                      type="checkbox"
                      checked={musicGenres.includes(g.key)}
                      onChange={() =>
                        updateFilters({
                          musicGenres: toggleFromArray(musicGenres, g.key),
                          // اگر همه ژانرها حذف شدند، بندها را هم خالی کن
                          ...(musicGenres.length === 1 &&
                          musicGenres[0] === g.key
                            ? { bands: [] }
                            : {}),
                        })
                      }
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* --- هنرمند / بند: اگر حداقل یک ژانر قابل‌پشتیبانی انتخاب شده باشد --- */}
          {topicKey === "music" && hasBandBlock && (
            <div className="rg-sidebar-section">
              <div className="rg-section-label">هنرمند / بند</div>
              <div className="rg-checkbox-list rg-band-list">
                {musicGenres.flatMap((genreKey) =>
                  (BANDS_BY_GENRE[genreKey] || []).map((b) => (
                    <label key={`${genreKey}-${b.key}`} className="rg-checkbox-row">
                      <span>{b.label}</span>
                      <input
                        type="checkbox"
                        checked={bands.includes(b.key)}
                        onChange={() =>
                          updateFilters({
                            bands: toggleFromArray(bands, b.key),
                          })
                        }
                      />
                    </label>
                  ))
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
