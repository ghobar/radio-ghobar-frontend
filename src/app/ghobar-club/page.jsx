'use client';

import React, { useMemo, useState } from 'react';

import '@/styles/ghobar-club.css';

import GhobarClubSidebar from '@/components/ghobar-club/GhobarClubSidebar';
import GhobarClubCard from '@/components/ghobar-club/GhobarClubCard';
import ShopToolbar from '@/components/shop/ShopToolbar';

const ITEMS = [
  { id: 1, title: 'نظرسنجی: بهترین آلبوم سال؟', group: 'poll', createdAt: '2025-01-11', popularity: 90 },
  { id: 2, title: 'اتاق گفتگو: متال دهه ۹۰', group: 'chat', createdAt: '2025-02-03', popularity: 70 },
  { id: 3, title: 'مقاله: چرا راک هنوز زنده است؟', group: 'article', createdAt: '2024-12-20', popularity: 85 },
  { id: 4, title: 'مسابقه: حدس بزن این آهنگ مال کیه', group: 'contest', createdAt: '2025-03-01', popularity: 60 },
  { id: 5, title: 'تست روانشناسی: موسیقی شخصیت تو', group: 'psycho', createdAt: '2025-01-25', popularity: 95 },
  { id: 6, title: 'مقاله: داستان پیدایش جز', group: 'article', createdAt: '2025-02-14', popularity: 55 },
  { id: 7, title: 'نظرسنجی: بهترین کنسرت عمرت؟', group: 'poll', createdAt: '2025-02-18', popularity: 75 },
];

export default function GhobarClubPage() {
  // Toolbar state (مثل Shop)
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  // Sidebar state
  const [filters, setFilters] = useState({
    mainGroup: 'article',
    subTypes: [],
  });

  const visibleItems = useMemo(() => {
    // 1) فیلتر گروه اصلی
    let list = ITEMS.filter((x) => x.group === filters.mainGroup);

    // 2) سرچ
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((x) => x.title.toLowerCase().includes(q));
    }

    // 3) مرتب‌سازی
    if (sort === 'newest') {
      list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'oldest') {
      list = [...list].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === 'popularity') {
      list = [...list].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    // نکته: subTypes فعلاً در دیتا استفاده نشده (چون هنوز taxonomy واقعی رو وصل نکردیم)
    // وقتی API یا ساختار نهایی رو وصل کردیم اینجا هم فیلترش رو اعمال می‌کنیم.

    return list;
  }, [filters.mainGroup, search, sort]);

  return (
    <main className="rg-page">
      <div className="rg-container">
                <aside className="rg-sidebar-area">
          <GhobarClubSidebar filters={filters} onChange={setFilters} />
        </aside>
        <section className="rg-content">
          {/* TOOLBAR – دقیقاً مثل Shop */}
          <ShopToolbar
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
          />

          <div className="rg-grid">
            {visibleItems.map((item) => (
              <GhobarClubCard
                key={item.id}
                title={item.title}
                href="#"
              />
            ))}
          </div>
        </section>


      </div>
    </main>
  );
}
