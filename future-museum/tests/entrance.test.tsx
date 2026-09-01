import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('switches between SeedRealtime official scene videos', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const sceneTabs = screen.getAllByRole('tab', { name: /播放场景/ });
    expect(sceneTabs).toHaveLength(3);
    expect(screen.getByText('多人交错对话')).toBeInTheDocument();

    await user.click(sceneTabs[1]);

    expect(sceneTabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('跨语言交流')).toBeInTheDocument();
    expect(screen.getByTestId('seedrealtime-video')).toHaveAttribute(
      'poster',
      expect.stringContaining('5pq1omsej05r1.png'),
    );
  });
});
