// src/app/page.js
'use client';

import HeroSection from "@/components/HeroSection";
import LatestEpisodesSection from "@/components/LatestEpisodesSection";
import FeaturedShopSection from "@/components/FeaturedShopSection";
import RadioChannelsSection from "@/components/RadioChannelsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LatestEpisodesSection />
      <FeaturedShopSection />
      <RadioChannelsSection />
    </main>
  );
}