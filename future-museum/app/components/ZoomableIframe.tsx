'use client';

import { Maximize2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ZoomableIframe({ src, title }: { src: string; title: string }) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setZoomed(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [zoomed]);

  return (
    <div
      aria-label="视频播放"
      aria-modal={zoomed || undefined}
      className={zoomed ? 'video-zoom video-zoom--active' : 'video-zoom'}
      role={zoomed ? 'dialog' : undefined}
    >
      <iframe
        allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="exhibit__video"
        loading="lazy"
        src={src}
        title={title}
      />
      {zoomed ? (
        <button
          aria-label="关闭放大播放"
          className="video-zoom__close"
          onClick={() => setZoomed(false)}
          type="button"
        >
          <X aria-hidden="true" />
        </button>
      ) : (
        <button
          aria-label="放大观看"
          className="video-zoom__open"
          onClick={() => setZoomed(true)}
          type="button"
        >
          <Maximize2 aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
