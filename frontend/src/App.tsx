import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { 
  AppShell, 
  Burger, 
  Group, 
  Title, 
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import AppRoutes from './routes';
import Navbar from './components/organisms/Navbar';
import { useAside } from 'contexts/aside/AsideContext';
import AsideContent from 'components/organisms/AsideContent';


function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isNavOpen, setIsNavOpen] = useState(!isMobile);
  const toggleNav = () => setIsNavOpen((open) => !open);

  const { asideState, closeAside } = useAside();

  useEffect(() => {
    setIsNavOpen(!isMobile);
  }, [isMobile]);

  return (
    <AppShell 
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { 
          mobile: !isNavOpen,
          desktop: !isNavOpen,
        }
      }}
      aside={{
        width: 400,
        breakpoint: 'sm',
        collapsed: { 
          mobile: !asideState.isOpen || isNavOpen, // if nav is open, collapse aside
          desktop: !asideState.isOpen,
        }
      }}
    >
      <AppShell.Header className={styles.AppHeader}>
        <Group h="100%" px="md" align='center'>
          <Burger
            opened={isNavOpen}
            onClick={toggleNav}
            size="sm"
          />
          <Title order={3}>School Dash</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar onNavigate={() => {
          if (isMobile) {
            toggleNav();
          };
          closeAside();
        }} />
      </AppShell.Navbar>

      <AppShell.Aside p="md" style={{ overflowY: 'auto' }}>
        <AsideContent />
      </AppShell.Aside>

      <AppShell.Main>
        <AppRoutes />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
