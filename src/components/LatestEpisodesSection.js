'use client';

import React, { useEffect, useState } from 'react';

export default function LatestEpisodesSection() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const response = await fetch('http://localhost:8000/api/episodes/episodes/');
        if (!response.ok) throw new Error('خطا در دریافت اپیزودها');

        const data = await response.json();
        const sorted = data.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
        setEpisodes(sorted.slice(0, 3)); // Take only the first 3 latest episodes
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEpisodes();
  }, []);

  if (loading) return <section className="latest-episodes-section">در حال بارگذاری...</section>;
  if (error) return <section className="latest-episodes-section">خطا: {error}</section>;
  if (episodes.length === 0) return <section className="latest-episodes-section">هیچ اپیزودی یافت نشد.</section>;


  return (
    <section className="latest-episodes-section">
      <h2>جدیدترین اپیزودها</h2>
      <div className="episode-cards-wrapper">
        {episodes.map((episode) => (
          <div className="episode-card" key={episode.id}>
            <img
              src={episode.cover_image || '/assets/images/episode_placeholder.png'}
              alt={episode.title}
            />
            {/* NEW WRAPPER: card-details for consistent height */}
            <div className="card-details">
              <h3>{episode.title}</h3>
              <p>اپیزود #{episode.episode_number}</p>
            </div>
            <button className="listen-button">
              صفحه اپیزود
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}