'use client';

import { Container, Title, Text, SimpleGrid, Skeleton, Button } from '@mantine/core';
import Link from 'next/link';
import { ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';
import { useShopLanguage } from '@/shared/hooks/useShopLanguage';
import { formatPrice } from '@/shared/lib/formatPrice';
import { usePublicFlowers } from '@/entities/flower';
import { QueryError } from '@/shared/ui/QueryState';

export const FeaturedFlowers = () => {
  const { language } = useShopLanguage();
  const { items: flowers, isLoading, isError, refetch } = usePublicFlowers({ language, featured: true, limit: 8 });

  return (
    <section className="py-20">
      <Container size="xl">
        <div className="text-center mb-14">
          <Text c="emerald" fw={600} size="sm" mb="xs" className="uppercase tracking-wider">
            Tanlangan
          </Text>
          <Title order={2} size="2.5rem" mb="sm">Mashhur o'simliklar</Title>
          <Text c="dimmed" size="lg" maw={500} mx="auto">
            Eng ko'p sotilgan va mijozlar tomonidan sevimli o'simliklar
          </Text>
        </div>

        {isError ? (
          <QueryError onRetry={refetch} />
        ) : isLoading ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} height={400} radius="xl" />
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
            {flowers.map((flower) => (
              <div
                key={flower.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <Link href={`/home/plants/${flower.slug}`}>
                    <div
                      className="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${flower.imageUrl || 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400'})`
                      }}
                    />
                  </Link>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {flower.isNew && (
                      <span className="bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                        <Sparkles size={12} /> Yangi
                      </span>
                    )}
                    {flower.oldPrice && (
                      <span className="bg-rose-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                        -{Math.round((1 - flower.price / flower.oldPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Quick add button */}
                  <button className="absolute bottom-3 right-3 w-11 h-11 bg-white shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-500 hover:text-white">
                    <ShoppingCart size={18} />
                  </button>
                </div>

                <div className="p-5">
                  <Link
                    href={`/home/categories/${flower.category.slug}`}
                    className="text-emerald-600 text-xs font-medium hover:text-emerald-700 no-underline"
                  >
                    {flower.category.name}
                  </Link>

                  <Link href={`/home/plants/${flower.slug}`} className="no-underline block mt-2">
                    <h3 className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {flower.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-xl font-bold text-emerald-600">
                        {formatPrice(flower.price, language)}
                      </span>
                      {flower.oldPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          {formatPrice(flower.oldPrice, language)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </SimpleGrid>
        )}

        <div className="text-center mt-14">
          <Button
            component={Link}
            href="/home/plants"
            size="lg"
            variant="outline"
            color="teal"
            radius="xl"
            rightSection={<ArrowRight size={18} />}
          >
            Barcha o'simliklarni ko'rish
          </Button>
        </div>
      </Container>
    </section>
  );
};
