// LatestEpisodesSection.js
import React from "react";
export default function LatestEpisodesSection() {
  return (
    <section className="latest-episodes-section">
      <h2>جدیدترین اپیزودها</h2>
      <div className="episode-cards-wrapper">
        {[1, 2, 3].map((num) => (
          <div className="episode-card" key={num}>
            <img src="/assets/images/episode_placeholder.png" alt={`اپیزود ${num}`} />
            <h3>عنوان اپیزود {num}</h3>
            <p>اپیزود ۰{num}</p>
            <button className="listen-button">
              صفحه اپیزود
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}