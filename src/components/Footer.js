// src/components/Footer.js
// This component renders the main footer section of the website.
'use client'; // Required for client-side interactions if any, or for hooks

import React from 'react';
import Link from 'next/link'; // For client-side navigation
import Image from 'next/image'; // For optimized image loading
import '../styles/footer.css';

export default function FooterComponent() { // Renamed from Footer for clarity
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-logo">
          <Link href="/">
            <Image src="/assets/images/logo.png" alt="Radyo Ghobar Logo" width={100} height={40} /> {/* Adjust width/height as needed */}
          </Link>
        </div>
        <p>&copy; 2025 رادیو غبار. تمامی حقوق محفوظ است.</p>
        <div className="social-links">
          <Link href="#">فیسبوک</Link>
          <Link href="#">توییتر</Link>
          <Link href="#">اینستاگرام</Link>
          <Link href="/terms-conditions">شرایط و ضوابط</Link> {/* FIX: Removed .html suffix */}
        </div>
      </div>
    </footer>
  );
}