// RadioChannelsSection.js
import React from "react";
export default function RadioChannelsSection() {
  return (
    <section className="radio-channels-section">
      <h2>کانال‌های رادیو غبار</h2>
      <div className="channel-grid">
        {[1, 2, 3].map((num) => (
          <div className="channel-card" key={num}>
            <img
              src="/assets/images/channel_placeholder.png"
              alt={`کانال ${num}`}
            />
            <h3>عنوان کانال {num}</h3>
            <p>توضیح کوتاه...</p>
            <p>وضعیت: عمومی - امتیاز: ۵۰</p>
            <button
              className="action-btn view-channel-btn"
            >
              مشاهده کانال
            </button>
          </div>
        ))}
      </div>
      {/* Correct wrapper added and cta-button class added */}
      <div className="channel-view-all"> {/* Correct wrapper class */}
        <a href="/ghobar_club.html" className="cta-button"> {/* Correct href and cta-button class for yellow */}
          مشاهده تمامی کانال‌ها
        </a>
      </div>
    </section>
  );
}