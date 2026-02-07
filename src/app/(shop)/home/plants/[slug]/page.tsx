'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Title, Text, Grid, Badge, Button, Group, Breadcrumbs, Anchor, Skeleton } from '@mantine/core';
import Link from 'next/link';
import { ShoppingCart, Phone, Truck, Shield, Leaf, Droplets, Sun, Sparkles } from 'lucide-react';
import { useShopLanguage } from '@/shared/hooks/useShopLanguage';
import { formatPrice } from '@/shared/lib/formatPrice';
import { usePublicFlower } from '@/entities/flower';
import { QueryError } from '@/shared/ui/QueryState';

const PlantDetailPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { language } = useShopLanguage();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { data: plant, isLoading, isError, refetch } = usePublicFlower({ slug, language });

  useEffect(() => {
    if (plant?.imageUrl) {
      setSelectedImage(plant.imageUrl);
    }
  }, [plant?.imageUrl]);

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
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Skeleton height={500} radius="xl" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Skeleton height={40} mb="lg" />
              <Skeleton height={24} mb="md" w="60%" />
              <Skeleton height={100} mb="xl" />
              <Skeleton height={60} mb="lg" />
              <Skeleton height={50} w="70%" />
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="py-20 text-center min-h-screen bg-gradient-to-b from-emerald-50/30 to-white">
        <Container size="xl">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf size={48} className="text-emerald-400" />
          </div>
          <Title order={2} mb="md">O'simlik topilmadi</Title>
          <Text c="dimmed" mb="xl">Kechirasiz, siz qidirayotgan o'simlik mavjud emas</Text>
          <Button component={Link} href="/home/plants" color="teal" radius="xl" size="lg">
            Barcha o'simliklarga qaytish
          </Button>
        </Container>
      </div>
    );
  }

  const breadcrumbItems = [
    { title: 'Bosh sahifa', href: '/home' },
    { title: plant.category.name, href: `/home/categories/${plant.category.slug}` },
    { title: plant.name, href: '#' }
  ];

  const allImages = [plant.imageUrl, ...plant.images].filter(Boolean) as string[];

  return (
    <div className="py-16 bg-gradient-to-b from-emerald-50/30 to-white min-h-screen">
      <Container size="xl">
        <Breadcrumbs mb="xl" separator="→">
          {breadcrumbItems.map((item, index) => (
            <Anchor
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

        <Grid gutter={50}>
          {/* Image Gallery */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div className="sticky top-24">
              <div className="relative rounded-3xl overflow-hidden bg-emerald-50 border border-emerald-100">
                <img
                  src={selectedImage || 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600'}
                  alt={plant.name}
                  className="w-full h-[500px] object-cover"
                />
                {plant.isNew && (
                  <span className="absolute top-4 left-4 bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2">
                    <Sparkles size={16} /> Yangi
                  </span>
                )}
                {plant.oldPrice && (
                  <span className="absolute top-4 right-4 bg-rose-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                    -{Math.round((1 - plant.price / plant.oldPrice) * 100)}%
                  </span>
                )}
              </div>

              {allImages.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === img
                          ? 'border-emerald-500 ring-2 ring-emerald-200'
                          : 'border-transparent hover:border-emerald-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Grid.Col>

          {/* Product Info */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div className="flex gap-2 mb-4">
              {!plant.inStock && (
                <Badge color="gray" size="lg" radius="md">Tugagan</Badge>
              )}
            </div>

            <Link
              href={`/home/categories/${plant.category.slug}`}
              className="text-emerald-600 text-sm font-medium hover:text-emerald-700 no-underline"
            >
              {plant.category.name}
            </Link>

            <Title order={1} size="2.5rem" mt="xs" mb="lg">{plant.name}</Title>

            {plant.description && (
              <Text size="lg" c="dimmed" mb="xl" className="leading-relaxed">
                {plant.description}
              </Text>
            )}

            {/* Price */}
            <div className="bg-emerald-50 rounded-2xl p-6 mb-8">
              <div className="flex items-end gap-4">
                <Text size="2.5rem" fw={700} c="teal.7">
                  {formatPrice(plant.price, language)}
                </Text>
                {plant.oldPrice && (
                  <Text size="xl" td="line-through" c="dimmed" mb="xs">
                    {formatPrice(plant.oldPrice, language)}
                  </Text>
                )}
              </div>
              {plant.oldPrice && (
                <Text size="sm" c="teal.6" mt="xs">
                  Siz {formatPrice(plant.oldPrice - plant.price, language)} tejaysiz!
                </Text>
              )}
            </div>

            {/* Action Buttons */}
            <Group mb="xl" grow>
              <Button
                size="xl"
                color="teal"
                radius="xl"
                leftSection={<ShoppingCart size={22} />}
                disabled={!plant.inStock}
                className="h-14"
              >
                Savatga qo'shish
              </Button>
              <Button
                size="xl"
                variant="light"
                color="teal"
                radius="xl"
                leftSection={<Phone size={22} />}
                className="h-14"
              >
                Buyurtma berish
              </Button>
            </Group>

            {/* Care Tips */}
            <div className="bg-white border border-emerald-100 rounded-2xl p-6 mb-8">
              <Text fw={600} size="lg" mb="md">Parvarish bo'yicha maslahatlar</Text>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <Droplets size={28} className="text-blue-500 mx-auto mb-2" />
                  <Text size="sm" fw={500}>Suv</Text>
                  <Text size="xs" c="dimmed">Haftada 2 marta</Text>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <Sun size={28} className="text-amber-500 mx-auto mb-2" />
                  <Text size="sm" fw={500}>Yorug'lik</Text>
                  <Text size="xs" c="dimmed">O'rtacha</Text>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <Leaf size={28} className="text-emerald-500 mx-auto mb-2" />
                  <Text size="sm" fw={500}>Parvarish</Text>
                  <Text size="xs" c="dimmed">Oson</Text>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-emerald-50/50 rounded-xl">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Truck className="text-emerald-600" size={24} />
                </div>
                <div>
                  <Text fw={600}>Bepul yetkazib berish</Text>
                  <Text size="sm" c="dimmed">200 000 so'mdan yuqori buyurtmalar uchun</Text>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-emerald-50/50 rounded-xl">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Shield className="text-emerald-600" size={24} />
                </div>
                <div>
                  <Text fw={600}>Sifat kafolati</Text>
                  <Text size="sm" c="dimmed">O'simlik sog'lom va sifatli bo'lishiga 100% kafolat</Text>
                </div>
              </div>
            </div>
          </Grid.Col>
        </Grid>

        {/* Related Plants */}
        {plant.related.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-10">
              <Text c="emerald" fw={600} size="sm" mb="xs" className="uppercase tracking-wider">
                Tavsiya
              </Text>
              <Title order={2} size="2rem">O'xshash o'simliklar</Title>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {plant.related.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <Link href={`/home/plants/${item.slug}`}>
                      <div
                        className="h-40 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${item.imageUrl || 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400'})`
                        }}
                      />
                    </Link>
                    {item.isNew && (
                      <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                        <Sparkles size={10} /> Yangi
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <Link href={`/home/plants/${item.slug}`} className="no-underline">
                      <Text fw={600} lineClamp={1} className="text-gray-800 group-hover:text-emerald-700 transition-colors">
                        {item.name}
                      </Text>
                    </Link>
                    <Text size="lg" fw={700} c="teal.6" mt="xs">
                      {formatPrice(item.price, language)}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PlantDetailPage;
