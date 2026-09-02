import { ExternalLink, Lightbulb, PlayCircle } from 'lucide-react';
import Image from 'next/image';

import { exhibits, type Exhibit } from '../../data/exhibits';

import { MuseumEntrance } from './MuseumEntrance';
import { SeedanceCarousel } from './SeedanceCarousel';
import { SeedRealtimeCarousel } from './SeedRealtimeCarousel';
import { ZoomableVideo } from './ZoomableVideo';

function OfficialMedia({ exhibit }: { exhibit: Exhibit }) {
  if (exhibit.media.kind === 'carousel') {
    return <SeedRealtimeCarousel scenes={exhibit.media.scenes} />;
  }

  if (exhibit.media.kind === 'prompt-carousel') {
    return <SeedanceCarousel scenes={exhibit.media.scenes} />;
  }

  if (exhibit.media.kind === 'video') {
    return (
      <ZoomableVideo
        captions={`/captions/${exhibit.id}.vtt`}
        poster={exhibit.media.poster}
        src={exhibit.media.src}
      />
    );
  }

  return (
    <a className="exhibit__official-preview" href={exhibit.officialUrl} target="_blank" rel="noopener noreferrer">
      <PlayCircle aria-hidden="true" />
      <span>前往官方页面观看案例</span>
    </a>
  );
}

export function MuseumShowcase() {
  return (
    <>
      <MuseumEntrance />
      <section className="exhibits" id="exhibits" aria-label="七个科技主题">
        {exhibits.map((exhibit, index) => (
          <article className="exhibit" id={exhibit.id} key={exhibit.id}>
            <Image
              alt={exhibit.alt}
              className="exhibit__hero"
              fill
              priority={index < 2}
              sizes="100vw"
              src={exhibit.image}
              unoptimized
            />
            <div className="exhibit__shade" />
            <div className="exhibit__copy">
              <div className="exhibit__number">{String(index + 1).padStart(2, '0')} / 07</div>
              <p className="exhibit__eyebrow">{exhibit.eyebrow}</p>
              <h2>{exhibit.headline}</h2>
              <p className="exhibit__summary">{exhibit.summary}</p>
              <div className="exhibit__actions">
                <a href={exhibit.officialUrl} target="_blank" rel="noopener noreferrer">
                  进入官网 <ExternalLink aria-hidden="true" />
                </a>
                <span>{exhibit.source}</span>
              </div>
            </div>
            <div className="exhibit__media">
              <OfficialMedia exhibit={exhibit} />
              <p><Lightbulb aria-hidden="true" />想一想：{exhibit.question}</p>
            </div>
          </article>
        ))}
      </section>
      <footer className="museum-footer">
        <p>未来不是用来等待的，而是用来理解、判断和创造的。</p>
        <a href="#museum-title">返回入口 ↑</a>
      </footer>
    </>
  );
}
