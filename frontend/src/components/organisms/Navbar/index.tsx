import { NavLink, Stack } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from 'routes';

type NavbarProps = {
  onNavigate?: () => void;
};

const NAV_ITEMS = [
  { to: ROUTES.home, label: 'Home' },
  { to: ROUTES.schools, label: 'Schools' },
];

const Navbar = ({ onNavigate }: NavbarProps) => {
  const location = useLocation();

  return (
    <Stack gap="xs">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          component={Link}
          to={item.to}
          label={item.label}
          active={location.pathname === item.to}
          onClick={onNavigate}
        />
      ))}
    </Stack>
  );
}

export default Navbar;