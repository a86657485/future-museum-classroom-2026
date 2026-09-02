'use client';

import { X } from 'lucide-react';
import { useEffect, useRef, useState, type RefObject } from 'react';

type ZoomableVideoProps = {
  src: string;
  poster?: string;
  captions: string;
  videoRef?: RefObject<HTMLVideoElement | null>;
  'data-testid'?: string;
};

export function ZoomableVideo({
  src,
  poster,
  captions,
  videoRef,
  'data-testid': testId,
}: ZoomableVideoProps) {
  const [zoomed, setZoomed] = useState(false);
  const localRef = useRef<HTMLVideoElement>(null);
  const resolvedRef = videoRef ?? localRef;

  function closeZoom() {
    resolvedRef.current?.pause();
    setZoomed(false);
  }

  useEffect(() => {
    if (!zoomed) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        (videoRef?.current ?? localRef.current)?.pause();
        setZoomed(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [zoomed, videoRef]);

  return (
    <div
      aria-label="视频播放"
      aria-modal={zoomed || undefined}
      className={zoomed ? 'video-zoom video-zoom--active' : 'video-zoom'}
      role={zoomed ? 'dialog' : undefined}
    >
      <video
        className="exhibit__video"
        controls
        data-testid={testId}
        onPlay={() => setZoomed(true)}
        playsInline
        poster={poster}
        preload="none"
        ref={resolvedRef}
      >
        <source src={src} type="video/mp4" />
        <track
          default
          kind="captions"
          label="中文说明"
          src={captions}
          srcLang="zh-CN"
        />
      </video>
      {zoomed ? (
        <button
          aria-label="关闭放大播放"
          className="video-zoom__close"
          onClick={closeZoom}
          type="button"
        >
          <X aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
