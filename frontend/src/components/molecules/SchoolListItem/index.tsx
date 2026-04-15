import { ActionIcon, Box, Group, Paper, Text } from '@mantine/core';
import { JSX } from 'react';


interface SchoolListItemProps {
  title: string;
  description?: string;
  onClick: () => void;
}

const SchoolListItem = ({ title, description, onClick }: SchoolListItemProps): JSX.Element => {
  return (
    <Box onClick={onClick}>
      <Paper shadow="xs" p="md" withBorder>
        <Group>
          <Text>{title}</Text>
          {description && (
            <Text c="dimmed">{description}</Text>
          )}
        </Group>

      </Paper>
    </Box>
  )
}

export default SchoolListItem;