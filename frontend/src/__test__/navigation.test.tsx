import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '../components/Navigation';

describe('Navigation', () => {
    test('renders all navigation links', () => {
        render(<Navigation />);
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Services')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    test('links have correct classes', () => {
        render(<Navigation />);
        const links = screen.getAllByRole('link');
        links.forEach(link => {
            expect(link).toHaveClass('text-blue-900');
            expect(link).toHaveClass('font-semibold');
        });
    });
});