import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../components/StatusBadge';

describe('StatusBadge', () => {
  it('deve renderizar status AVAILABLE', () => {
    render(<StatusBadge status="AVAILABLE" />);
    expect(screen.getByText('AVAILABLE')).toBeTruthy();
  });

  it('deve renderizar status DELAYED', () => {
    render(<StatusBadge status="DELAYED" />);
    expect(screen.getByText('DELAYED')).toBeTruthy();
  });

  it('deve renderizar status FULL', () => {
    render(<StatusBadge status="FULL" />);
    expect(screen.getByText('FULL')).toBeTruthy();
  });
});
