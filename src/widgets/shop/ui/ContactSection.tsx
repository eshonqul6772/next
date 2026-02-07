'use client';

import { Container, Title, Text, TextInput, Textarea, Button, Grid, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Phone, Mail, MapPin, Clock, Send, Leaf, CheckCircle } from 'lucide-react';
import { useCreateContact } from '@/entities/contact';

export const ContactSection = () => {
  const { mutateAsync, isPending } = useCreateContact();

  const form = useForm({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      message: ''
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Ismingizni kiriting' : null),
      phone: (value) => (value.length < 9 ? 'Telefon raqamini kiriting' : null),
      message: (value) => (value.length < 10 ? 'Xabar juda qisqa' : null)
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await mutateAsync(values);
      notifications.show({
        title: 'Xabar yuborildi!',
        message: 'Tez orada siz bilan bog\'lanamiz',
        color: 'teal',
        icon: <CheckCircle size={18} />
      });
      form.reset();
    } catch {
      notifications.show({
        title: 'Xatolik',
        message: 'Xabar yuborishda xatolik yuz berdi',
        color: 'red'
      });
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Telefon', value: '+998 90 123 45 67' },
    { icon: Mail, label: 'Email', value: 'info@osimliklar.uz' },
    { icon: MapPin, label: 'Manzil', value: 'Toshkent, Chilonzor tumani' },
    { icon: Clock, label: 'Ish vaqti', value: '09:00 - 20:00, har kuni' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50/50 to-white">
      <Container size="xl">
        <div className="text-center mb-14">
          <Text c="emerald" fw={600} size="sm" mb="xs" className="uppercase tracking-wider">
            Aloqa
          </Text>
          <Title order={2} size="2.5rem" mb="sm">Biz bilan bog'laning</Title>
          <Text c="dimmed" size="lg" maw={500} mx="auto">
            Savollaringiz bormi? Biz yordam berishga tayyormiz!
          </Text>
        </div>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 h-full text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Leaf size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">O'simliklar Dunyosi</h3>
                    <p className="text-emerald-200 text-sm">Sizga yordam beramiz</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-emerald-200 text-sm">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-5 bg-white/10 backdrop-blur rounded-2xl">
                  <p className="text-sm text-emerald-100">
                    <strong className="text-white">Bepul yetkazib berish</strong> — 200 000 so'mdan yuqori buyurtmalar uchun butun Toshkent bo'ylab
                  </p>
                </div>
              </div>
            </div>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 7 }}>
            <Paper p="xl" radius="xl" shadow="sm" className="border border-gray-100">
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Ismingiz"
                      placeholder="Ismingizni kiriting"
                      size="md"
                      radius="lg"
                      {...form.getInputProps('name')}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Telefon"
                      placeholder="+998 90 123 45 67"
                      size="md"
                      radius="lg"
                      {...form.getInputProps('phone')}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <TextInput
                      label="Email (ixtiyoriy)"
                      placeholder="email@example.com"
                      size="md"
                      radius="lg"
                      {...form.getInputProps('email')}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Textarea
                      label="Xabar"
                      placeholder="Xabaringizni yozing..."
                      minRows={4}
                      size="md"
                      radius="lg"
                      {...form.getInputProps('message')}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Button
                      type="submit"
                      size="lg"
                      color="teal"
                      loading={isPending}
                      leftSection={<Send size={18} />}
                      radius="xl"
                      fullWidth
                    >
                      Xabar yuborish
                    </Button>
                  </Grid.Col>
                </Grid>
              </form>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
};
