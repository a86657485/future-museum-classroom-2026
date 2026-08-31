import { ExternalLink, Lightbulb, PlayCircle } from 'lucide-react';

import { exhibits, type Exhibit } from '../../data/exhibits';

import { MuseumEntrance } from './MuseumEntrance';

function OfficialMedia({ exhibit }: { exhibit: Exhibit }) {
  if (exhibit.media.kind === 'iframe') {
    return (
      <iframe
        allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="exhibit__video"
        loading="lazy"
        src={exhibit.media.src}
        title={exhibit.media.title}
      />
    );
  }

  if (exhibit.media.kind === 'video') {
    return (
      <video
        className="exhibit__video"
        controls
        playsInline
        poster={exhibit.media.poster}
        preload="none"
      >
        <source src={exhibit.media.src} type="video/mp4" />
      </video>
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
            <img className="exhibit__hero" src={exhibit.image} alt={exhibit.alt} loading={index < 2 ? 'eager' : 'lazy'} />
            <div className="exhibit__shade" />
            <div className="exhibit__copy">
              <div className="exhibit__number">{String(index + 1).padStart(2, '0')} / 07</div>
              <p className="exhibit__eyebrow">{exhibit.eyebrow}</p>
              <h2>{exhibit.headline}</h2>
              <p className="exhibit__summary">{exhibit.summary}</p>
              <p className="exhibit__boundary">{exhibit.boundary}</p>
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
