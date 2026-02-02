'use client';

import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Box, Button, Center, Container, Group, Stack, Text, Title } from '@mantine/core';
import { ArrowLeft, ShieldX } from 'lucide-react';

const NoAccess: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Center className="min-h-[60vh]">
      <Container size="sm">
        <Stack gap="lg" align="center">
          <Box className="opacity-70">
            <ShieldX size={100} color="var(--mantine-color-red-6)" />
          </Box>

          <Title order={1} size="h1" ta="center">
            403
          </Title>

          <Text size="lg" c="dimmed" ta="center">
            {t('no_access_desc') || 'Bu sahifaga kirishga ruxsatingiz yo\'q'}
          </Text>

          <Group gap="md">
            <Button
              size="md"
              variant="light"
              color="blue"
              leftSection={<ArrowLeft size={18} />}
              onClick={() => router.push('/dashboard')}
            >
              {t('back_to_dashboard') || 'Dashboard'}
            </Button>
          </Group>
        </Stack>
      </Container>
    </Center>
  );
};

export default NoAccess;
