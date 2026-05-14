import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MetricCard from '../components/MetricCard';

describe('MetricCard', () => {
  it('deve renderizar título e valor', () => {
    render(<MetricCard label="Test Label" value="42" />);
    expect(screen.getByText('Test Label')).toBeTruthy();
    expect(screen.getByText('42')).toBeTruthy();
  });

  it('deve renderizar subtítulo quando fornecido', () => {
    render(<MetricCard label="Label" value="100" sub="some context" />);
    expect(screen.getByText('some context')).toBeTruthy();
  });
});
