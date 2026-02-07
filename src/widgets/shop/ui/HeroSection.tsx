'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Container, Title, Text, Button, Skeleton } from '@mantine/core';
import { Carousel, type Embla } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { ArrowRight, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import '@mantine/carousel/styles.css';
import { useShopLanguage } from '@/shared/hooks/useShopLanguage';
import { usePublicHero } from '@/entities/hero';
import { QueryError } from '@/shared/ui/QueryState';

export const HeroSection = () => {
  const { language } = useShopLanguage();
  const { data: slides, isLoading, isError, refetch } = usePublicHero({ language });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCurrentSlide(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (embla) {
      embla.on('select', onSelect);
      onSelect();
    }
  }, [embla, onSelect]);

  if (isLoading) {
    return (
      <div className="h-[600px] bg-gradient-to-br from-emerald-50 to-teal-50">
        <Skeleton height={600} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
        <Container size="xl">
          <QueryError onRetry={refetch} />
        </Container>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div
        className="min-h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=1400)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-800/60" />
        <Container size="xl" className="relative h-full min-h-[600px] flex items-center">
          <div className="text-white max-w-2xl py-20">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Leaf size={24} className="text-emerald-300" />
              </div>
              <span className="text-emerald-300 font-medium">O'simliklar Dunyosi</span>
            </div>
            <Title order={1} size="3.5rem" mb="lg" className="leading-tight">
              Uyingizni <span className="text-emerald-300">yashil</span> dunyoga aylantiring
            </Title>
            <Text size="xl" mb="xl" className="text-emerald-100 leading-relaxed">
              Eng sifatli xona o'simliklari, professional maslahatlar va tez yetkazib berish xizmati
            </Text>
            <div className="flex gap-4">
              <Button
                component={Link}
                href="/home/plants"
                size="xl"
                className="bg-white text-emerald-700 hover:bg-emerald-50"
                radius="xl"
                rightSection={<ArrowRight size={18} />}
              >
                O'simliklarni ko'rish
              </Button>
              <Button
                component={Link}
                href="/home/contact"
                size="xl"
                variant="outline"
                className="border-white/50 text-white hover:bg-white/10"
                radius="xl"
              >
                Bog'lanish
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden hero-carousel-wrapper">
      <style jsx global>{`
        .hero-carousel-wrapper .mantine-Carousel-root {
          width: 100%;
        }
        .hero-carousel-wrapper .mantine-Carousel-viewport {
          width: 100%;
        }
        .hero-carousel-wrapper .mantine-Carousel-container {
          width: 100%;
        }
        .hero-carousel-wrapper .mantine-Carousel-slide {
          flex: 0 0 100% !important;
          min-width: 100% !important;
        }
        .hero-carousel-wrapper .mantine-Carousel-control {
          background-color: rgba(255,255,255,0.2);
          backdrop-filter: blur(4px);
          border: none;
          color: white;
          width: 48px;
          height: 48px;
        }
        .hero-carousel-wrapper .mantine-Carousel-control:hover {
          background-color: rgba(255,255,255,0.3);
        }
        .hero-carousel-wrapper .mantine-Carousel-indicator {
          width: 12px;
          height: 12px;
          background-color: rgba(255,255,255,0.4);
          border-radius: 50%;
          transition: all 0.3s;
        }
        .hero-carousel-wrapper .mantine-Carousel-indicator[data-active] {
          background-color: white;
          width: 32px;
          border-radius: 6px;
        }
        .hero-carousel-wrapper .mantine-Carousel-indicators {
          bottom: 32px;
          gap: 8px;
        }
      `}</style>

      <Carousel
        getEmblaApi={setEmbla}
        withIndicators
        withControls
        loop
        height={600}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        nextControlIcon={<ChevronRight size={24} />}
        previousControlIcon={<ChevronLeft size={24} />}
      >
        {slides.map((slide) => (
          <Carousel.Slide key={slide.id}>
            <div
              className="h-[600px] w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 via-emerald-900/60 to-transparent" />

              {/* Content */}
              <Container size="xl" className="relative h-full flex items-center">
                <div className="text-white max-w-2xl">
                  {/* Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                      <Leaf size={24} className="text-emerald-300" />
                    </div>
                    <span className="text-emerald-300 font-medium tracking-wide">O'simliklar Dunyosi</span>
                  </div>

                  {/* Title */}
                  <Title order={1} size="3.5rem" mb="lg" className="leading-tight">
                    {slide.title}
                  </Title>

                  {/* Subtitle */}
                  {slide.subtitle && (
                    <Text size="xl" mb="xl" className="text-emerald-100 leading-relaxed">
                      {slide.subtitle}
                    </Text>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-4">
                    {slide.buttonText && slide.buttonLink && (
                      <Button
                        component={Link}
                        href={slide.buttonLink}
                        size="xl"
                        className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg shadow-black/20"
                        radius="xl"
                        rightSection={<ArrowRight size={18} />}
                      >
                        {slide.buttonText}
                      </Button>
                    )}
                    <Button
                      component={Link}
                      href="/home/plants"
                      size="xl"
                      variant="outline"
                      className="border-white/50 text-white hover:bg-white/10"
                      radius="xl"
                    >
                      Barcha o'simliklar
                    </Button>
                  </div>
                </div>
              </Container>

              {/* Decorative elements */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2 text-white z-10">
        <span className="text-3xl font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="text-lg text-white/60">/</span>
        <span className="text-lg text-white/60">{String(slides.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
};
