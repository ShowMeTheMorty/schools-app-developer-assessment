import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import SchoolsList from './index';

jest.mock('api/schools.queries', () => ({
  useListSchoolsQuery: () => mockQueryResult,
}));

jest.mock('contexts/aside/AsideContext', () => ({
  useAside: () => ({ openAside: jest.fn() }),
}));

let mockQueryResult: { data: unknown; isLoading: boolean; error: unknown };

const renderList = () =>
  render(
    <MantineProvider>
      <SchoolsList />
    </MantineProvider>
  );

describe('SchoolsList', () => {
  it('shows loader while loading', () => {
    mockQueryResult = { data: undefined, isLoading: true, error: null };
    renderList();
    expect(screen.getByText(/loading schools/i)).toBeInTheDocument();
  });

  it('shows error message on failure', () => {
    mockQueryResult = { data: undefined, isLoading: false, error: { message: 'Network error' } };
    renderList();
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });

  it('shows empty state when no schools', () => {
    mockQueryResult = { data: { data: [], total: 0, page: 1, limit: 6 }, isLoading: false, error: null };
    renderList();
    expect(screen.getByText(/school's out/i)).toBeInTheDocument();
  });

  it('renders school titles when data is present', () => {
    mockQueryResult = {
      data: {
        data: [
          { id: '1', title: 'Alpha School', completed: false, address: '', contactEmail: '', contactPhone: '', note: '' },
          { id: '2', title: 'Beta School', completed: true, address: '', contactEmail: '', contactPhone: '', note: '' },
        ],
        total: 2,
        page: 1,
        limit: 6,
      },
      isLoading: false,
      error: null,
    };
    renderList();
    expect(screen.getByText('Alpha School')).toBeInTheDocument();
    expect(screen.getByText('Beta School')).toBeInTheDocument();
  });
});
