'use client';

import { HeroSection } from '@/widgets/shop/ui/HeroSection';
import { CategoriesSection } from '@/widgets/shop/ui/CategoriesSection';
import { FeaturedFlowers } from '@/widgets/shop/ui/FeaturedFlowers';
import { ContactSection } from '@/widgets/shop/ui/ContactSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedFlowers />
      <ContactSection />
    </>
  );
};

export default HomePage;
