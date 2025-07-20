// src/app/layout.js
import './globals.css'; 
import HeaderComponent from '@/components/Header'; // Import the renamed Header component
import FooterComponent from '@/components/Footer'; // Import the renamed Footer component

export const metadata = {
  title: 'رادیو غبار',
  description: 'پادکست‌های رادیو غبار',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <HeaderComponent /> {/* Render the Header component */}
        {children} {/* This is where your page content (Home, Episodes, etc.) will be rendered */}
        <FooterComponent /> {/* Render the Footer component after the children */}
      </body>
    </html>
  );
}