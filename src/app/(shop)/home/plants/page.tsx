'use client';

import { useState } from 'react';
import { Container, Title, Text, SimpleGrid, Skeleton, Pagination, Select } from '@mantine/core';
import Link from 'next/link';
import { ShoppingCart, Sparkles, Filter, Leaf } from 'lucide-react';
import { useShopLanguage } from '@/shared/hooks/useShopLanguage';
import { formatPrice } from '@/shared/lib/formatPrice';
import { usePublicCategories } from '@/entities/category';
import { usePublicFlowers } from '@/entities/flower';
import { QueryEmpty, QueryError } from '@/shared/ui/QueryState';

const PlantsPage = () => {
  const { language } = useShopLanguage();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories } = usePublicCategories({ language });
  const { items: plants, meta, isLoading, isError, refetch } = usePublicFlowers({
    language,
    page,
    limit: 12,
    category: selectedCategory
  });
  const totalPages = meta.totalPages || 1;

  return (
    <div className="py-16 bg-gradient-to-b from-emerald-50/30 to-white min-h-screen">
      <Container size="xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                <Leaf size={20} className="text-white" />
              </div>
              <Text c="emerald" fw={600} size="sm" className="uppercase tracking-wider">
                Kolleksiya
              </Text>
            </div>
            <Title order={1} size="2.5rem" mb="xs">O'simliklar</Title>
            <Text c="dimmed" size="lg">
              Barcha o'simliklarimiz to'plami
            </Text>
          </div>

          <div className="flex items-center gap-3">
            <Filter size={18} className="text-gray-400" />
            <Select
              placeholder="Kategoriya tanlang"
              data={[
                { value: '', label: 'Barchasi' },
                ...categories.map((c) => ({ value: c.slug, label: c.name }))
              ]}
              value={selectedCategory || ''}
              onChange={(value) => {
                setSelectedCategory(value || null);
                setPage(1);
              }}
              clearable
              w={220}
              radius="lg"
              size="md"
              styles={{
                input: { borderColor: '#d1fae5' }
              }}
            />
          </div>
        </div>

        {isError ? (
          <QueryError onRetry={refetch} />
        ) : isLoading ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} height={380} radius="xl" />
            ))}
          </SimpleGrid>
        ) : plants.length === 0 ? (
          <QueryEmpty
            title="O'simliklar topilmadi"
            description="Boshqa kategoriyani tanlang yoki filtrni tozalang"
          />
        ) : (
          <>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
              {plants.map((plant) => (
                <div
                  key={plant.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <Link href={`/home/plants/${plant.slug}`}>
                      <div
                        className="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${plant.imageUrl || 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400'})`
                        }}
                      />
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {plant.isNew && (
                        <span className="bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                          <Sparkles size={12} /> Yangi
                        </span>
                      )}
                      {plant.oldPrice && (
                        <span className="bg-rose-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                          -{Math.round((1 - plant.price / plant.oldPrice) * 100)}%
                        </span>
                      )}
                    </div>

                    {!plant.inStock && (
                      <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                        <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium">
                          Tugagan
                        </span>
                      </div>
                    )}

                    {/* Quick add button */}
                    <button
                      className="absolute bottom-3 right-3 w-11 h-11 bg-white shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-500 hover:text-white disabled:opacity-50"
                      disabled={!plant.inStock}
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>

                  <div className="p-5">
                    <Link
                      href={`/home/categories/${plant.category.slug}`}
                      className="text-emerald-600 text-xs font-medium hover:text-emerald-700 no-underline"
                    >
                      {plant.category.name}
                    </Link>

                    <Link href={`/home/plants/${plant.slug}`} className="no-underline block mt-2">
                      <h3 className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
                        {plant.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="text-xl font-bold text-emerald-600">
                          {formatPrice(plant.price, language)}
                        </span>
                        {plant.oldPrice && (
                          <span className="text-sm text-gray-400 line-through ml-2">
                            {formatPrice(plant.oldPrice, language)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </SimpleGrid>

            {totalPages > 1 && (
              <div className="flex justify-center mt-14">
                <Pagination
                  total={totalPages}
                  value={page}
                  onChange={setPage}
                  color="teal"
                  size="lg"
                  radius="xl"
                />
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default PlantsPage;
