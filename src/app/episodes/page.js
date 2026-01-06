'use client';

import { useState } from 'react';
import EpisodesSidebar from '@/components/episodes/EpisodesSidebar';
import EpisodeCard from '@/components/episodes/EpisodeCard';
import ShopToolbar from '@/components/shop/ShopToolbar';

import '@/styles/episodes-layout.css';

export default function EpisodesPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  const [filters, setFilters] = useState({
    season: 'season1',
    episodeTypes: [],
  });

  return (
    <main className="episodes-page">
      <div className="episodes-container">
        {/* SIDEBAR */}
        <aside className="episodes-sidebar-area">
          <EpisodesSidebar
            filters={filters}
            onChange={setFilters}
          />
        </aside>

        {/* PRODUCTS AREA */}
        <section className="episodes-products-area">

          {/* TOOLBAR – دقیقاً مثل Shop */}
          <ShopToolbar
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
          />

          {/* CARDS */}
          <div className="episodes-grid">
            <EpisodeCard title="اپیزود ۱" />
            <EpisodeCard title="اپیزود ۲" />
            <EpisodeCard title="اپیزود ۳" />
            <EpisodeCard title="اپیزود ۴" />
            <EpisodeCard title="اپیزود ۱" />
            <EpisodeCard title="اپیزود ۲" />
            <EpisodeCard title="اپیزود ۳" />
            <EpisodeCard title="اپیزود ۴" />
            <EpisodeCard title="اپیزود ۱" />
            <EpisodeCard title="اپیزود ۲" />
            <EpisodeCard title="اپیزود ۳" />
            <EpisodeCard title="اپیزود ۴" />
          </div>

        </section>



      </div>
    </main>
  );
}
