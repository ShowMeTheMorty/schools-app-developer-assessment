import { Button, Container, Paper, Stack, Text, Title } from '@mantine/core';
import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';


const WelcomePage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Container size="sm" py="xl">
      <Paper withBorder shadow="sm" radius="md" p="xl">
        <Stack gap="md">
          <Title order={2}>Welcome to School Dash</Title>
          <Text c="dimmed">
            Open the menu to explore the app or jump straight into managing school records.
          </Text>
          <Button size="md" onClick={() => navigate('/schools')}>
            Manage schools
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default WelcomePage;
