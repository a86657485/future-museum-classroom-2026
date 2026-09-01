'use client';

import { useRef, useState } from 'react';

type Scene = {
  title: string;
  description: string;
  src: string;
  poster: string;
  captions: string;
};

export function SeedRealtimeCarousel({ scenes }: { scenes: readonly Scene[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeScene = scenes[activeIndex];

  function selectScene(index: number) {
    if (index === activeIndex) return;
    videoRef.current?.pause();
    setActiveIndex(index);
  }

  return (
    <div className="scene-carousel">
      <video
        className="exhibit__video"
        controls
        data-testid="seedrealtime-video"
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

      <div className="scene-carousel__caption" aria-live="polite">
        <strong>{activeScene.title}</strong>
        <span>{activeScene.description}</span>
      </div>

      <div className="scene-carousel__dots" role="tablist" aria-label="切换 SeedRealtime 场景视频">
        {scenes.map((scene, index) => (
          <button
            aria-label={`播放场景：${scene.title}`}
            aria-selected={index === activeIndex}
            className="scene-carousel__dot"
            key={scene.src}
            onClick={() => selectScene(index)}
            role="tab"
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
