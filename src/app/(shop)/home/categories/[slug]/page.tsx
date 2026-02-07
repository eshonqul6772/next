'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Anchor, Breadcrumbs, Button, Container, SimpleGrid, Skeleton, Text, Title } from '@mantine/core';
import { ArrowLeft, Leaf, ShoppingCart, Sparkles } from 'lucide-react';

import { useShopLanguage } from '@/shared/hooks/useShopLanguage';
import { formatPrice } from '@/shared/lib/formatPrice';
import { usePublicCategory } from '@/entities/category';
import { QueryError } from '@/shared/ui/QueryState';

const CategoryPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { language } = useShopLanguage();
  const { data: category, isLoading, isError, refetch } = usePublicCategory({ slug, language });

  const breadcrumbItems = [
    { title: 'Bosh sahifa', href: '/home' },
    { title: 'Kategoriyalar', href: '/home/categories' },
    { title: category?.name || '...', href: '#' }
  ];

  if (isError) {
    return (
      <div className="py-16 bg-gradient-to-b from-emerald-50/30 to-white min-h-screen">
        <Container size="xl">
          <QueryError onRetry={refetch} />
        </Container>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-16 bg-gradient-to-b from-emerald-50/30 to-white min-h-screen">
        <Container size="xl">
          <Skeleton height={40} mb="xl" w="40%" />
          <Skeleton height={24} mb="xl" w="60%" />
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Skeleton key={i} height={380} radius="xl" />
            ))}
          </SimpleGrid>
        </Container>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="py-20 text-center min-h-screen bg-gradient-to-b from-emerald-50/30 to-white">
        <Container size="xl">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf size={48} className="text-emerald-400" />
          </div>
          <Title order={2} mb="md">
            Kategoriya topilmadi
          </Title>
          <Text c="dimmed" mb="xl">
            Kechirasiz, siz qidirayotgan kategoriya mavjud emas
          </Text>
          <Button
            component={Link}
            href="/home/categories"
            color="teal"
            radius="xl"
            size="lg"
            leftSection={<ArrowLeft size={18} />}
          >
            Kategoriyalarga qaytish
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-b from-emerald-50/30 to-white min-h-screen">
      <Container size="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs mb="xl" separator="→">
          {breadcrumbItems.map((item, index) => (
            <Anchor
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              component={Link}
              href={item.href}
              c={index === breadcrumbItems.length - 1 ? 'teal' : 'dimmed'}
              size="sm"
            >
              {item.title}
            </Anchor>
          ))}
        </Breadcrumbs>

        {/* Category Header */}
        <div className="relative rounded-3xl overflow-hidden mb-12 h-64">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${category.imageUrl || 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200'})`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/70" />
          <div className="relative h-full flex items-center p-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                  <Leaf size={24} className="text-emerald-300" />
                </div>
                <Text c="emerald.3" fw={500} size="sm" className="uppercase tracking-wider">
                  Kategoriya
                </Text>
              </div>
              <Title order={1} c="white" size="2.5rem" mb="sm">
                {category.name}
              </Title>
              {category.description && (
                <Text c="emerald.1" size="lg" maw={600}>
                  {category.description}
                </Text>
              )}
              <Text c="emerald.3" mt="md" fw={500}>
                {category.flowers.length} ta o'simlik
              </Text>
            </div>
          </div>
        </div>

        {/* Plants Grid */}
        {category.flowers.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf size={40} className="text-emerald-400" />
            </div>
            <Title order={3} c="dimmed" mb="sm">
              Bu kategoriyada hozircha o'simliklar yo'q
            </Title>
            <Text c="dimmed" mb="xl">
              Tez orada yangi o'simliklar qo'shiladi
            </Text>
            <Button component={Link} href="/home/plants" color="teal" radius="xl" size="lg">
              Barcha o'simliklarni ko'rish
            </Button>
          </div>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="xl">
            {category.flowers.map(plant => (
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
                      <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium">Tugagan</span>
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
                  <Link href={`/home/plants/${plant.slug}`} className="no-underline block">
                    <h3 className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {plant.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-xl font-bold text-emerald-600">{formatPrice(plant.price, language)}</span>
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
        )}
      </Container>
    </div>
  );
};

export default CategoryPage;
