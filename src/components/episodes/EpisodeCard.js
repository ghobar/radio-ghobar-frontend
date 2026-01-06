'use client';

import '@/styles/episode-card.css';

export default function EpisodeCard({ title, href = '#' }) {
  return (
    <a href={href} className="episode-card">
      <div className="episode-image" />
      <h4 className="episode-title">{title}</h4>
    </a>
  );
}
