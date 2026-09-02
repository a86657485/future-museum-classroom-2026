'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

type Scene = {
  title: string;
  description: string;
  src: string;
  poster: string;
  captions: string;
  prompt: string;
};

export function SeedanceCarousel({ scenes }: { scenes: readonly Scene[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeScene = scenes[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < scenes.length - 1;

  function selectScene(index: number) {
    if (index === activeIndex) return;
    videoRef.current?.pause();
    setActiveIndex(index);
  }

  return (
    <div className="prompt-carousel">
      <video
        className="exhibit__video"
        controls
        data-testid="seedance-video"
        key={activeScene.src}
        playsInline
        poster={activeScene.poster}
        preload="none"
        ref={videoRef}
      >
        <source src={activeScene.src} type="video/mp4" />
        <track
          default
          kind="captions"
          label="中文说明"
          src={activeScene.captions}
          srcLang="zh-CN"
        />
      </video>

      <div className="prompt-carousel__header">
        <div className="prompt-carousel__caption" aria-live="polite">
          <strong>{activeScene.title}</strong>
          <span>{activeScene.description}</span>
        </div>
        <div className="prompt-carousel__arrows">
          <button
            aria-label="上一个案例"
            className="prompt-carousel__arrow"
            disabled={!hasPrev}
            onClick={() => selectScene(activeIndex - 1)}
            type="button"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            aria-label="下一个案例"
            className="prompt-carousel__arrow"
            disabled={!hasNext}
            onClick={() => selectScene(activeIndex + 1)}
            type="button"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="prompt-carousel__prompt">
        <strong>提示词</strong>
        <span>{activeScene.prompt}</span>
      </p>
    </div>
  );
}
