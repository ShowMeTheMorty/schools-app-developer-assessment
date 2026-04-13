import { render, screen } from '@testing-library/react';
import App from './App';
import { test, expect } from '@jest/globals';

test('Renders welcome to SchoolDocs', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to SchoolDocs/i);
  expect(linkElement).toBeTruthy();
});
