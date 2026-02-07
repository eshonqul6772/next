'use client';

import { Container, Grid, Title, Text, Group } from '@mantine/core';
import { Phone, Mail, MapPin, Clock, Leaf, Instagram, Send } from 'lucide-react';
import Link from 'next/link';

export const ShopFooter = () => {
  return (
    <footer className="bg-gradient-to-b from-emerald-900 to-emerald-950 text-white pt-16 pb-8">
      <Container size="xl">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                <Leaf size={22} className="text-white" />
              </div>
              <div>
                <Title order={4} c="white">O'simliklar</Title>
                <span className="text-xs text-emerald-300">Dunyosi</span>
              </div>
            </div>
            <Text size="sm" c="gray.4" className="leading-relaxed">
              Uyingizni jonlantiring! Eng sifatli xona o'simliklari va professional maslahatlar.
            </Text>
            <Group mt="lg" gap="xs">
              <a href="#" className="w-9 h-9 bg-emerald-800 hover:bg-emerald-700 rounded-lg flex items-center justify-center transition-colors">
                <Instagram size={18} className="text-emerald-300" />
              </a>
              <a href="#" className="w-9 h-9 bg-emerald-800 hover:bg-emerald-700 rounded-lg flex items-center justify-center transition-colors">
                <Send size={18} className="text-emerald-300" />
              </a>
            </Group>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Title order={5} mb="lg" c="white">Sahifalar</Title>
            <div className="flex flex-col gap-3">
              <Link href="/home" className="text-gray-400 hover:text-emerald-400 no-underline text-sm transition-colors">
                Bosh sahifa
              </Link>
              <Link href="/home/categories" className="text-gray-400 hover:text-emerald-400 no-underline text-sm transition-colors">
                Kategoriyalar
              </Link>
              <Link href="/home/plants" className="text-gray-400 hover:text-emerald-400 no-underline text-sm transition-colors">
                O'simliklar
              </Link>
              <Link href="/home/contact" className="text-gray-400 hover:text-emerald-400 no-underline text-sm transition-colors">
                Aloqa
              </Link>
            </div>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Title order={5} mb="lg" c="white">Aloqa</Title>
            <div className="flex flex-col gap-4">
              <Group gap="sm">
                <div className="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center">
                  <Phone size={14} className="text-emerald-400" />
                </div>
                <Text size="sm" c="gray.4">+998 90 123 45 67</Text>
              </Group>
              <Group gap="sm">
                <div className="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center">
                  <Mail size={14} className="text-emerald-400" />
                </div>
                <Text size="sm" c="gray.4">info@osimliklar.uz</Text>
              </Group>
              <Group gap="sm">
                <div className="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center">
                  <MapPin size={14} className="text-emerald-400" />
                </div>
                <Text size="sm" c="gray.4">Toshkent, Chilonzor</Text>
              </Group>
            </div>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Title order={5} mb="lg" c="white">Ish vaqti</Title>
            <Group gap="sm" mb="md">
              <div className="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center">
                <Clock size={14} className="text-emerald-400" />
              </div>
              <div>
                <Text size="sm" c="white" fw={500}>09:00 - 20:00</Text>
                <Text size="xs" c="gray.5">Har kuni</Text>
              </div>
            </Group>
            <div className="bg-emerald-800/50 rounded-xl p-4 mt-4">
              <Text size="xs" c="emerald.300" fw={500}>Bepul yetkazib berish</Text>
              <Text size="xs" c="gray.4">200 000 so'mdan yuqori buyurtmalarga</Text>
            </div>
          </Grid.Col>
        </Grid>

        <div className="border-t border-emerald-800 mt-12 pt-8 text-center">
          <Text size="sm" c="gray.5">
            © 2024 O'simliklar Dunyosi. Barcha huquqlar himoyalangan.
          </Text>
        </div>
      </Container>
    </footer>
  );
};
