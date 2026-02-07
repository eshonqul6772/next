'use client';

import type React from 'react';
import { Button, Container, Loader, Paper, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

import * as Fields from '@/shared/ui/fields';
import * as Forms from '@/features/auth/ui';

import cls from './Register.module.scss';

interface RegisterProps {
  onSuccess?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess }) => {
  return (
    <div className={cls.wrapper}>
      <Container size={1400} className={cls.container}>
        <div className={cls.contentWrapper}>
          <Paper radius="lg" p={40} className={cls.formCard}>
            <Stack gap={24} align="stretch">
              <Stack gap={8}>
                <Title order={1} size="h2" fw={600} ta="left">
                  Ro'yxatdan o'tish
                </Title>
                <Text size="sm" c="gray" ta="left">
                  Hisob yaratish uchun ma'lumotlaringizni kiriting
                </Text>
              </Stack>

              <Forms.Register onSuccess={onSuccess}>
                {form => (
                  <Stack gap={16}>
                    {form.submitting && (
                      <div className={cls.loaderContainer}>
                        <Loader color="blue" size="sm" />
                      </div>
                    )}

                    <div className={cls.twoColumns}>
                      <Stack gap={4}>
                        <Fields.Text name="firstName" label="Ism" form={form} validation={{ required: true }} />
                      </Stack>

                      <Stack gap={4}>
                        <Fields.Text name="lastName" label="Familiya" form={form} validation={{ required: true }} />
                      </Stack>
                    </div>

                    <Stack gap={4}>
                      <Fields.Text name="phone" label="Telefon raqam" form={form} />
                    </Stack>

                    <Stack gap={4}>
                      <Fields.Text name="username" label="Username" form={form} validation={{ required: true }} />
                    </Stack>

                    <div className={cls.twoColumns}>
                      <Stack gap={4}>
                        <Fields.Text name="password" label="Parol" type="password" form={form} validation={{ required: true }} />
                      </Stack>

                      <Stack gap={4}>
                        <Fields.Text name="confirmPassword" label="Parolni tasdiqlang" type="password" form={form} validation={{ required: true }} />
                      </Stack>
                    </div>

                    <Button
                      type="submit"
                      disabled={form.submitting}
                      fullWidth
                      size="md"
                      radius="md"
                      bg="#059669"
                      fw={600}
                      className={cls.registerBtn}
                    >
                      {form.submitting ? <Loader size="xs" color="white" /> : 'Ro\'yxatdan o\'tish'}
                    </Button>

                    <Text size="sm" c="gray" ta="center">
                      Hisobingiz bormi?{' '}
                      <Link href="/login" className={cls.link}>
                        Kirish
                      </Link>
                    </Text>
                  </Stack>
                )}
              </Forms.Register>
            </Stack>
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default Register;
