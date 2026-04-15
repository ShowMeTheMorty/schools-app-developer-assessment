import { School } from "api/types";
import { Paper, Stack, Text } from "@mantine/core";
import SchoolListItem from "components/molecules/SchoolListItem";
import { useAside } from "contexts/aside/AsideContext";
import { AsideMode } from "contexts/aside/aside.types";

interface SchoolsListProps {
  schools: School[];
}

const SchoolsList = ({ schools }: SchoolsListProps): JSX.Element => {
  const { openAside } = useAside();
  
  return (
    <Paper shadow="sm" p="md">
      {schools.length === 0 ? (
        <Text>School's out 😎 (You're out of schools)</Text>
      ) : (
        <Stack>
          {schools.map((school: School) => (
            <SchoolListItem 
              key={school.id} 
              title={school.title} 
              description={school.completed ? "Status: Completed" : "Status: In Progress"}
              onClick={() => openAside(AsideMode.SchoolDetails, { school })}
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
}

export default SchoolsList;