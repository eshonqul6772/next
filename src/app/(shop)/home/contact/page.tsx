'use client';

import { ContactSection } from '@/widgets/shop/ui/ContactSection';
import { Container, Title, Text } from '@mantine/core';

const ContactPage = () => {
  return (
    <div className="py-12">
      <Container size="xl">
        <div className="text-center mb-8">
          <Title order={1} mb="sm">Aloqa</Title>
          <Text c="dimmed" size="lg">
            Savollaringiz bormi? Biz bilan bog'laning!
          </Text>
        </div>
      </Container>
      <ContactSection />
    </div>
  );
};

export default ContactPage;
