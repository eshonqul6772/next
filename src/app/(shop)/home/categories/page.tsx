'use client';

import { Container, Title, Text, SimpleGrid, Skeleton } from '@mantine/core';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';
import { useShopLanguage } from '@/shared/hooks/useShopLanguage';
import { usePublicCategories } from '@/entities/category';
import { QueryEmpty, QueryError } from '@/shared/ui/QueryState';

const CategoriesPage = () => {
  const { language } = useShopLanguage();
  const { data: categories, isLoading, isError, refetch } = usePublicCategories({ language });

  return (
    <div className="py-16 bg-gradient-to-b from-emerald-50/30 to-white min-h-screen">
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
              <Leaf size={24} className="text-white" />
            </div>
          </div>
          <Text c="emerald" fw={600} size="sm" mb="xs" className="uppercase tracking-wider">
            Kolleksiya
          </Text>
          <Title order={1} size="2.5rem" mb="sm">Kategoriyalar</Title>
          <Text c="dimmed" size="lg" maw={500} mx="auto">
            O'zingizga yoqqan toifani tanlang va go'zal o'simliklar dunyosiga sho'ng'ing
          </Text>
        </div>

        {isError ? (
          <QueryError onRetry={refetch} />
        ) : isLoading ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} height={320} radius="xl" />
            ))}
          </SimpleGrid>
        ) : categories.length === 0 ? (
          <QueryEmpty
            title="Kategoriyalar topilmadi"
            description="Tez orada yangi kategoriyalar qo'shiladi"
          />
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/home/categories/${category.slug}`}
                className="group no-underline"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-500 border border-emerald-100 h-[320px]">
                  {/* Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${category.imageUrl || 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400'})`
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 via-emerald-900/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-bold text-xl mb-2 group-hover:text-emerald-200 transition-colors">
                          {category.name}
                        </h3>
                        <span className="text-emerald-300 text-sm font-medium">
                          {category.flowerCount} ta o'simlik
                        </span>
                        {category.description && (
                          <p className="text-emerald-100/80 text-sm mt-2 line-clamp-2">
                            {category.description}
                          </p>
                        )}
                      </div>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-300 flex-shrink-0 ml-4">
                        <ArrowRight size={20} className="text-white group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Leaf size={20} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </div>
  );
};

export default CategoriesPage;
