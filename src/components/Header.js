'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Mock login state for demonstration
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
    // For testing logged-in state, you can temporarily set:
    // localStorage.setItem('isLoggedIn', 'true');
    // setIsLoggedIn(true); // Uncomment this line to test logged-in state

    const hamburgerIcon = document.getElementById('hamburger-icon');
    const mainNav = document.getElementById('main-nav-links');

    const toggleMenu = () => {
      hamburgerIcon.classList.toggle('active');
      mainNav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    };

    const closeMenuOnOutsideClick = (event) => {
      if (!mainNav.contains(event.target) && !hamburgerIcon.contains(event.target)) {
        hamburgerIcon.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    };

    hamburgerIcon.addEventListener('click', toggleMenu);
    document.addEventListener('click', closeMenuOnOutsideClick);

    return () => {
      hamburgerIcon.removeEventListener('click', toggleMenu);
      document.removeEventListener('click', closeMenuOnOutsideClick);
    };
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      router.push('/profile.html'); // Navigate to profile page
    } else {
      router.push('/auth.html'); // Navigate to login/signup page
    }
  };

  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <a href="/">
            <img src="/assets/images/logo.png" alt="Radyo Ghobar Logo" />
          </a>
        </div>

        <div className="header-icons">
          {/* This button is hidden on mobile via CSS in globals.css */}
          <button className="login-signup-btn mobile-header-btn" onClick={handleAuthClick}>
            {isLoggedIn ? 'پروفایل' : 'ورود / ثبت‌نام'}
          </button>
          <div className="hamburger-menu" id="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <nav className="main-nav" id="main-nav-links">
          <ul>
            <li>
              <a href="/" className={pathname === '/' ? 'active-link' : ''}>
                خانه
              </a>
            </li>
            <li>
              <a href="/episodes.html" className={pathname === '/episodes.html' ? 'active-link' : ''}>
                اپیزودها
              </a>
            </li>
            <li>
              <a href="/shop.html" className={pathname === '/shop.html' ? 'active-link' : ''}>
                فروشگاه
              </a>
            </li>
            <li>
              <a href="/ghobar_club.html" className={pathname === '/ghobar_club.html' ? 'active-link' : ''}>
                غبار کلاب
              </a>
            </li>
            <li>
              <a href="/support.html" className={pathname === '/support.html' ? 'active-link' : ''}>
                حمایت
              </a>
            </li>
            <li>
              <a href="/about_us.html" className={pathname === '/about_us.html' ? 'active-link' : ''}>
                درباره ما
              </a>
            </li>
            <li className="mobile-menu-btn-wrapper">
              <button className="login-signup-btn mobile-menu-btn" onClick={handleAuthClick}>
                {isLoggedIn ? 'پروفایل' : 'ورود / ثبت‌نام'}
              </button>
            </li>
          </ul>
        </nav>

        <button className="login-signup-btn desktop-header-btn" onClick={handleAuthClick}>
          {isLoggedIn ? 'پروفایل' : 'ورود / ثبت‌نام'}
        </button>
      </div>
    </header>
  );
}