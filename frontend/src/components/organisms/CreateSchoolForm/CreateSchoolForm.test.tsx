import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import CreateSchoolForm from './index';

jest.mock('api/schools.queries', () => ({
  useCreateSchoolMutation: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false,
  }),
}));

const mockMutateAsync = jest.fn();
const mockOnClose = jest.fn();

const renderForm = () =>
  render(
    <MantineProvider>
      <Notifications />
      <CreateSchoolForm onClose={mockOnClose} />
    </MantineProvider>
  );

beforeEach(() => {
  jest.clearAllMocks();
});

describe('CreateSchoolForm', () => {
  it('renders required title field', () => {
    renderForm();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  });

  it('shows validation error and does not submit when title is empty', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it('calls mutateAsync and onClose on valid submission', async () => {
    mockMutateAsync.mockResolvedValue({});
    renderForm();

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test School' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Test School' })
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('shows error notification when mutation fails', async () => {
    mockMutateAsync.mockRejectedValue({ statusCode: 409, message: 'A school with this title already exists' });
    renderForm();

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Duplicate' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(screen.getByText(/a school with this title already exists/i)).toBeInTheDocument();
    });
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
