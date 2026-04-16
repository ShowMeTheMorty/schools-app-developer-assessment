import { Group, Paper, Text } from '@mantine/core';
import { JSX } from 'react';
import styles from './SchoolListItem.module.css';


interface SchoolListItemProps {
  title: string;
  description?: string;
  onClick: () => void;
}

const SchoolListItem = ({ title, description, onClick }: SchoolListItemProps): JSX.Element => {
  return (
    <Paper className={styles.item} shadow="xs" p="md" withBorder onClick={onClick}>
      <Group justify="space-between">
        <Text>{title}</Text>
        {description && (
          <Text c="dimmed">{description}</Text>
        )}
      </Group>
    </Paper>
  )
}

export default SchoolListItem;