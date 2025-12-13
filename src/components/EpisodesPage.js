'use client';

import React, { useEffect, useState, useCallback } from 'react';
import '@/styles/episodes.css';

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategorySlug, setCurrentCategorySlug] = useState('');
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [currentSortOrder, setCurrentSortOrder] = useState('-release_date');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalEpisodesCount, setTotalEpisodesCount] = useState(0);
  const totalPages = Math.ceil(totalEpisodesCount / pageSize);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(currentSearchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [currentSearchQuery]);

  const fetchEpisodes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (currentCategorySlug) params.append('category', currentCategorySlug);
      if (debouncedSearchQuery) params.append('search', debouncedSearchQuery);
      if (currentSortOrder) params.append('ordering', currentSortOrder);

      params.append('limit', pageSize);
      params.append('offset', (currentPage - 1) * pageSize);

      const response = await fetch(`http://localhost:8000/api/episodes/episodes/?${params.toString()}`);
      if (!response.ok) throw new Error(`Error fetching episodes: ${response.status}`);
      const data = await response.json();
      setEpisodes(Array.isArray(data) ? data : []);
      setTotalEpisodesCount(Array.isArray(data) ? data.length : 0);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setEpisodes([]);
      setTotalEpisodesCount(0);
    } finally {
      setLoading(false);
    }
  }, [currentCategorySlug, debouncedSearchQuery, currentSortOrder, currentPage, pageSize]);

  useEffect(() => setCurrentPage(1), [currentCategorySlug, debouncedSearchQuery, currentSortOrder]);
  useEffect(() => { fetchEpisodes(); }, [fetchEpisodes]);

  // Client & Mobile View
  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      const isMobile = window.innerWidth < 769;
      setIsMobileView(isMobile);
      setFiltersOpen(!isMobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryClick = (slug) => {
    setCurrentCategorySlug(slug);
    if (isMobileView) setFiltersOpen(false);
  };
  const handleSearchInputChange = (e) => setCurrentSearchQuery(e.target.value);
  const handleSearchButtonClick = () => {
    setDebouncedSearchQuery(currentSearchQuery);
    if (isMobileView) setFiltersOpen(false);
  };
  const handleSortChange = (e) => {
    setCurrentSortOrder(e.target.value);
    if (isMobileView) setFiltersOpen(false);
  };
  const toggleFilters = () => isMobileView && setFiltersOpen(prev => !prev);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      document.getElementById('episodes-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPaginationLinks = () => {
    const pageLinks = [];
    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    if (endPage - startPage + 1 < maxPageButtons) startPage = Math.max(1, endPage - maxPageButtons + 1);

    if (currentPage > 1) pageLinks.push(<a href="#" key="prev" className="page-link" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}>قبلی</a>);
    if (startPage > 1) pageLinks.push(<span key="start-ellipsis">...</span>);
    for (let i = startPage; i <= endPage; i++)
      pageLinks.push(<a href="#" key={i} className={`page-link ${currentPage === i ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handlePageChange(i); }}>{i}</a>);
    if (endPage < totalPages) pageLinks.push(<span key="end-ellipsis">...</span>);
    if (currentPage < totalPages) pageLinks.push(<a href="#" key="next" className="page-link" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}>بعدی</a>);

    return pageLinks;
  };

  return (
    <main className="episodes-page-main">
      <div className="container">
        <section className="filters-sort-section">
          {isClient && isMobileView && <button className="mobile-filter-toggle" onClick={toggleFilters}>فیلترها و مرتب‌سازی<span className={`toggle-arrow ${filtersOpen ? 'open' : ''}`}>&#9660;</span></button>}
          <div className={`filters-wrapper ${filtersOpen ? 'open' : ''}`}>
            <div className="filter-group category-filters">
              <span>دسته‌بندی:</span>
              <button className={`filter-btn ${!currentCategorySlug ? 'active' : ''}`} onClick={() => handleCategoryClick('')}>همه</button>
              <button className={`filter-btn ${currentCategorySlug === 'season_1' ? 'active' : ''}`} onClick={() => handleCategoryClick('season_1')}>فصل ۱</button>
              <button className={`filter-btn ${currentCategorySlug === 'season_2' ? 'active' : ''}`} onClick={() => handleCategoryClick('season_2')}>فصل ۲</button>
              <button className={`filter-btn ${currentCategorySlug === 'genre_focused' ? 'active' : ''}`} onClick={() => handleCategoryClick('genre_focused')}>ژانر محور</button>
              <button className={`filter-btn ${currentCategorySlug === 'artist_focused' ? 'active' : ''}`} onClick={() => handleCategoryClick('artist_focused')}>هنرمند محور</button>
            </div>

            <div className="filter-group search-filter">
              <input type="text" className="search-input" placeholder="جستجو در اپیزودها..." value={currentSearchQuery} onChange={handleSearchInputChange} onKeyDown={(e) => { if (e.key === 'Enter') handleSearchButtonClick(); }} />
              <button className="search-btn" onClick={handleSearchButtonClick}>جستجو</button>
            </div>

            <div className="filter-group sort-by-filter">
              <label htmlFor="sort-select">مرتب‌سازی بر اساس:</label>
              <select id="sort-select" value={currentSortOrder} onChange={handleSortChange}>
                <option value="-release_date">جدیدترین</option>
                <option value="episode_number">شماره اپیزود</option>
                <option value="title">عنوان</option>
              </select>
            </div>
          </div>
        </section>

        <section className="episodes-grid" id="episodes-grid">
          {loading && <p className="status-message">در حال بارگذاری اپیزودها...</p>}
          {error && <p className="status-message error">خطا: {error}</p>}
          {!loading && !error && episodes?.length === 0 && <p className="status-message">هیچ اپیزودی یافت نشد.</p>}
          {!loading && !error && episodes?.map(episode => (
            <div className="episode-card" key={episode.id}>
              <img src={episode.cover_image || '/assets/images/episode_placeholder.png'} alt={episode.title} />
              <div className="card-details">
                <h3 className="episode-title">{episode.title}</h3>
                <div className="episode-meta-info">
                  <p>اپیزود #{episode.episode_number}</p>
                  <p>دسته‌بندی: {episode.category || 'ندارد'}</p>
                  <p>تاریخ انتشار: {new Date(episode.release_date).toLocaleDateString('fa-IR')}</p>
                  <p>مدت زمان: {episode.duration || 'نامشخص'}</p>
                </div>
                <button className="listen-button">صفحه اپیزود</button>
              </div>
            </div>
          ))}
        </section>

        {(!loading && !error && totalEpisodesCount > pageSize) && <section className="pagination">{renderPaginationLinks()}</section>}
      </div>
    </main>
  );
}
