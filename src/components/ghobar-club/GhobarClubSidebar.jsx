'use client';

import React, { useMemo } from 'react';
import '@/styles/ghobar-club-sidebar.css';

const MAIN_GROUPS = [
  { key: 'article', label: 'مقاله‌ها' },
  { key: 'poll', label: 'نظرسنجی' },
  { key: 'chat', label: 'اتاق گفتگو' },
  { key: 'contest', label: 'مسابقه' },
  { key: 'psycho', label: 'تست روانشناسی' },
];

const SUB_TYPES = {
  article: [
    { key: 'music', label: 'موسیقی' },
    { key: 'cinema', label: 'سینما / سریال' },
    { key: 'culture', label: 'فرهنگ' },
  ],
  poll: [
    { key: 'weekly', label: 'هفتگی' },
    { key: 'hot', label: 'داغ' },
    { key: 'artists', label: 'هنرمندان' },
  ],
  chat: [
    { key: 'general', label: 'عمومی' },
    { key: 'metal', label: 'متال' },
    { key: 'rock', label: 'راک' },
  ],
  contest: [
    { key: 'guess', label: 'حدس آهنگ' },
    { key: 'trivia', label: 'تریویا' },
    { key: 'speed', label: 'سرعتی' },
  ],
  psycho: [
    { key: 'personality', label: 'شخصیت' },
    { key: 'mood', label: 'حالت روحی' },
    { key: 'habits', label: 'عادت‌ها' },
  ],
};

export default function GhobarClubSidebar({ filters, onChange }) {
  const mainGroup = filters.mainGroup || 'article';
  const subTypes = filters.subTypes || [];

  const currentSubTypes = useMemo(() => SUB_TYPES[mainGroup] || [], [mainGroup]);

  const setMainGroup = (key) => {
    onChange({ mainGroup: key, subTypes: [] }); // با تغییر گروه، تیک‌ها ریست شوند
  };

  const toggleSubType = (key) => {
    const next = subTypes.includes(key)
      ? subTypes.filter((x) => x !== key)
      : [...subTypes, key];

    onChange({ ...filters, subTypes: next });
  };

  return (
    <div className="rg-sidebar rg-ghobar-sidebar">
      <h3 className="rg-sidebar-title">غبار کلاب</h3>

      <div className="rg-sidebar-section">
        <div className="rg-section-label">زیرمجموعه کلی</div>

        <div className="rg-topic-buttons">
          {MAIN_GROUPS.map((g) => (
            <button
              key={g.key}
              type="button"
              className={mainGroup === g.key ? 'rg-topic-btn active' : 'rg-topic-btn'}
              onClick={() => setMainGroup(g.key)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rg-sidebar-section">
        <div className="rg-section-label">فیلترها</div>

        <div className="rg-checkbox-list">
          {currentSubTypes.map((t) => (
            <label key={t.key} className="rg-checkbox-row">
              <span>{t.label}</span>
              <input
                type="checkbox"
                checked={subTypes.includes(t.key)}
                onChange={() => toggleSubType(t.key)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
