import { Box, Group, Paper } from '@mantine/core';
import { JSX } from 'react';

interface SchoolListItemProps {
  title: string;
  onClick: () => void;
}

const SchoolListItem = ({ title, onClick }: SchoolListItemProps): JSX.Element => {
  return (
    <Box onClick={onClick}>
      <Paper shadow="xs" p="md" withBorder>
        <Group>
          {title}
        </Group>
      </Paper>
    </Box>
  )
}

export default SchoolListItem;