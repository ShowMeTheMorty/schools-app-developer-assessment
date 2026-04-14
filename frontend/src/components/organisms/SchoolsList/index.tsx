import { School } from "api/types";
import { Paper, Stack, Text } from "@mantine/core";
import SchoolListItem from "components/molecules/SchoolListItem";

interface SchoolsListProps {
  schools: School[];
  onSchoolClick: (school: School) => void;
}

const SchoolsList = ({ schools, onSchoolClick }: SchoolsListProps): JSX.Element => {
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
              onClick={() => onSchoolClick(school)} 
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
}

export default SchoolsList;