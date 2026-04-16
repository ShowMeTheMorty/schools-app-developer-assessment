import { colorsTuple, createTheme } from '@mantine/core';

export const appTheme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  headings: { fontFamily: 'Fraunces, serif' },
  radius: {
    md: '10px',
  },
  defaultRadius: 'md',
  colors: {
    brand: colorsTuple('#4caf50'),
  },
  primaryColor: 'brand',
});