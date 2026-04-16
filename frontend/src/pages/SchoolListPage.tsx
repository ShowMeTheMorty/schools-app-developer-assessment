import { Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import SchoolsList from 'components/organisms/SchoolsList';
import { AsideMode } from 'contexts/aside/aside.types';
import { useAside } from 'contexts/aside/AsideContext';
import { JSX } from 'react';

const SchoolListPage = (): JSX.Element => {
  const { openAside } = useAside();
  

  return (
    <Container>
      <Stack gap="lg">
        <Group justify="space-between" align="flex-start">
          <Stack gap={0}>
            <Title order={2}>Schools List</Title>
            <Text c="dimmed">An index of all databased schools</Text>
          </Stack>
          <Button onClick={() => openAside(AsideMode.CreateSchool, {})}>+ Add School</Button>
        </Group>
        <SchoolsList />
      </Stack>
    </Container>
  );
}

export default SchoolListPage;
