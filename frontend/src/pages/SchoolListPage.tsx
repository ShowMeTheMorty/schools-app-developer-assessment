import { Button, Container, Group, Loader, Space, Stack, Text, Title } from '@mantine/core';
import { useListSchoolsQuery } from 'api/schools.queries';
import SchoolsList from 'components/organisms/SchoolsList';
import { AsideMode } from 'contexts/aside/aside.types';
import { useAside } from 'contexts/aside/AsideContext';
import { JSX } from 'react';

const SchoolListPage = (): JSX.Element => {
  // am I going to forget about implementing pagination???
  const { data, isLoading, error } = useListSchoolsQuery({ page: 1, limit: 100 });
  const { openAside } = useAside();
  
  const schoolsList = () => {
    if (isLoading) {
      return (
        <>
          <Loader />
          <Text>Loading schools...</Text>
        </>
      );
    }

    if (error) {
      return (
        <Text c="red">Error loading schools: {error.message}</Text>
      );
    }

    return (
      <SchoolsList schools={data!} />
    );
  }

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
        {schoolsList()} 
      </Stack>
    </Container>
  );
}

export default SchoolListPage;
