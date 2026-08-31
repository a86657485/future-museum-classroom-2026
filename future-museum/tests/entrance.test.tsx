import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from '../app/page';

describe('museum entrance', () => {
  it('introduces the exhibit and links to seven display sections', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', { name: '未来，已经发生' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /进入科技馆/ }),
    ).toHaveAttribute('href', '#exhibits');
    expect(screen.getAllByRole('article')).toHaveLength(7);
    expect(
      screen.getAllByRole('link', { name: '进入官网' }),
    ).toHaveLength(7);
  });
});
