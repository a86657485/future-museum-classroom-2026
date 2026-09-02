import { fireEvent, render, screen } from '@testing-library/react';
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
    expect(screen.getByText('辅导学生读英语')).toBeInTheDocument();
    expect(screen.getByTestId('seedrealtime-video')).toHaveAttribute(
      'poster',
      expect.stringContaining('5pq1omsej1cae.jpeg'),
    );

    await user.click(sceneTabs[1]);

    expect(sceneTabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('跨语言交流')).toBeInTheDocument();
    expect(screen.getByTestId('seedrealtime-video')).toHaveAttribute(
      'poster',
      expect.stringContaining('5pq1omsej05r1.png'),
    );
  });

  it('switches between Seedance official showcase videos with prompts', async () => {
    const user = userEvent.setup();
    render(<Home />);

    expect(screen.getByText('更长叙事，更稳掌控')).toBeInTheDocument();
    expect(screen.getByText(/老社区理发店/)).toBeInTheDocument();
    expect(screen.getByTestId('seedance-video')).toHaveAttribute(
      'poster',
      '/videos/seedance-barbershop.jpg',
    );

    const prev = screen.getByRole('button', { name: '上一个案例' });
    expect(prev).toBeDisabled();

    await user.click(screen.getByRole('button', { name: '下一个案例' }));

    expect(screen.getByText('精细化参考与编辑')).toBeInTheDocument();
    expect(screen.getByText(/纸片小狗/)).toBeInTheDocument();
    expect(screen.getByTestId('seedance-video')).toHaveAttribute(
      'poster',
      '/videos/seedance-paper-dog.jpg',
    );

    await user.click(screen.getByRole('button', { name: '下一个案例' }));

    expect(screen.getByText('为专业视频创作而生')).toBeInTheDocument();
    expect(screen.getByText(/白模参考视频/)).toBeInTheDocument();
    expect(screen.getByTestId('seedance-video')).toHaveAttribute(
      'poster',
      '/videos/seedance-whitebox.jpg',
    );
    expect(screen.getByRole('button', { name: '下一个案例' })).toBeDisabled();
  });

  it('zooms the video to the center of the screen on play and closes on request', () => {
    render(<Home />);

    const video = screen.getByTestId('seedrealtime-video');
    const stage = video.closest('.video-zoom');
    expect(stage).not.toHaveClass('video-zoom--active');

    fireEvent.play(video);

    expect(stage).toHaveClass('video-zoom--active');

    fireEvent.click(screen.getByRole('button', { name: '关闭放大播放' }));

    expect(stage).not.toHaveClass('video-zoom--active');
  });

  it('zooms iframe exhibits to the center of the screen on request', () => {
    render(<Home />);

    const iframe = document.querySelector('iframe.exhibit__video');
    expect(iframe).not.toBeNull();
    const stage = iframe!.closest('.video-zoom');
    expect(stage).not.toHaveClass('video-zoom--active');

    fireEvent.click(screen.getAllByRole('button', { name: '放大观看' })[0]);

    expect(stage).toHaveClass('video-zoom--active');

    fireEvent.click(screen.getByRole('button', { name: '关闭放大播放' }));

    expect(stage).not.toHaveClass('video-zoom--active');
  });
});
