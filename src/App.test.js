import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders the joke generator workspace', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /find your next quick laugh/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /get a joke/i })).toBeInTheDocument();
});
