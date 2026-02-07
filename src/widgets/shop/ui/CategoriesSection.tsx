'use client';

import { Container, Title, Text, SimpleGrid, Skeleton } from '@mantine/core';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useShopLanguage } from '@/shared/hooks/useShopLanguage';
import { usePublicCategories } from '@/entities/category';
import { QueryError } from '@/shared/ui/QueryState';

export const CategoriesSection = () => {
  const { language } = useShopLanguage();
  const { data: categories, isLoading, isError, refetch } = usePublicCategories({ language });

  return (
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50/50">
      <Container size="xl">
        <div className="text-center mb-14">
          <Text c="emerald" fw={600} size="sm" mb="xs" className="uppercase tracking-wider">
            Kolleksiya
          </Text>
          <Title order={2} size="2.5rem" mb="sm">Kategoriyalar</Title>
          <Text c="dimmed" size="lg" maw={500} mx="auto">
            O'zingizga yoqqan toifani tanlang va go'zal o'simliklar dunyosiga sho'ng'ing
          </Text>
        </div>

        {isError ? (
          <QueryError onRetry={refetch} />
        ) : isLoading ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing="lg">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} height={280} radius="xl" />
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing="lg">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/home/categories/${category.slug}`}
                className="group no-underline"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100">
                  <div
                    className="h-44 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${category.imageUrl || 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400'})`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                        <span className="text-emerald-200 text-sm">{category.flowerCount} ta o'simlik</span>
                      </div>
                      <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                        <ArrowRight size={18} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </section>
  );
};
