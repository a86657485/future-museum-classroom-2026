import { ArrowRight, CircleDotDashed } from 'lucide-react';

const exhibits = [
  '实时交互',
  '生成影像',
  '音视频编程',
  '家庭机器人',
  '人形机器人',
  '飞行汽车',
  '回收火箭',
];

export function MuseumEntrance() {
  return (
    <main className="entrance" aria-labelledby="museum-title">
      <header className="museum-header">
        <p>信息科技 · 开学第一课</p>
        <p className="museum-header__title">未来科学馆</p>
        <p>7 EXHIBITS / 2026</p>
      </header>

      <section className="entrance__content">
        <div className="entrance__copy">
          <p className="entrance__eyebrow">THE FUTURE IS ALREADY HERE</p>
          <h1 id="museum-title">
            未来，
            <span>已经发生</span>
          </h1>
          <p className="entrance__lead">
            七项正在改变世界的科技。
            <br />
            看见它们，体验它们，也学会判断它们。
          </p>
          <a className="entrance__button" href="#exhibits">
            进入科技馆
            <ArrowRight aria-hidden="true" />
          </a>
        </div>

        <div className="entrance__portal" aria-hidden="true">
          <div className="portal__halo portal__halo--outer" />
          <div className="portal__halo portal__halo--middle" />
          <div className="portal__core">
            <CircleDotDashed strokeWidth={1.2} />
            <p>未来不是远方</p>
            <strong>它正在发生</strong>
          </div>
          <div className="portal__signal" />
        </div>
      </section>

      <nav className="entrance__rail" aria-label="七个展厅预览">
        {exhibits.map((exhibit, index) => (
          <div className="rail__item" key={exhibit}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{exhibit}</p>
          </div>
        ))}
      </nav>

      <p className="entrance__hint">向前探索 · 保持好奇 · 学会判断</p>
    </main>
  );
}
