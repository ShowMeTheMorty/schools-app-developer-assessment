import React from 'react';
import styles from './App.module.css';
import { 
  AppShell, 
  Burger, 
  Group, 
  Title, 
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import AppRoutes from './routes';
import Navbar from './components/organisms/Navbar';


function App() {
  const [opened, { toggle }] = useDisclosure(false);
  // Consider mobile if screen is less than 768px wide
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <AppShell 
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { 
          mobile: !opened,
          desktop: opened,
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
          <Title order={3}>School Dash</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar onNavigate={isMobile ? toggle : undefined} />
      </AppShell.Navbar>

      <AppShell.Main>
        <AppRoutes />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
