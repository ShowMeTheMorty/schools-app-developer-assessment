import { 
  Loader, 
  Paper, 
  Stack, 
  Text, 
  Pagination, 
  Center, 
  Space 
} from "@mantine/core";
import SchoolListItem from "components/molecules/SchoolListItem";
import { useAside } from "contexts/aside/AsideContext";
import { AsideMode } from "contexts/aside/aside.types";
import { JSX, useState } from "react";
import { useListSchoolsQuery } from "api/schools.queries";


const SchoolsList = (): JSX.Element => {
  const [activePage, setActivePage] = useState(1);
  const { data, isLoading, error } = useListSchoolsQuery({ page: activePage, limit: 6 });
  const { openAside } = useAside();

  if (isLoading) {
    return (
      <>
        <Loader />
        <Text>Loading schools...</Text>
      </>
    );
  }

  if (error) {
    return <Text c="red">Error loading schools: {error.message}</Text>;
  }

  return (
    <Paper shadow="md" p="md" withBorder>
      {data!.data.length === 0 ? (
        <Text>School's out 😎 (You're out of schools)</Text>
      ) : (
        <>
          <Stack>
            {data!.data.map((school) => (
              <SchoolListItem
                key={school.id}
                title={school.title}
                description={school.completed ? "Status: Completed" : "Status: In Progress"}
                onClick={() => openAside(AsideMode.SchoolDetails, { school })}
              />
            ))}
          </Stack>
          <Space h="lg" />
          <Center>
            <Pagination total={Math.ceil(data!.total / data!.limit)} value={activePage} onChange={setActivePage} />
          </Center>
        </>
      )}
    </Paper>
  );
}

export default SchoolsList;