'use client';

import React, { useMemo, useState } from 'react';
import '@/styles/product-gallery.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductGallery({ images = [] }) {
  const safeImages = images?.length ? images : ['/assets/images/product_1.png'];

  const [index, setIndex] = useState(0);

  // zoom
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const current = useMemo(() => safeImages[index], [safeImages, index]);

  const prev = () => setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setIndex((i) => (i + 1) % safeImages.length);

  const handleMouseMove = (e) => {
    if (!zoom) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const turnOffZoom = () => {
    setZoom(false);
    setPos({ x: 50, y: 50 });
  };

  return (
    <div className="rg-gallery">
      {/* MAIN SLIDER */}
      <div
        className="rg-gallery-main"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={turnOffZoom}
        onMouseMove={handleMouseMove}
      >
        {/* اسلایدر باید LTR باشد تا translateX درست کار کند */}
        <div
          className="rg-slider"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {safeImages.map((src, i) => (
            <div className="rg-slide" key={`${src}-${i}`}>
              <img src={src} alt={`product-${i + 1}`} />
            </div>
          ))}
        </div>

        {/* ZOOM LAYER */}
        <div
          className={`rg-zoom-layer ${zoom ? 'on' : ''}`}
          style={{
            backgroundImage: `url(${current})`,
            backgroundPosition: `${pos.x}% ${pos.y}%`,
          }}
        />

        {/* ARROWS */}
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              className="rg-arrow left"
              onClick={prev}
              onMouseEnter={turnOffZoom}   // ✅ hover روی arrow => زوم خاموش
              aria-label="قبلی"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              className="rg-arrow right"
              onClick={next}
              onMouseEnter={turnOffZoom}   // ✅ hover روی arrow => زوم خاموش
              aria-label="بعدی"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* THUMBS */}
      {safeImages.length > 1 && (
        <div className="rg-gallery-thumbs" dir="ltr">
          <div className="rg-thumbs-track">
            {safeImages.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                className={i === index ? 'thumb active' : 'thumb'}
                onClick={() => setIndex(i)}
              >
                <img src={src} alt={`thumb-${i + 1}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
