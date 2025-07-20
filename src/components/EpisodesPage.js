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

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); // Fixed to 8 episodes per page
  // CRITICAL: totalEpisodesCount is now based on API response structure.
  // If API doesn't send total count, this will be inaccurate for pagination.
  const [totalEpisodesCount, setTotalEpisodesCount] = useState(0);
  const totalPages = Math.ceil(totalEpisodesCount / pageSize);

  // Debounce effect for search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(currentSearchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [currentSearchQuery]);

  // Data fetching logic (MODIFIED FOR ACTUAL API RESPONSE STRUCTURE)
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
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Error fetching episodes: ${response.status}`;
        try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.detail || errorJson.message || errorJson.error || errorMessage;
        } catch (parseError) {
            errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // CRITICAL FIX: API returns an array directly, not { count: N, results: [...] }
      const data = await response.json();

      // Set episodes to the array received directly from the API
      setEpisodes(Array.isArray(data) ? data : []);

      // WARNING: For full pagination, your API MUST return a total count.
      // If `data` is just the current page's array, `data.length` is NOT the total count.
      // For now, we'll set it to the length of the current page's data.
      // This will make `totalPages` often `1` or `0` if you only have a few actual episodes.
      setTotalEpisodesCount(Array.isArray(data) ? data.length : 0);

    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setEpisodes([]); // Ensure episodes is reset to empty array on error
      setTotalEpisodesCount(0); // Reset count on error
    } finally {
      setLoading(false);
    }
  }, [currentCategorySlug, debouncedSearchQuery, currentSortOrder, currentPage, pageSize]);

  // Reset currentPage to 1 when filters/search/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategorySlug, debouncedSearchQuery, currentSortOrder]);

  // Initial fetch or when currentPage/pageSize change (or other filter dependencies)
  useEffect(() => {
    fetchEpisodes();
  }, [fetchEpisodes]);

  // Effect to handle initial state and resize for filtersOpen and isMobileView
  useEffect(() => {
    setIsClient(true);

    const checkViewAndSetFilters = () => {
      if (typeof window !== 'undefined') {
        const isMobile = window.innerWidth < 769;
        setIsMobileView(isMobile);

        if (!isMobile) {
          setFiltersOpen(true);
        } else {
          setFiltersOpen(false);
        }
      }
    };

    if (typeof window !== 'undefined') {
      checkViewAndSetFilters();
      window.addEventListener('resize', checkViewAndSetFilters);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkViewAndSetFilters);
      }
    };
  }, []);

  // Event handlers for filters/search/sort (now use isMobileView)
  const handleCategoryClick = (slug) => {
    setCurrentCategorySlug(slug);
    setCurrentSearchQuery(slug ? currentSearchQuery : '');
    setDebouncedSearchQuery(slug ? currentSearchQuery : '');
    if (isMobileView) {
      setFiltersOpen(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setCurrentSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = () => {
    setDebouncedSearchQuery(currentSearchQuery);
    if (isMobileView) {
      setFiltersOpen(false);
    }
  };

  const handleSortChange = (e) => {
    setCurrentSortOrder(e.target.value);
    if (isMobileView) {
      setFiltersOpen(false);
    }
  };

  const toggleFilters = () => {
    if (isMobileView) {
      setFiltersOpen(prev => !prev);
    }
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      document.getElementById('episodes-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate pagination links
  const renderPaginationLinks = () => {
    const pageLinks = [];
    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    if (currentPage > 1) {
      pageLinks.push(
        <a href="#" key="prev" className="page-link" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}>
          قبلی
        </a>
      );
    }

    if (startPage > 1) {
      pageLinks.push(<span key="start-ellipsis">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <a
          href="#"
          key={i}
          className={`page-link ${currentPage === i ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); handlePageChange(i); }}
        >
          {i}
        </a>
      );
    }

    if (endPage < totalPages) {
      pageLinks.push(<span key="end-ellipsis">...</span>);
    }

    if (currentPage < totalPages) {
      pageLinks.push(
        <a href="#" key="next" className="page-link" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}>
          بعدی
        </a>
      );
    }

    return pageLinks;
  };

  return (
    <main className="episodes-page-main">
      <div className="container">
        <section className="filters-sort-section">
          {isClient && isMobileView && (
            <button className="mobile-filter-toggle" onClick={toggleFilters}>
              فیلترها و مرتب‌سازی
              <span className={`toggle-arrow ${filtersOpen ? 'open' : ''}`}>&#9660;</span>
            </button>
          )}

          <div className={`filters-wrapper ${filtersOpen ? 'open' : ''}`}>
            <div className="filter-group category-filters">
              <span>دسته‌بندی:</span>
              <button
                className={`filter-btn ${!currentCategorySlug ? 'active' : ''}`}
                data-category-slug=""
                onClick={() => handleCategoryClick('')}
              >
                همه
              </button>
              <button
                className={`filter-btn ${currentCategorySlug === 'season_1' ? 'active' : ''}`}
                data-category-slug="season_1"
                onClick={() => handleCategoryClick('season_1')}
              >
                فصل ۱
              </button>
              <button
                className={`filter-btn ${currentCategorySlug === 'season_2' ? 'active' : ''}`}
                data-category-slug="season_2"
                onClick={() => handleCategoryClick('season_2')}
              >
                فصل ۲
              </button>
              <button
                className={`filter-btn ${currentCategorySlug === 'genre_focused' ? 'active' : ''}`}
                data-category-slug="genre_focused"
                onClick={() => handleCategoryClick('genre_focused')}
              >
                ژانر محور
              </button>
              <button
                className={`filter-btn ${currentCategorySlug === 'artist_focused' ? 'active' : ''}`}
                data-category-slug="artist_focused"
                onClick={() => handleCategoryClick('artist_focused')}
              >
                هنرمند محور
              </button>
            </div>

            <div className="filter-group search-filter">
              <input
                type="text"
                id="search-input"
                placeholder="جستجو در اپیزودها..."
                className="search-input"
                value={currentSearchQuery}
                onChange={handleSearchInputChange}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearchButtonClick(); }}
              />
              <button id="search-button" className="search-btn" onClick={handleSearchButtonClick}>جستجو</button>
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

          {!loading && !error && episodes?.map((episode) => (
            <div className="episode-card" key={episode.id}>
              <img
                src={episode.cover_image || '/assets/images/episode_placeholder.png'}
                alt={episode.title}
              />
              <div className="card-details">
                <h3 className="episode-title">{episode.title}</h3>
                <div className="episode-meta-info">
                    <p>اپیزود #{episode.episode_number}</p>
                    {/* CRITICAL: `episode.category` is a string, not an object. Access directly. */}
                    <p>دسته‌بندی: {episode.category || 'ندارد'}</p>
                    <p>تاریخ انتشار: {new Date(episode.release_date).toLocaleDateString('fa-IR')}</p>
                    <p>مدت زمان: {episode.duration || 'نامشخص'}</p>
                </div>
                <button className="listen-button">صفحه اپیزود</button>
              </div>
            </div>
          ))}
        </section>

        {/* Conditional Pagination - Only show if totalEpisodesCount is greater than page size */}
        {!loading && !error && totalEpisodesCount > pageSize && (
          <section className="pagination">
            {renderPaginationLinks()}
          </section>
        )}
      </div>
    </main>
  );
}