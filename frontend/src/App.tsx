import React from 'react';
import styles from './App.module.css';
import { 
  AppShell, 
  Burger, 
  Group, 
  Title, 
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AppRoutes from './routes';
import Navbar from './components/organisms/Navbar';

function App() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell 
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { 
          mobile: !opened,
          desktop: !opened,
        }
      }}
    >
      <AppShell.Header className={styles.AppHeader}>
        <Group h="100%" px="md" align='center'>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
          />
          <Title order={3}>Welcome to SchoolDocs</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar onNavigate={toggle} />
      </AppShell.Navbar>

      <AppShell.Main>
        <AppRoutes />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
