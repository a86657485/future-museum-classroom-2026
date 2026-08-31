# “未来已经发生”沉浸式科技馆 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 生成七套统一风格的科技主题主视觉与 PPT 图片，并交付一个面向小学四至六年级、兼顾教师大屏讲解和学生自主探索的沉浸式科技馆 Web。

**Architecture:** 在 `future-museum/` 中建立 React + TypeScript 单页叙事应用，七个展厅的事实、问题、媒体和官网链接集中存放在类型化数据文件中；页面组件只负责入馆、轨道导航、媒体播放、问题互动和离馆总结。外部官方视频按资源能力分别采用延迟加载的 `<video>`、B 站 `iframe` 或打开官网，任何媒体失败都回退到 `imagegen` 海报、事实卡和官网按钮。

**Tech Stack:** OpenAI Sites scaffold、React、TypeScript、Tailwind/CSS tokens、shadcn UI primitives、Vitest、Testing Library、Playwright、内置 `imagegen`。

---

## 文件结构

```text
开学第一课/
├── deliverables/
│   ├── ppt-backgrounds/              # 七张无文字 imagegen 主视觉
│   └── ppt-slides/                   # 七张 1920×1080 中文 PPT PNG
├── docs/
│   ├── sources.md                    # 官方来源、媒体与访问日期
│   └── superpowers/
│       ├── specs/2026-08-31-future-museum-design.md
│       └── plans/2026-08-31-future-museum-implementation.md
└── future-museum/
    ├── app/
    │   ├── components/
    │   │   ├── ExitReflection.tsx
    │   │   ├── ExhibitStage.tsx
    │   │   ├── FactBoundary.tsx
    │   │   ├── ModePicker.tsx
    │   │   ├── MuseumEntrance.tsx
    │   │   ├── MuseumMap.tsx
    │   │   ├── MuseumShell.tsx
    │   │   ├── OfficialMediaPanel.tsx
    │   │   ├── QuestionMoment.tsx
    │   │   ├── SourceDrawer.tsx
    │   │   └── TeacherDock.tsx
    │   ├── slides/[id]/page.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── data/
    │   ├── exhibit-schema.ts
    │   └── exhibits.ts
    ├── hooks/useMuseumProgress.ts
    ├── public/assets/generated/
    │   ├── seedrealtime.png
    │   ├── seedance-2-5.png
    │   ├── qwen-vibe-coding.png
    │   ├── figure-03.png
    │   ├── unitree-g1.png
    │   ├── flying-car.png
    │   └── reusable-rocket.png
    ├── scripts/export-slides.mjs
    ├── tests/
    │   ├── exhibit-data.test.ts
    │   ├── museum-flow.test.tsx
    │   ├── official-media.test.tsx
    │   └── progress.test.ts
    └── e2e/museum.spec.ts
```

每个文件只承担一个职责：展厅内容在 `data/`；状态在 `hooks/`；界面在 `app/components/`；PPT 渲染与导出独立于互动页。

## Task 1：建立 Sites 项目与第一块可识别的入馆首屏

**Files:**
- Create: `future-museum/`（由 Sites 脚手架生成）
- Modify: `future-museum/app/globals.css`
- Modify: `future-museum/app/layout.tsx`
- Modify: `future-museum/app/page.tsx`
- Create: `future-museum/app/components/MuseumEntrance.tsx`

- [ ] **Step 1：在独立目录创建 Sites 项目**

Run:

```bash
npm create --yes @openai/sites@0.3.0 future-museum -- --yes --add-ons shadcn --install
```

Expected: `future-museum/.openai/hosting.json`、`future-museum/app/page.tsx`、`future-museum/app/globals.css` 与依赖锁文件存在，安装命令退出码为 0。

- [ ] **Step 2：加入测试与幻灯片导出依赖**

Run:

```bash
cd future-museum
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test
```

Expected: `package.json` 和锁文件更新，无依赖解析错误。

- [ ] **Step 3：写入全站设计令牌**

在 `app/globals.css` 中保留脚手架必需导入，并把主题变量定为：

```css
:root {
  --museum-paper: #f5f7f6;
  --museum-ink: #071b31;
  --museum-blue: #225fd4;
  --museum-orange: #ff5b35;
  --museum-mist: #c9dceb;
  --museum-line: rgb(7 27 49 / 16%);
  --museum-display: "Songti SC", "STSong", "Noto Serif CJK SC", serif;
  --museum-body: "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  --museum-radius-media: 2px 56px 2px 2px;
}

html { background: var(--museum-paper); color: var(--museum-ink); }
body { margin: 0; font-family: var(--museum-body); }
*:focus-visible { outline: 3px solid var(--museum-orange); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; }
}
```

- [ ] **Step 4：实现最小入馆首屏**

`app/components/MuseumEntrance.tsx` 的公开接口固定为：

```tsx
type MuseumEntranceProps = { onEnter: () => void };

export function MuseumEntrance({ onEnter }: MuseumEntranceProps) {
  return (
    <main className="entrance" aria-labelledby="museum-title">
      <p className="entrance__eyebrow">THE FUTURE IS ALREADY HERE · 2026</p>
      <h1 id="museum-title">未来，<span>已经发生</span></h1>
      <p>七项正在改变世界的科技。看见它们，体验它们，也学会判断它们。</p>
      <button type="button" onClick={onEnter}>进入科技馆 <span aria-hidden="true">→</span></button>
    </main>
  );
}
```

`app/page.tsx` 暂时只渲染该组件，并在客户端保存 `entered` 状态。

- [ ] **Step 5：启动开发服务器并完成第一块有意义的预览**

Run:

```bash
npm run dev
```

Expected: 开发服务器输出本地 URL；另一个终端对该 URL 执行 `curl -I` 返回 200，页面已显示真实标题“未来，已经发生”，不是脚手架占位内容。达到此状态后才在 Codex 中打开一次预览。

- [ ] **Step 6：提交脚手架与入馆首屏**

```bash
git add future-museum
git commit -m "feat: scaffold immersive future museum"
```

## Task 2：建立展厅类型、官方来源数据与防误导测试

**Files:**
- Create: `future-museum/data/exhibit-schema.ts`
- Create: `future-museum/data/exhibits.ts`
- Create: `future-museum/tests/exhibit-data.test.ts`
- Create: `docs/sources.md`
- Modify: `future-museum/package.json`

- [ ] **Step 1：先写数据完整性测试**

`tests/exhibit-data.test.ts`：

```ts
import { describe, expect, it } from "vitest";
import { exhibits } from "../data/exhibits";

describe("exhibit data", () => {
  it("contains exactly seven unique exhibits", () => {
    expect(exhibits).toHaveLength(7);
    expect(new Set(exhibits.map((item) => item.id)).size).toBe(7);
  });

  it("uses secure official source links for every exhibit", () => {
    for (const exhibit of exhibits) {
      expect(exhibit.officialUrl).toMatch(/^https:\/\//);
      expect(exhibit.sources.length).toBeGreaterThan(0);
      expect(exhibit.sources.every((source) => source.url.startsWith("https://"))).toBe(true);
      expect(exhibit.accessedAt).toBe("2026-08-31");
    }
  });

  it("keeps a visible fallback for every external media item", () => {
    for (const exhibit of exhibits) {
      expect(exhibit.media.fallbackLabel).toBe("进入官网 / 查看官方原文");
      expect(exhibit.heroImage).toMatch(/^\/assets\/generated\/.+\.png$/);
    }
  });
});
```

- [ ] **Step 2：配置测试脚本并确认测试先失败**

在 `package.json` 添加：

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "export:slides": "node scripts/export-slides.mjs"
  }
}
```

Run: `npm test -- tests/exhibit-data.test.ts`  
Expected: FAIL，因为 `data/exhibits.ts` 尚不存在。

- [ ] **Step 3：定义稳定的数据接口**

`data/exhibit-schema.ts`：

```ts
export type ExhibitId =
  | "seedrealtime"
  | "seedance-2-5"
  | "qwen-vibe-coding"
  | "figure-03"
  | "unitree-g1"
  | "flying-car"
  | "reusable-rocket";

export type OfficialMedia = {
  kind: "video" | "iframe" | "official-page";
  src: string;
  poster?: string;
  loadPolicy: "click" | "metadata";
  fallbackLabel: "进入官网 / 查看官方原文";
};

export type Exhibit = {
  id: ExhibitId;
  order: number;
  number: string;
  shortName: string;
  title: string;
  headline: string;
  summary: string;
  evidenceLabel: string;
  boundary: string;
  question: string;
  facts: readonly { label: string; value: string; note: string }[];
  officialUrl: string;
  sources: readonly { label: string; url: string; type: "政府发布" | "企业官网" | "官方视频" | "技术报告" }[];
  accessedAt: "2026-08-31";
  media: OfficialMedia;
  heroImage: string;
  alt: string;
  accent: string;
};
```

- [ ] **Step 4：写入七项真实数据**

`data/exhibits.ts` 必须按以下顺序建立 `readonly Exhibit[]`：

1. SeedRealtime：官网 `https://seed.bytedance.com/zh/SeedRealtime`；视频使用官方博物馆案例 `https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/user-upload/5pq1omseu8bpt.mp4`；海报使用同路径 `5pq1omsej0civ.jpeg`；边界说明写“官方演示案例，复杂环境中仍可能看错、听错，持续使用摄像头和麦克风还涉及隐私”。
2. Seedance 2.5：官网 `https://seed.bytedance.com/zh/seedance2_5`；媒体种类为 `official-page`，只在点击后打开或尝试加载官网，不硬编码有防盗链的 MP4；边界说明写“生成得像电影，不等于记录的是真实事件”。
3. Qwen3.5-Omni：官方博客 `https://qwen.ai/blog?id=qwen3.5-omni`；B 站官方播放器 `https://player.bilibili.com/player.html?bvid=BV1RZXaB7Ewn&page=1&high_quality=1&danmaku=0&autoplay=0`；边界说明写“生成的代码仍需要人测试和修改”。
4. Figure 03：发布页 `https://www.figure.ai/news/introducing-figure-03`；轻量视频 `https://videos.ctfassets.net/qx5k8y1u9drj/7paGSRiSMhHqQVrBpeQ1Kg/c65b5fb1fdc7986d7e8d0061680ccea8/figure-03-01.mp4`；边界说明写“公司官方演示，不代表已经进入普通家庭或能应对所有家庭意外”。
5. Unitree G1：官网 `https://www.unitree.com/g1/`；B 站官方播放器 `https://player.bilibili.com/player.html?bvid=BV1QW42197LE&page=1&high_quality=1&danmaku=0&autoplay=0`；边界说明写“动作可能来自预设程序、遥控或训练系统，不能只凭画面判断是否完全自主”。
6. 小鹏汇天飞行汽车：官网 `https://www.xiaopeng.com/flyingcar.html`；海报 `https://s.xiaopeng.com/xp-fe/mainsite/2025/flyingCar/pc/p1.jpg`；点击后视频 `https://s.xiaopeng.com/xp-fe/mainsite/2025/flyingCar/video/p2.mp4`；边界说明写“官网产品展示和企业数据，具体配置与实际表现以正式产品信息为准”。
7. 可回收火箭：国家航天局页面 `https://www.cnsa.gov.cn/n6758823/n6758838/c10768762/content.html`；视频 `https://www.sastind.gov.cn/video/20260819.mp4`；边界说明写“完成一级回收不等于该枚火箭已经再次发射复用”。

每项都写入设计规格中的标题、摘要和问题，并填两张事实卡；不得把 Figure 写成已普及家庭产品，不得把 Unitree EDU 选配能力写成 G1 默认能力，不得把小鹏另一款飞行器的 `500km+`、`360km/h+` 参数写到陆地航母。

- [ ] **Step 5：建立可追溯来源清单**

`docs/sources.md` 按七个主题列出：官方页面、官方媒体 URL、适用的页面字段、访问日期 `2026-08-31`、嵌入方式、版权或防盗链限制。明确记录：Seedance 只链接/尝试展示官网；小鹏主视频约 93 MiB，必须点击后才加载；企业演示标记为企业官方演示。

- [ ] **Step 6：运行数据测试并提交**

Run: `npm test -- tests/exhibit-data.test.ts`  
Expected: 3 tests PASS。

```bash
git add future-museum/data future-museum/tests/exhibit-data.test.ts future-museum/package.json future-museum/package-lock.json docs/sources.md
git commit -m "feat: add verified exhibit content and sources"
```

## Task 3：用内置 `imagegen` 生成七张统一主视觉

**Files:**
- Create: `future-museum/public/assets/generated/*.png`
- Create: `deliverables/ppt-backgrounds/*.png`

- [ ] **Step 1：建立输出目录，保留用户已有图片不动**

Run:

```bash
mkdir -p future-museum/public/assets/generated deliverables/ppt-backgrounds deliverables/ppt-slides
```

Expected: 三个目录存在；不得覆盖工作区根目录中用户已有的 `ChatGPT Image 2026年8月31日 23_11_41 (1).png`。

- [ ] **Step 2：分别调用内置 `imagegen` 生成 SeedRealtime 主视觉**

Prompt:

```text
Use case: scientific-educational
Asset type: 16:9 immersive digital science museum exhibit hero and PowerPoint background
Primary request: visualize an AI assistant understanding a museum visitor through live sight and sound at the same time
Scene/backdrop: a refined contemporary science museum gallery, a student seen from behind facing an exhibit, subtle concentric sound waves and camera perception layers converging toward the exhibit
Subject: the interaction between one child visitor, the museum object, and an abstract AI perception field; no recognizable product UI
Style/medium: cinematic photoreal educational concept art, premium museum exhibition campaign
Composition/framing: wide 16:9, main action on the right two-thirds, calm negative space on the left for Chinese slide text
Lighting/mood: luminous cool daylight, deep ocean-blue shadows, one restrained signal-orange highlight
Color palette: spacecraft white, deep ocean blue, ice-mist blue, signal orange
Constraints: age-appropriate, scientifically legible, no logos, no text, no letters, no watermark, no user interface labels
Avoid: neon cyberpunk, surveillance menace, distorted hands, extra limbs, corporate branding
```

Save selected output as both `future-museum/public/assets/generated/seedrealtime.png` and `deliverables/ppt-backgrounds/01-seedrealtime.png`.

- [ ] **Step 3：分别调用内置 `imagegen` 生成 Seedance 2.5 主视觉**

Prompt:

```text
Use case: scientific-educational
Asset type: 16:9 immersive digital science museum exhibit hero and PowerPoint background
Primary request: show a simple idea transforming into a coherent cinematic audio-visual sequence
Scene/backdrop: premium museum projection hall where a paper storyboard gently unfolds into layered film frames, light, motion, and visible sound rhythm
Subject: a three-stage transformation from sketch to moving scene to finished cinematic frame; no actual movie characters or copyrighted imagery
Style/medium: cinematic photoreal educational concept art, refined exhibition advertising
Composition/framing: wide 16:9, transformation arc concentrated on the right, clean dark-to-light negative space on the left
Lighting/mood: warm projector light cutting through cool blue gallery air, curious and creative
Color palette: spacecraft white, deep ocean blue, muted violet-blue, signal orange accent
Constraints: age-appropriate, no logos, no text, no letters, no watermark, no UI, visually distinct from a real historical photograph
Avoid: celebrity likeness, copyrighted film frames, chaotic collage, neon cyberpunk
```

Save as `seedance-2-5.png` and `02-seedance-2-5.png`.

- [ ] **Step 4：分别调用内置 `imagegen` 生成 Qwen 音视频编程主视觉**

Prompt:

```text
Use case: scientific-educational
Asset type: 16:9 immersive digital science museum exhibit hero and PowerPoint background
Primary request: visualize a student showing a hand-drawn game idea to a multimodal AI while speaking, with the idea becoming a simple playable program
Scene/backdrop: elegant science museum maker studio, camera view of a paper sketch, soft sound-wave ribbons, and a clean projected game prototype
Subject: one student seen from behind, a paper sketch, and an abstract transformation into interface blocks and game logic; no readable code or branded screens
Style/medium: cinematic photoreal educational concept art with precise museum-installation polish
Composition/framing: wide 16:9, subject and projection on the right, generous darker negative space on the left for title
Lighting/mood: focused workshop light, optimistic discovery, blue-white projection with a restrained orange cue
Color palette: deep ocean blue, spacecraft white, ice blue, signal orange
Constraints: no logos, no text, no letters, no watermark, no legible code, age-appropriate, privacy-safe rear view
Avoid: hologram clichés, cyberpunk neon, distorted hands, complex unreadable UI
```

Save as `qwen-vibe-coding.png` and `03-qwen-vibe-coding.png`.

- [ ] **Step 5：分别调用内置 `imagegen` 生成 Figure 03 主视觉**

Prompt:

```text
Use case: scientific-educational
Asset type: 16:9 immersive digital science museum exhibit hero and PowerPoint background
Primary request: a friendly modern humanoid robot carefully organizing ordinary household objects in a calm home-like museum exhibit
Scene/backdrop: a realistic but curated model apartment inside a science museum, open shelf, folded towel, book, cup, safe uncluttered floor
Subject: one non-branded white-and-charcoal humanoid robot performing a careful two-handed organizing task; concept illustration, not a claim of product photography
Style/medium: cinematic photoreal educational concept art, premium industrial design campaign
Composition/framing: wide 16:9, robot and task on the right, quiet architectural negative space on the left
Lighting/mood: soft morning light, calm, capable, non-threatening
Color palette: spacecraft white, graphite, deep ocean blue shadows, signal orange micro-accent
Constraints: anatomically coherent robot, exactly two arms and two legs, realistic joint logic, no logos, no text, no watermark
Avoid: weaponized robot, glowing eyes, uncanny human face, extra fingers, disaster scene, cyberpunk
```

Save as `figure-03.png` and `04-figure-03.png`.

- [ ] **Step 6：分别调用内置 `imagegen` 生成 Unitree G1 主视觉**

Prompt:

```text
Use case: scientific-educational
Asset type: 16:9 immersive digital science museum exhibit hero and PowerPoint background
Primary request: explain how a compact humanoid robot senses space, balances, and moves through a real-world training course
Scene/backdrop: high-end robotics laboratory presented as a museum exhibit, low platform, balance markers, safe obstacle, subtle depth-sensing point cloud
Subject: one compact non-branded humanoid robot mid-step with believable balance and joint mechanics; visual emphasis on body control rather than intelligence claims
Style/medium: cinematic photoreal educational concept art, premium engineering exhibition
Composition/framing: wide 16:9, moving robot on the right, spacious left side for slide title, subtle floor trajectory
Lighting/mood: precise studio lighting, energetic but safe, cool blue with a restrained warm accent
Color palette: deep ocean blue, metallic gray, spacecraft white, signal orange
Constraints: exactly two arms and two legs, coherent mechanical anatomy, no logos, no text, no watermark, no martial arts aggression
Avoid: weapon imagery, dystopia, sparks, damaged robot, neon cyberpunk
```

Save as `unitree-g1.png` and `05-unitree-g1.png`.

- [ ] **Step 7：分别调用内置 `imagegen` 生成飞行汽车主视觉**

Prompt:

```text
Use case: scientific-educational
Asset type: 16:9 immersive digital science museum exhibit hero and PowerPoint background
Primary request: a modular road vehicle and detachable electric aircraft demonstrating the transition from driving to low-altitude flight
Scene/backdrop: controlled future mobility demonstration ground connected to a clean city edge, marked landing area, clear sky, visible safety perimeter
Subject: non-branded modular ground carrier with a compact aircraft unit shown separated nearby, engineering-focused and plausible
Style/medium: cinematic photoreal educational concept art, premium transportation museum campaign
Composition/framing: wide 16:9, vehicle system on the right, open sky and negative space on the left
Lighting/mood: bright early morning, hopeful and precise, not fantasy
Color palette: spacecraft white, deep ocean blue, pale sky blue, signal orange safety markings
Constraints: no logos, no text, no watermark, no dangerous traffic, no crowd under aircraft, credible scale and landing geometry
Avoid: flying through dense city traffic, crashes, fantasy wings, neon cyberpunk
```

Save as `flying-car.png` and `06-flying-car.png`.

- [ ] **Step 8：分别调用内置 `imagegen` 生成可回收火箭主视觉**

Prompt:

```text
Use case: scientific-educational
Asset type: 16:9 immersive digital science museum exhibit hero and PowerPoint background
Primary request: explain a reusable first-stage rocket returning vertically to a prepared landing zone after launch
Scene/backdrop: remote professional launch and recovery site at dusk, wide safety exclusion zone, distant launch infrastructure, subtle trajectory line in the sky
Subject: one non-branded stainless-steel-like first-stage booster descending upright with landing legs deployed and a controlled engine plume
Style/medium: cinematic photoreal educational concept art, national science museum exhibition poster
Composition/framing: wide 16:9, descending booster on the right, dramatic open sky and clean negative space on the left for Chinese title
Lighting/mood: blue-hour atmosphere, awe and engineering precision, restrained orange engine light
Color palette: deep ocean blue, steel silver, ice mist, signal orange
Constraints: physically plausible vertical orientation, exactly one booster, no logos, no text, no watermark, no explosion or disaster
Avoid: science-fiction spacecraft, multiple rockets, dense spectators, military imagery, neon cyberpunk
```

Save as `reusable-rocket.png` and `07-reusable-rocket.png`.

- [ ] **Step 9：逐张检查并只重做有问题的图片**

用图像查看工具检查七张图的主体、16:9 构图、负空间、人物手部、机器人肢体、机械结构、伪文字和系列一致性。出现问题时对单张发起一次针对性重生成；不得用 CSS 图形代替失败的 representational image。

- [ ] **Step 10：提交最终选中的七张图片**

```bash
git add future-museum/public/assets/generated deliverables/ppt-backgrounds
git commit -m "feat: add seven generated museum exhibit visuals"
```

## Task 4：实现探索轨道、双模式与进度状态

**Files:**
- Create: `future-museum/hooks/useMuseumProgress.ts`
- Create: `future-museum/app/components/ModePicker.tsx`
- Create: `future-museum/app/components/MuseumMap.tsx`
- Create: `future-museum/app/components/MuseumShell.tsx`
- Create: `future-museum/tests/progress.test.ts`
- Create: `future-museum/tests/museum-flow.test.tsx`
- Modify: `future-museum/app/page.tsx`

- [ ] **Step 1：先写进度持久化测试**

`tests/progress.test.ts` 验证存储键固定为 `future-museum-progress-v1`，无效 JSON 回退为空进度，完成展厅后写回唯一 ID 列表。

```ts
import { describe, expect, it } from "vitest";
import { parseStoredProgress } from "../hooks/useMuseumProgress";

describe("parseStoredProgress", () => {
  it("returns empty progress for invalid content", () => {
    expect(parseStoredProgress("not-json")).toEqual([]);
  });
  it("deduplicates valid ids", () => {
    expect(parseStoredProgress('["seedrealtime","seedrealtime"]')).toEqual(["seedrealtime"]);
  });
});
```

Run: `npm test -- tests/progress.test.ts`  
Expected: FAIL，因为函数尚不存在。

- [ ] **Step 2：实现状态 Hook**

`useMuseumProgress.ts` 导出：

```ts
export const STORAGE_KEY = "future-museum-progress-v1";
export function parseStoredProgress(raw: string | null): ExhibitId[];
export function useMuseumProgress(): {
  completed: ExhibitId[];
  markCompleted: (id: ExhibitId) => void;
  reset: () => void;
};
```

只在客户端访问 `localStorage`，捕获浏览器禁用存储时的异常，不收集身份信息。

- [ ] **Step 3：先写教师/学生流程测试**

`tests/museum-flow.test.tsx` 至少包含：

```tsx
it("enters student exploration mode and opens an exhibit", async () => {
  render(<MuseumShell />);
  await userEvent.click(screen.getByRole("button", { name: "进入科技馆" }));
  await userEvent.click(screen.getByRole("button", { name: "学生自主探索" }));
  await userEvent.click(screen.getByRole("button", { name: /SeedRealtime/ }));
  expect(screen.getByRole("heading", { name: "它在听你说，也在看世界" })).toBeInTheDocument();
});
```

Run: `npm test -- tests/museum-flow.test.tsx`  
Expected: FAIL，因为 `MuseumShell` 尚未实现。

- [ ] **Step 4：实现模式选择和轨道地图**

`ModePicker` 提供两个明确按钮：“教师大屏讲解”“学生自主探索”。`MuseumMap` 用七个真实展厅节点呈现进度，不使用无意义的 `01/02` 装饰；编号同时对应建议参观顺序。每个节点有 `aria-label`，已完成状态同时显示文字和图标。

- [ ] **Step 5：实现 MuseumShell 状态机与键盘导航**

状态固定为：

```ts
type MuseumView =
  | { screen: "entrance" }
  | { screen: "mode" }
  | { screen: "map"; mode: "teacher" | "student" }
  | { screen: "exhibit"; mode: "teacher" | "student"; exhibitId: ExhibitId }
  | { screen: "exit"; mode: "teacher" | "student" };
```

教师模式中左右方向键按顺序切换展厅；学生模式中左右方向键不抢占普通滚动。每次切换把焦点移到展厅标题。

- [ ] **Step 6：运行流程测试并提交**

Run: `npm test -- tests/progress.test.ts tests/museum-flow.test.tsx`  
Expected: PASS。

```bash
git add future-museum/app future-museum/hooks future-museum/tests
git commit -m "feat: add museum modes navigation and progress"
```

## Task 5：实现展厅、媒体加载、官网跳转与事实边界

**Files:**
- Create: `future-museum/app/components/ExhibitStage.tsx`
- Create: `future-museum/app/components/OfficialMediaPanel.tsx`
- Create: `future-museum/app/components/FactBoundary.tsx`
- Create: `future-museum/app/components/QuestionMoment.tsx`
- Create: `future-museum/app/components/SourceDrawer.tsx`
- Create: `future-museum/app/components/TeacherDock.tsx`
- Create: `future-museum/tests/official-media.test.tsx`

- [ ] **Step 1：先写媒体延迟加载与官网链接测试**

`tests/official-media.test.tsx`：

```tsx
it("keeps the official website link visible before media loads", () => {
  render(<OfficialMediaPanel exhibit={exhibits[0]} />);
  const link = screen.getByRole("link", { name: "进入官网 / 查看官方原文" });
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
});

it("does not mount click-to-load media before the student asks", async () => {
  render(<OfficialMediaPanel exhibit={exhibits.find((item) => item.id === "flying-car")!} />);
  expect(document.querySelector("video")).toBeNull();
  await userEvent.click(screen.getByRole("button", { name: "播放官方演示" }));
  expect(document.querySelector("video")).not.toBeNull();
});
```

Run: `npm test -- tests/official-media.test.tsx`  
Expected: FAIL，因为组件尚不存在。

- [ ] **Step 2：实现 OfficialMediaPanel**

组件规则：

```tsx
<a
  href={exhibit.officialUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  进入官网 / 查看官方原文
</a>
```

- `video`：默认只显示生成图或官方 poster；点击后才挂载 `<video controls playsInline preload="metadata">`。
- `iframe`：点击后挂载，`title` 使用展厅标题，添加 `allowFullScreen`，B 站播放器关闭自动播放与弹幕。
- `official-page`：显示“进入官方展映”按钮；教师选择后可在受控覆盖层尝试加载官网 iframe，同时始终保留新标签官网按钮；学生模式默认只新标签打开，避免第三方 Cookie 和滚动问题。
- `onError`：显示“课堂网络未能载入视频”，保留事实摘要和官网按钮。
- 不添加 `crossorigin="use-credentials"`，不尝试把跨域视频画到 Canvas。

- [ ] **Step 3：实现 FactBoundary 与 SourceDrawer**

`FactBoundary` 固定使用三段标签之一：“政府发布”“企业官方演示”“官方模型演示”。`SourceDrawer` 列出来源名称、官方 URL 与访问日期，不复制整篇原文。

- [ ] **Step 4：实现 QuestionMoment**

每个展厅提供一道单选或开放思考题。选项不是计分题；点击后显示一段引导性反馈，例如 Seedance 题目反馈必须包含“画面逼真不等于事实真实，还要查来源、时间和证据”。

- [ ] **Step 5：实现 ExhibitStage 和 TeacherDock**

`ExhibitStage` 组合主视觉、展签、媒体、事实卡、边界、问题、官网按钮和下一展厅。`TeacherDock` 提供全屏、跳过视频、上一展厅、下一展厅；全屏 API 不可用时隐藏全屏按钮，不弹出阻断错误。

- [ ] **Step 6：运行媒体与完整流程测试并提交**

Run: `npm test`  
Expected: 所有单元/组件测试 PASS。

```bash
git add future-museum/app/components future-museum/tests
git commit -m "feat: add exhibit media sources and classroom questions"
```

## Task 6：完成离馆总结、响应式布局和沉浸式动效

**Files:**
- Create: `future-museum/app/components/ExitReflection.tsx`
- Modify: `future-museum/app/globals.css`
- Modify: `future-museum/app/components/MuseumShell.tsx`
- Modify: `future-museum/app/layout.tsx`

- [ ] **Step 1：实现离馆总结**

页面固定归纳三条：

```text
AI 从“回答问题”走向“完成任务”
AI 从“文字”走向“声音、图像和视频”
AI 从“电脑里面”走向“真实世界”
```

最后显示开放问题“你希望未来科技先帮助人类解决什么问题？”，并提供“重新参观”和“查看全部官方来源”。

- [ ] **Step 2：实现三档响应式布局**

- `>= 1200px`：大屏三栏展厅，标题、主视觉、媒体同屏；
- `768px–1199px`：平板双栏，媒体位于主视觉下；
- `< 768px`：单栏，轨道变为可横向滚动节点，按钮最小触控高度 44px；
- 禁止页面出现横向溢出，媒体保持 16:9；
- 大屏标题使用 `clamp(3rem, 7vw, 7.6rem)`，正文不小于 16px。

- [ ] **Step 3：实现一次入馆主动画和克制的展厅切换**

动画只使用 `transform` 与 `opacity`。入馆轨道推进约 1.2 秒；展厅切换约 360ms；`prefers-reduced-motion` 下禁用。不得加入持续闪烁、无限粒子或背景自动缩放。

- [ ] **Step 4：补齐 metadata 与社交预览**

`app/layout.tsx` 设置：

```ts
export const metadata = {
  title: "未来已经发生｜沉浸式科技馆",
  description: "面向小学高年级的七项前沿科技互动展。",
};
```

社交预览图优先使用一张通过检查的系列主视觉，并叠加确定性网页文字生成 `public/og.png`；不得依赖 imagegen 在图片里准确生成中文。

- [ ] **Step 5：运行测试与构建并提交**

Run:

```bash
npm test
npm run build
```

Expected: 测试全部 PASS；生产构建退出码 0。

```bash
git add future-museum/app future-museum/public/og.png
git commit -m "feat: finish immersive museum experience"
```

## Task 7：建立确定性 PPT 幻灯片页面并导出七张 PNG

**Files:**
- Create: `future-museum/app/slides/[id]/page.tsx`
- Create: `future-museum/scripts/export-slides.mjs`
- Create: `deliverables/ppt-slides/*.png`

- [ ] **Step 1：实现固定 1920×1080 幻灯片页面**

`app/slides/[id]/page.tsx` 从 `exhibits` 查找 ID；未知 ID 返回 404。每页包含：展厅编号、中文标题、两句说明、主视觉、课堂问题、证据标签、官网域名。页面根节点固定 `width: 1920px; height: 1080px; overflow: hidden;`，不用响应式缩放改变排版。

页面文字只由 HTML/CSS 渲染，不由 imagegen 生成；标题使用中文系统字体回退，保证无伪字。

- [ ] **Step 2：实现批量导出脚本**

`scripts/export-slides.mjs`：

```js
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const ids = [
  "seedrealtime",
  "seedance-2-5",
  "qwen-vibe-coding",
  "figure-03",
  "unitree-g1",
  "flying-car",
  "reusable-rocket",
];
const base = process.env.SLIDE_BASE_URL ?? "http://127.0.0.1:3000";
const output = new URL("../../deliverables/ppt-slides/", import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
for (const [index, id] of ids.entries()) {
  await page.goto(`${base}/slides/${id}`, { waitUntil: "networkidle" });
  await page.locator("[data-slide-ready='true']").waitFor();
  await page.screenshot({ path: new URL(`${String(index + 1).padStart(2, "0")}-${id}.png`, output).pathname });
}
await browser.close();
```

- [ ] **Step 3：运行导出并核对尺寸**

Run:

```bash
SLIDE_BASE_URL=http://127.0.0.1:3000 npm run export:slides
sips -g pixelWidth -g pixelHeight ../deliverables/ppt-slides/*.png
```

Expected: 七张文件都报告 `pixelWidth: 1920`、`pixelHeight: 1080`。

- [ ] **Step 4：逐张查看中文排版**

用图像查看工具检查：标题无错字、文字未截断、问题可读、主视觉主体未被文字遮挡、来源域名正确。发现问题只修改幻灯片 CSS 或对应数据后重新导出，不修改无问题的 imagegen 原图。

- [ ] **Step 5：提交 PPT 成品**

```bash
git add future-museum/app/slides future-museum/scripts/export-slides.mjs deliverables/ppt-slides
git commit -m "feat: export seven classroom-ready ppt slides"
```

## Task 8：端到端验证、断网回退与官网跳转检查

**Files:**
- Create: `future-museum/e2e/museum.spec.ts`
- Create or Modify: `future-museum/playwright.config.ts`

- [ ] **Step 1：写完整课堂旅程测试**

`e2e/museum.spec.ts` 至少验证：

```ts
import { test, expect } from "@playwright/test";

test("teacher can enter, visit all exhibits, and reach the exit", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "进入科技馆" }).click();
  await page.getByRole("button", { name: "教师大屏讲解" }).click();
  for (let index = 0; index < 7; index += 1) {
    await expect(page.getByRole("link", { name: "进入官网 / 查看官方原文" })).toHaveAttribute("target", "_blank");
    await page.getByRole("button", { name: index === 6 ? "完成参观" : "下一展厅" }).click();
  }
  await expect(page.getByRole("heading", { name: "你希望未来科技先帮助人类解决什么问题？" })).toBeVisible();
});
```

- [ ] **Step 2：测试媒体失败回退**

在一个测试中拦截外部视频与 iframe 请求并 `abort()`；断言海报、事实边界、课堂问题和官网按钮仍然可见，页面不出现空白展厅。

- [ ] **Step 3：测试大屏、平板与手机视口**

使用 `1440×900`、`1024×768`、`390×844` 三个视口执行入馆、打开展厅和返回地图；断言 `document.documentElement.scrollWidth <= window.innerWidth`，关键按钮在视口内可见。

- [ ] **Step 4：运行全部验证**

Run:

```bash
npm test
npm run test:e2e
npm run build
```

Expected: 单元测试与 E2E 全部 PASS；构建退出码 0。若外网导致官方媒体测试不稳定，E2E 只验证自有回退和链接属性，不把第三方服务器可用性作为通过条件。

- [ ] **Step 5：提交验证代码**

```bash
git add future-museum/e2e future-museum/playwright.config.ts
git commit -m "test: verify classroom museum journeys and fallbacks"
```

## Task 9：最终来源复核、部署与交付

**Files:**
- Modify: `docs/sources.md`
- Modify: `future-museum/.openai/hosting.json`（仅在 Sites 部署需要时按脚手架格式保留完整配置）

- [ ] **Step 1：复核七个官网按钮**

逐项确认 URL：SeedRealtime、Seedance 2.5、Qwen 官方博客、Figure 03 发布页、Unitree G1 官网、小鹏飞行汽车页、国家航天局原文。所有按钮在新标签打开，并包含 `rel="noopener noreferrer"`。

- [ ] **Step 2：复核版权、隐私与能力边界**

确认 Seed 资源未下载进公开包；小鹏、Figure 和国家航天局视频采用远程引用；学生模式不请求摄像头、麦克风、登录或个人信息；所有企业演示都显示“官方企业演示｜能力仍在发展”。

- [ ] **Step 3：运行最后一次干净构建**

Run:

```bash
cd future-museum
npm run build
```

Expected: 退出码 0，产物包含首页和七个幻灯片路由。

- [ ] **Step 4：使用 Sites 托管流程发布**

按照 `sites-hosting` 技能读取当前 `.openai/hosting.json`、验证项目与部署设置后发布。部署完成后打开部署 URL，确认首页可达；不把第三方视频能否实时连通作为部署成功的唯一标准。

- [ ] **Step 5：最终提交并报告交付路径**

```bash
git add docs/sources.md future-museum/.openai/hosting.json
git commit -m "docs: finalize museum sources and deployment"
git status --short
```

Expected: 只允许保留用户原有、未纳入项目的文件为 untracked；报告以下交付：部署 URL、本地项目目录、七张无文字背景目录、七张 PPT PNG 目录、来源文档。不要声称未实际验证的外部视频永久可用。

## 自查结果

- 规格中的七个展厅、双模式、探索轨道、来源抽屉、媒体失败回退、官网跳转、适龄问题、事实边界、七张 imagegen 主视觉、七张 PPT PNG、响应式、键盘和部署均有对应任务。
- 计划中的每一步都有明确文件、命令、内容和预期结果，没有未决占位内容。
- `ExhibitId`、媒体类型、文件名和七个路由 ID 在数据、测试、图片与导出脚本中保持一致。
