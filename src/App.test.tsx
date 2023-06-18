import { render, screen } from '@testing-library/react';
import { Home } from './pages/home';

test('Search User on GitHub', () => {
 render(<Home />);
 const linkElement = screen.getByText(/Search User on GitHub/i);
 expect(linkElement).toBeInTheDocument();
});
