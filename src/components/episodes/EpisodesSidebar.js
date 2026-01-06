'use client';

import '@/styles/episodes-sidebar.css';

export default function EpisodesSidebar({ filters, onChange }) {
  const season = filters.season || 'season1';
  const episodeTypes = filters.episodeTypes || [];

  const toggleType = (key) => {
    const next = episodeTypes.includes(key)
      ? episodeTypes.filter((i) => i !== key)
      : [...episodeTypes, key];

    onChange({ ...filters, episodeTypes: next });
  };

  const setSeason = (s) => {
    onChange({ season: s, episodeTypes: [] });
  };

  return (
    <div className="rg-sidebar rg-episodes-sidebar">
      <h3 className="rg-sidebar-title">اپیزودها</h3>

      <div className="rg-sidebar-section">
        <div className="rg-section-label">فصل</div>

        <div className="rg-main-group-toggle">
          <button
            type="button"
            className={season === 'season1' ? 'rg-main-btn active' : 'rg-main-btn'}
            onClick={() => setSeason('season1')}
          >
            فصل اول
          </button>

          <button
            type="button"
            className={season === 'season2' ? 'rg-main-btn active' : 'rg-main-btn'}
            onClick={() => setSeason('season2')}
          >
            فصل دوم
          </button>
        </div>
      </div>

      <div className="rg-sidebar-section">
        <div className="rg-section-label">نوع اپیزود</div>

        <div className="rg-checkbox-list">
          {season === 'season1' && (
            <>
              <label className="rg-checkbox-row">
                <span>ژانر‌محور</span>
                <input
                  type="checkbox"
                  checked={episodeTypes.includes('genre')}
                  onChange={() => toggleType('genre')}
                />
              </label>

              <label className="rg-checkbox-row">
                <span>پلی‌لیست</span>
                <input
                  type="checkbox"
                  checked={episodeTypes.includes('playlist')}
                  onChange={() => toggleType('playlist')}
                />
              </label>
            </>
          )}

          {season === 'season2' && (
            <>
              <label className="rg-checkbox-row">
                <span>هنرمند‌محور</span>
                <input
                  type="checkbox"
                  checked={episodeTypes.includes('artist')}
                  onChange={() => toggleType('artist')}
                />
              </label>

              <label className="rg-checkbox-row">
                <span>کشور‌محور</span>
                <input
                  type="checkbox"
                  checked={episodeTypes.includes('country')}
                  onChange={() => toggleType('country')}
                />
              </label>

              <label className="rg-checkbox-row">
                <span>ساز‌محور</span>
                <input
                  type="checkbox"
                  checked={episodeTypes.includes('instrument')}
                  onChange={() => toggleType('instrument')}
                />
              </label>

              <label className="rg-checkbox-row">
                <span>پلی‌لیست</span>
                <input
                  type="checkbox"
                  checked={episodeTypes.includes('playlist')}
                  onChange={() => toggleType('playlist')}
                />
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
