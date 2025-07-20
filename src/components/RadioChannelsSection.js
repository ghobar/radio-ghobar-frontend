'use client';

import React, { useEffect, useState } from 'react';

export default function RadioChannelsSection() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchChannels() {
      try {
        const response = await fetch('http://localhost:8000/api/social/channels/');
        if (!response.ok) throw new Error('خطا در دریافت کانال‌ها');

        const data = await response.json();
        setChannels(data.slice(0, 3)); // Take only the first 3 channels
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchChannels();
  }, []);

  if (loading) return <section className="radio-channels-section">در حال بارگذاری کانال‌ها...</section>;
  if (error) return <section className="radio-channels-section">خطا: {error}</section>;
  if (channels.length === 0) return <section className="radio-channels-section">هیچ کانالی یافت نشد.</section>;

  return (
    <section className="radio-channels-section">
      <h2>کانال‌های رادیو غبار</h2>
      <div className="channel-grid">
        {channels.map((channel) => (
          <div className="channel-card" key={channel.id}>
            <img
              src={channel.image || '/assets/images/channel_placeholder.png'} // Assuming channel.image field exists
              alt={channel.title || 'Channel Image'}
            />
            <div className="card-details">
              <h3>{channel.title}</h3>
              <p>{channel.description || 'توضیح کوتاه...'}</p>
              {/* Assuming status and points are fields in your channel API response */}
              <p>
                وضعیت:{' '}
                <span className={channel.is_public ? 'channel-status public' : 'channel-status private'}>
                  {channel.is_public ? 'عمومی' : 'خصوصی'}
                </span>{' '}
                - امتیاز:{' '}
                <span className={channel.points_to_post_needed > 0 ? 'loyalty-points-req locked' : 'loyalty-points-req'}>
                    {channel.points_to_post_needed ? `${channel.points_to_post_needed} امتیاز` : 'بدون امتیاز'}
                </span>
              </p>
            </div>
            <button className="action-btn view-channel-btn">
              مشاهده کانال
            </button>
          </div>
        ))}
      </div>
      <div className="channel-view-all">
        <a href="/ghobar_club.html" className="cta-button">
          مشاهده تمامی کانال‌ها
        </a>
      </div>
    </section>
  );
}