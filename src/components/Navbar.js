// src/components/Navbar.js
// English comments will be used as requested.
'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; // Importing Image component from Next.js
import { usePathname } from 'next/navigation'; // Importing usePathname for active links

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // PLACEHOLDER: User login status. Replace with actual authentication state later.
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to true/false for testing dynamic buttons

  const navbarRef = useRef(null); // Ref to the main header element for click outside detection
  const pathname = usePathname(); // Current route path for active link styling

  // Function to toggle mobile menu open/close state
  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      const newState = !prev;
      // Add/remove 'no-scroll' class to body to prevent background scrolling when menu is open
      if (newState) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
      return newState;
    });
  };

  // Function to close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('no-scroll');
  };

  // Effect to handle closing mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If menu is open and click is outside the navbar
      if (isMenuOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    // Add event listener when component mounts or isMenuOpen changes
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup: Remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]); // Dependency array: re-run effect if isMenuOpen changes

  return (
    <header className="main-header" ref={navbarRef}> {/* Root element from index.html */}
      <div className="container"> {/* Container for layout within header */}
        {/* Logo Section - Aligned to the right (start in RTL) */}
        <div className="logo">
          <Link href="/" onClick={closeMenu}>
            {/* Using Next.js Image component for optimized image loading */}
            {/* Ensure the path to your logo.png is correct in the public folder */}
            <Image src="/assets/images/logo.png" alt="Radyo Ghobar Logo" width={120} height={40} priority />
          </Link>
        </div>

        {/* Header Icons Section (Mobile-specific: Login/Signup button and Hamburger) */}
        <div className="header-icons">
          {/* Mobile header Login/Signup/Profile button (visible only on mobile) */}
          {isLoggedIn ? (
            <Link href="/profile" className="login-signup-btn mobile-header-btn" onClick={closeMenu}>
              پروفایل
            </Link>
          ) : (
            <Link href="/login" className="login-signup-btn mobile-header-btn" onClick={closeMenu}>
              ورود/ثبت نام
            </Link>
          )}

          {/* Hamburger Menu Icon (visible only on mobile) */}
          <div
            className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
            id="hamburger-icon" // ID from index.html, not strictly necessary for React
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span> {/* Hamburger line 1 */}
            <span></span> {/* Hamburger line 2 */}
            <span></span> {/* Hamburger line 3 */}
          </div>
        </div>

        {/* Main Navigation Menu (Desktop: always visible, Mobile: slides out) */}
        <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`} id="main-nav-links"> {/* ID from index.html */}
          <ul>
            <li><Link href="/" className={pathname === '/' ? 'active-link' : ''} onClick={closeMenu}>خانه</Link></li>
            <li><Link href="/episodes" className={pathname === '/episodes' ? 'active-link' : ''} onClick={closeMenu}>اپیزودها</Link></li>
            <li><Link href="/shop" className={pathname === '/shop' ? 'active-link' : ''} onClick={closeMenu}>فروشگاه</Link></li>
            <li><Link href="/ghobar-club" className={pathname === '/ghobar-club' ? 'active-link' : ''} onClick={closeMenu}>غبار کلاب</Link></li>
            <li><Link href="/support" className={pathname === '/support' ? 'active-link' : ''} onClick={closeMenu}>حمایت</Link></li>
            <li><Link href="/about" className={pathname === '/about' ? 'active-link' : ''} onClick={closeMenu}>درباره ما</Link></li>

            {/* Profile link - Appears inside mobile menu if logged in */}
            {isLoggedIn && (
              <li className="mobile-menu-item-profile"> {/* Custom class for specific styling */}
                <Link href="/profile" onClick={closeMenu} className={pathname === '/profile' ? 'active-link' : ''}>پروفایل</Link>
              </li>
            )}

            {/* Login/Signup button - Appears inside mobile menu if not logged in */}
            {!isLoggedIn && (
              <li className="mobile-menu-btn-wrapper"> {/* Wrapper for mobile menu button */}
                <Link href="/login" className="login-signup-btn mobile-menu-btn" onClick={closeMenu}>
                  ورود/ثبت نام
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Desktop Login/Signup/Profile button (only visible on desktop) */}
        {isLoggedIn ? (
          <Link href="/profile" className={`login-signup-btn desktop-header-btn ${pathname === '/profile' ? 'active-link' : ''}`} onClick={closeMenu}>
            پروفایل
          </Link>
        ) : (
          <Link href="/login" className={`login-signup-btn desktop-header-btn ${pathname === '/login' ? 'active-link' : ''}`} onClick={closeMenu}>
            ورود/ثبت نام
          </Link>
        )}
      </div>
    </header>
  );
}