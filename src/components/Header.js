// src/components/Header.js
// This component implements the main navigation header of the website.
// It includes logo, navigation links, dynamic login/profile buttons,
// and a responsive hamburger menu for mobile.
'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function HeaderComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const hamburgerRef = useRef(null);
  const mainNavRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
    // For testing logged-in state, uncomment the line below:
    // localStorage.setItem('isLoggedIn', 'true');
    // setIsLoggedIn(true); // Uncomment this line to test logged-in state
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      const newState = !prev;
      if (newState) {
        document.body.classList.add('no-scroll');
        hamburgerRef.current?.classList.add('active');
        mainNavRef.current?.classList.add('active');
      } else {
        document.body.classList.remove('no-scroll');
        hamburgerRef.current?.classList.remove('active');
        mainNavRef.current?.classList.remove('active');
      }
      return newState;
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('no-scroll');
    hamburgerRef.current?.classList.remove('active');
    mainNavRef.current?.classList.remove('active');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleAuthClick = (event) => {
    event.preventDefault();
    closeMenu();
    if (isLoggedIn) {
      router.push('/profile');
    } else {
      router.push('/auth');
    }
  };

  const isLinkActive = (href) => {
    if (href === '/') {
        return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="main-header" ref={headerRef}>
      <div className="container">
        {/* Logo Section */}
        <div className="logo">
          <Link href="/" onClick={closeMenu}>
            <Image src="/assets/images/logo.png" alt="Radyo Ghobar Logo" width={120} height={40} priority />
          </Link>
        </div>

        {/* Header Icons Section (Mobile-specific: Login/Signup button and Hamburger) */}
        <div className="header-icons">
          {/* Mobile header Login/Signup/Profile button */}
          <button className="login-signup-btn mobile-header-btn" onClick={handleAuthClick}>
            {isLoggedIn ? 'پروفایل' : 'ورود/ثبت نام'}
          </button>
          {/* Hamburger Menu Icon */}
          <div className="hamburger-menu" id="hamburger-icon" ref={hamburgerRef} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Main Navigation Menu (Desktop: always visible, Mobile: slides out) */}
        <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`} id="main-nav-links" ref={mainNavRef}>
          <ul>
            <li>
              <Link href="/" className={isLinkActive('/') ? 'active-link' : ''} onClick={closeMenu}>خانه</Link>
            </li>
            <li>
              <Link href="/episodes" className={isLinkActive('/episodes') ? 'active-link' : ''} onClick={closeMenu}>اپیزودها</Link>
            </li>
            <li>
              <Link href="/shop" className={isLinkActive('/shop') ? 'active-link' : ''} onClick={closeMenu}>فروشگاه</Link>
            </li>
            <li>
              <Link href="/ghobar_club" className={isLinkActive('/ghobar_club') ? 'active-link' : ''} onClick={closeMenu}>غبار کلاب</Link>
            </li>
            <li>
              <Link href="/support" className={isLinkActive('/support') ? 'active-link' : ''} onClick={closeMenu}>حمایت</Link>
            </li>
            <li>
              <Link href="/about" className={isLinkActive('/about') ? 'active-link' : ''} onClick={closeMenu}>درباره ما</Link>
            </li>

            {/* REMOVED: The separate 'پروفایل' li element.
                The mobile-menu-btn-wrapper below handles all auth/profile navigation dynamically. */}

            {/* Mobile menu Login/Signup/Profile button (always appears at the bottom of the mobile menu) */}
            <li className="mobile-menu-btn-wrapper">
              <button className="login-signup-btn mobile-menu-btn" onClick={handleAuthClick}>
                {isLoggedIn ? 'پروفایل' : 'ورود/ثبت نام'}
              </button>
            </li>
          </ul>
        </nav>

        {/* Desktop Login/Signup/Profile button (only visible on desktop) */}
        <button className="login-signup-btn desktop-header-btn" onClick={handleAuthClick}>
          {isLoggedIn ? 'پروفایل' : 'ورود / ثبت‌نام'}
        </button>
      </div>
    </header>
  );
}