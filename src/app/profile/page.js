// src/app/profile/page.js
'use client'; // This component uses client-side interactivity (useState, useEffect)

import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../styles/profile.css';
export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState('view-profile'); // Default active section

  // Effect to handle initial active link and section on mount
  useEffect(() => {
    // This is optional if you want a specific section to be active on initial load
    // The default state ('view-profile') already handles this
    // If you need to read from URL hash, that would require more logic
  }, []);

  const handleNavLinkClick = (e, sectionId) => {
    e.preventDefault(); // Prevent default anchor behavior (page jump)
    setActiveSection(sectionId);
  };

  return (
    <>
      <main className="profile-page-main">
        <div className="container profile-layout">
          <aside className="profile-sidebar">
            <nav className="profile-nav">
              <ul>
                <li>
                  <Link
                    href="#view-profile"
                    className={activeSection === 'view-profile' ? 'active' : ''}
                    onClick={(e) => handleNavLinkClick(e, 'view-profile')}
                  >
                    مشاهده پروفایل
                  </Link>
                </li>
                <li>
                  <Link
                    href="#my-posts"
                    className={activeSection === 'my-posts' ? 'active' : ''}
                    onClick={(e) => handleNavLinkClick(e, 'my-posts')}
                  >
                    پست‌های من
                  </Link>
                </li>
                <li>
                  <Link
                    href="#my-playlists"
                    className={activeSection === 'my-playlists' ? 'active' : ''}
                    onClick={(e) => handleNavLinkClick(e, 'my-playlists')}
                  >
                    لیست‌های پخش من
                  </Link>
                </li>
                <li>
                  <Link
                    href="#friends"
                    className={activeSection === 'friends' ? 'active' : ''}
                    onClick={(e) => handleNavLinkClick(e, 'friends')}
                  >
                    دوستان
                  </Link>
                </li>
                <li>
                  <Link
                    href="#messages"
                    className={activeSection === 'messages' ? 'active' : ''}
                    onClick={(e) => handleNavLinkClick(e, 'messages')}
                  >
                    پیام‌ها
                  </Link>
                </li>
                <li>
                  <Link
                    href="#my-orders"
                    className={activeSection === 'my-orders' ? 'active' : ''}
                    onClick={(e) => handleNavLinkClick(e, 'my-orders')}
                  >
                    سفارشات من
                  </Link>
                </li>
                <li>
                  <Link
                    href="#loyalty-points"
                    className={activeSection === 'loyalty-points' ? 'active' : ''}
                    onClick={(e) => handleNavLinkClick(e, 'loyalty-points')}
                  >
                    امتیازات وفاداری
                  </Link>
                </li>
                <li>
                  <Link
                    href="#settings"
                    className={activeSection === 'settings' ? 'active' : ''}
                    onClick={(e) => handleNavLinkClick(e, 'settings')}
                  >
                    تنظیمات
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          <section className="profile-content">
            <div className="profile-header-banner">
              <div className="profile-avatar-container">
                <img src="https://via.placeholder.com/150x150/000000/FFC107?text=Artist" alt="تصویر پروفایل" className="profile-avatar" />
                <div className="upload-overlay">
                  <span>+</span>
                </div>
              </div>
              <div className="profile-info">
                <h2 className="profile-username">@username</h2>
                <p className="profile-name">نام کاربر نام خانوادگی</p>
                <p className="profile-bio-short">موسیقی‌دان و هنرمند، عاشق صدای رادیو غبار.</p>
                <div className="profile-stats">
                  <span>دوستان: 120</span>
                  <span>دنبال‌کنندگان: 50</span>
                </div>
                <button className="edit-profile-btn cta-button">ویرایش پروفایل</button>
              </div>
            </div>

            <div id="view-profile" className={`profile-section ${activeSection === 'view-profile' ? 'active-section' : ''}`}>
              <h3>اطلاعات پروفایل</h3>
              <div className="info-item">
                <span>نام کاربری:</span>
                <span>@username</span>
              </div>
              <div className="info-item">
                <span>ایمیل:</span>
                <span>user.email@example.com</span>
              </div>
              <div className="info-item">
                <span>شماره تلفن:</span>
                <span>+98 912 345 6789</span>
              </div>
              <div className="info-item">
                <span>تاریخ تولد:</span>
                <span>۱۳۷۰/۰۵/۲۴</span>
              </div>
              <div className="info-item bio-item">
                <span>بیوگرافی:</span>
                <p>من یک هنرمند دیجیتال هستم که به دنبال الهام از صداها و فرهنگ‌های مختلف می‌گردم. رادیو غبار منبع بی‌نظیری برای کشف موسیقی‌های جدید و هنرمندان مستقل است. اینجا هستم تا تجربیاتم را به اشتراک بگذارم و با جامعه ارتباط برقرار کنم.</p>
              </div>
            </div>

            <div id="my-posts" className={`profile-section ${activeSection === 'my-posts' ? 'active-section' : ''}`}>
              <h3>پست‌های من</h3>
              <p>در این قسمت پست‌های شما نمایش داده خواهد شد.</p>
            </div>
            <div id="my-playlists" className={`profile-section ${activeSection === 'my-playlists' ? 'active-section' : ''}`}>
              <h3>لیست‌های پخش من</h3>
              <p>در این قسمت لیست‌های پخش شما نمایش داده خواهد شد.</p>
            </div>
            <div id="friends" className={`profile-section ${activeSection === 'friends' ? 'active-section' : ''}`}>
              <h3>دوستان</h3>
              <p>در این قسمت لیست دوستان و درخواست‌های دوستی نمایش داده خواهد شد.</p>
            </div>
            <div id="messages" className={`profile-section ${activeSection === 'messages' ? 'active-section' : ''}`}>
              <h3>پیام‌ها</h3>
              <p>در این قسمت پیام‌های شما نمایش داده خواهد شد.</p>
            </div>
            <div id="my-orders" className={`profile-section ${activeSection === 'my-orders' ? 'active-section' : ''}`}>
              <h3>سفارشات من</h3>
              <p>در این قسمت تاریخچه سفارشات شما نمایش داده خواهد شد.</p>
            </div>
            <div id="loyalty-points" className={`profile-section ${activeSection === 'loyalty-points' ? 'active-section' : ''}`}>
              <h3>امتیازات وفاداری</h3>
              <div className="loyalty-info">
                <p className="current-points">امتیاز شما: <span className="points-value">150</span></p>
                <p className="points-earn-text">با خرید، کامنت‌گذاری، و تعامل با جامعه امتیاز کسب کنید.</p>
              </div>
            </div>

            <div id="settings" className={`profile-section ${activeSection === 'settings' ? 'active-section' : ''}`}>
              <h3>تنظیمات حساب</h3>
              <div className="setting-block">
                <h4>تغییر رمز عبور</h4>
                <form className="setting-form">
                  <div className="form-group">
                    <label htmlFor="current-password">رمز عبور فعلی:</label>
                    <input type="password" id="current-password" placeholder="رمز عبور فعلی خود را وارد کنید" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="new-password">رمز عبور جدید:</label>
                    <input type="password" id="new-password" placeholder="رمز عبور جدید" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm-password">تکرار رمز عبور جدید:</label>
                    <input type="password" id="confirm-password" placeholder="تکرار رمز عبور جدید" />
                  </div>
                  <button type="submit" className="submit-btn cta-button">تغییر رمز عبور</button>
                </form>
              </div>

              <div className="setting-block">
                <h4>تغییر شماره تلفن</h4>
                <form className="setting-form">
                  <div className="form-group">
                    <label htmlFor="new-phone">شماره تلفن جدید:</label>
                    <input type="tel" id="new-phone" placeholder="شماره تلفن جدید خود را وارد کنید" />
                  </div>
                  <button type="submit" className="submit-btn cta-button">تغییر شماره تلفن</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}