import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { AsideProvider } from 'contexts/aside/AsideContext';
import queryClient from 'api/queryClient';
import App from './App';
import { test, expect } from '@jest/globals';

test('Renders welcome to SchoolDocs', () => {
  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <AsideProvider>
            <App />
          </AsideProvider>
        </MantineProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Welcome to School Dash/i);
  expect(linkElement).toBeTruthy();
});
