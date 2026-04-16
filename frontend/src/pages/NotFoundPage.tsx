import { Container, Text } from '@mantine/core';
import { JSX } from 'react';

const NotFoundPage = (): JSX.Element => {
  return (
    <Container>
      <Text c="dimmed">Page not found</Text>
    </Container>
  );
}

export default NotFoundPage;