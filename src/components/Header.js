// src/components/Header.js
// This component implements the main navigation header of the website.
// It includes logo, navigation links, dynamic login/profile buttons,
// and a responsive hamburger menu for mobile.
'use client';

import { useEffect, useState, useRef } from 'react'; // Import useRef for direct DOM interaction
import Link from 'next/link'; // For client-side navigation
import Image from 'next/image'; // For optimized image loading
import { useRouter, usePathname } from 'next/navigation'; // For routing and active links

export default function HeaderComponent() { // Renamed from Header to avoid potential conflicts
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage user login status
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu open/close

  const router = useRouter(); // Next.js router instance
  const pathname = usePathname(); // Current path for active link styling

  // Refs for direct DOM access to hamburger button and main navigation
  const hamburgerRef = useRef(null);
  const mainNavRef = useRef(null);
  const headerRef = useRef(null); // Ref for the whole header for click outside detection

  // Effect to manage initial login state from localStorage
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
    // For testing logged-in state, uncomment the line below:
    // localStorage.setItem('isLoggedIn', 'true'); // Temporarily set login state for testing
    // setIsLoggedIn(true); // Uncomment this line to test logged-in state
  }, []);

  // Function to toggle mobile menu open/close state
  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      const newState = !prev;
      // Add/remove 'no-scroll' class to body to prevent background scrolling
      if (newState) {
        document.body.classList.add('no-scroll');
        // Add 'active' class to hamburger and main-nav for styling
        hamburgerRef.current?.classList.add('active');
        mainNavRef.current?.classList.add('active');
      } else {
        document.body.classList.remove('no-scroll');
        // Remove 'active' class
        hamburgerRef.current?.classList.remove('active');
        mainNavRef.current?.classList.remove('active');
      }
      return newState;
    });
  };

  // Function to close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('no-scroll');
    hamburgerRef.current?.classList.remove('active');
    mainNavRef.current?.classList.remove('active');
  };

  // Effect to handle closing mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If menu is open and click is outside the header/navbar
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    // Add event listener when component mounts or menu state changes
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup: Remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]); // Dependency array: re-run effect if isMenuOpen changes

  // Handler for authentication button clicks (Login/Signup/Profile)
  const handleAuthClick = (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    closeMenu(); // Close mobile menu upon navigation
    if (isLoggedIn) {
      router.push('/profile'); // FIX: Removed .html suffix
    } else {
      router.push('/login'); // FIX: Removed .html suffix (assuming /login for auth page)
    }
  };

  // Helper function to check if a link is active
  const isLinkActive = (href) => {
    // For root path, exact match is needed. For others, startsWith is fine.
    if (href === '/') {
        return pathname === '/';
    }
    return pathname.startsWith(href);
  };


  return (
    <header className="main-header" ref={headerRef}> {/* Attach ref to the main header */}
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
            {isLoggedIn ? 'پروفایل' : 'ورود / ثبت‌نام'}
          </button>
          {/* Hamburger Menu Icon */}
          <div className="hamburger-menu" id="hamburger-icon" ref={hamburgerRef} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Main Navigation Menu (Desktop: always visible, Mobile: slides out) */}
        <nav className="main-nav" id="main-nav-links" ref={mainNavRef}>
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

            {/* Profile link - Appears inside mobile menu if logged in */}
            {isLoggedIn && (
              <li className="mobile-menu-item-profile">
                <Link href="/profile" onClick={closeMenu} className={isLinkActive('/profile') ? 'active-link' : ''}>پروفایل</Link>
              </li>
            )}

            {/* Login/Signup button - Appears inside mobile menu if not logged in */}
            {!isLoggedIn && (
              <li className="mobile-menu-btn-wrapper">
                <button className="login-signup-btn mobile-menu-btn" onClick={handleAuthClick}>
                  ورود/ثبت نام
                </button>
              </li>
            )}
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