import { exhibits } from '../../../data/exhibits';
import Image from 'next/image';

export function generateStaticParams() {
  return exhibits.map((exhibit) => ({ id: exhibit.id }));
}

export default async function SlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exhibit = exhibits.find((item) => item.id === id);

  if (!exhibit) {
    return <main>未找到该主题</main>;
  }

  return (
    <main className="ppt-slide" data-slide-ready="true">
      <Image src={exhibit.image} alt="" fill priority sizes="1920px" unoptimized />
      <div className="ppt-slide__shade" />
      <div className="ppt-slide__header">
        <span>信息科技 · 开学第一课</span>
        <span>未来科学馆</span>
        <span>{exhibit.name}</span>
      </div>
      <div className="ppt-slide__copy">
        <p className="ppt-slide__number">
          {String(exhibits.indexOf(exhibit) + 1).padStart(2, '0')} / 07
        </p>
        <p className="ppt-slide__eyebrow">{exhibit.eyebrow}</p>
        <h1>{exhibit.headline}</h1>
        <p className="ppt-slide__summary">{exhibit.summary}</p>
        <p className="ppt-slide__question">想一想：{exhibit.question}</p>
      </div>
      <div className="ppt-slide__source">
        <span>来源：{exhibit.source} · {new URL(exhibit.officialUrl).hostname}</span>
      </div>
    </main>
  );
}
