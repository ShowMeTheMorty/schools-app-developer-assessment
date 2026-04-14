import { Container, Loader, Stack, Text, Title } from '@mantine/core';
import { useListSchoolsQuery } from 'api/schools.queries';
import SchoolsList from 'components/organisms/SchoolsList';

const SchoolListPage = (): JSX.Element => {
  const { data, isLoading, error } = useListSchoolsQuery({ page: 1, limit: 10 });
  
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
      <SchoolsList schools={data!} onSchoolClick={(school) => console.log(school)} />
    );
  }

  return (
    <>
      <Container>
        <Stack>
          <Title order={2}>Schools List</Title>
          <Text c="dimmed">An index of all databased schools</Text>
          {schoolsList()} 
        </Stack>
      </Container>
    </>
  );
}

export default SchoolListPage;
