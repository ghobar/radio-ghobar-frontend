'use client';

import '@/styles/ghobar-club-card.css';

export default function GhobarClubCard({ title, href = '#' }) {
  return (
    <a href={href} className="rg-card">
      <div className="rg-card-image" />
      <h4 className="rg-card-title">{title}</h4>
    </a>
  );
}
