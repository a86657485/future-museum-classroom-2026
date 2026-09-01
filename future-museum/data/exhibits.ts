export type Exhibit = {
  id: string;
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  boundary: string;
  question: string;
  image: string;
  alt: string;
  officialUrl: string;
  source: string;
  media:
    | { kind: 'video'; src: string; poster?: string }
    | {
        kind: 'carousel';
        scenes: readonly {
          title: string;
          description: string;
          src: string;
          poster: string;
          captions: string;
        }[];
      }
    | { kind: 'iframe'; src: string; title: string }
    | { kind: 'official-page' };
};

export const exhibits: Exhibit[] = [
  {
    id: 'seedrealtime',
    name: 'SeedRealtime',
    eyebrow: 'AI · 实时音视频交互',
    headline: '它在听你说，也在看世界',
    summary: 'AI开始同时理解声音、画面和前后的约定，并选择合适的时机回应。',
    boundary: '字节跳动官方演示；复杂环境中仍可能看错或听错。',
    question: '如果AI一直看着、听着，它应该遵守哪些规则？',
    image: '/assets/generated/seedrealtime.png',
    alt: '学生在科技馆观看展品，声音和视觉信息同时汇聚的概念图',
    officialUrl: 'https://seed.bytedance.com/zh/SeedRealtime',
    source: '字节跳动 Seed 官网',
    media: {
      kind: 'carousel',
      scenes: [
        {
          title: '多人交错对话',
          description: '同时认人、辨声和理解讨论内容，在合适的时机接话。',
          src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/user-upload/5pq1omsej1mh2.mp4',
          poster: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/user-upload/5pq1omseizyso.jpg',
          captions: '/captions/seedrealtime-multi-speaker.vtt',
        },
        {
          title: '跨语言交流',
          description: '结合实时画面理解用户所处场景，提供更有针对性的翻译与帮助。',
          src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/user-upload/5pq1omsej20yk.mp4',
          poster: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/user-upload/5pq1omsej05r1.png',
          captions: '/captions/seedrealtime-cross-language.vtt',
        },
        {
          title: '博物馆主动讲解',
          description: '持续关注参观目标，在目标出现时主动提醒，并结合画面自然讲解。',
          src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/user-upload/5pq1omseu8bpt.mp4',
          poster: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/user-upload/5pq1omsej0civ.jpeg',
          captions: '/captions/seedrealtime-museum.vtt',
        },
      ],
    },
  },
  {
    id: 'seedance-2-5',
    name: 'Seedance 2.5',
    eyebrow: 'AI · 音视频生成',
    headline: '一句话，也能成为一段电影',
    summary: '它可以根据文字或参考材料生成带画面和声音的视频，并继续延长或编辑。',
    boundary: '生成得像电影，不等于记录的是真实事件。',
    question: '一段画面很逼真的视频，为什么仍不能直接当作新闻证据？',
    image: '/assets/generated/seedance-2-5.png',
    alt: '纸面分镜变成连续电影画面的概念图',
    officialUrl: 'https://seed.bytedance.com/zh/seedance2_5',
    source: '字节跳动 Seed 官网',
    media: { kind: 'official-page' },
  },
  {
    id: 'qwen-vibe-coding',
    name: 'Qwen3.5-Omni',
    eyebrow: 'AI · AUDIO-VISUAL VIBE CODING',
    headline: '不只打字，也能创造程序',
    summary: '人可以把画面展示给AI，再用语言说明想法，让AI尝试生成网页或小游戏代码。',
    boundary: '这是官方模型能力演示；生成的程序仍要由人检查和测试。',
    question: '当AI可以帮我们写程序，信息科技课还应该学习什么？',
    image: '/assets/generated/qwen-vibe-coding.png',
    alt: '学生展示游戏草图，声音与画面转化为程序原型的概念图',
    officialUrl: 'https://qwen.ai/blog?id=qwen3.5-omni',
    source: 'Qwen 官方博客与官方视频',
    media: {
      kind: 'iframe',
      src: 'https://player.bilibili.com/player.html?bvid=BV1RZXaB7Ewn&page=1&high_quality=1&danmaku=0&autoplay=0',
      title: 'Qwen3.5-Omni 官方演示',
    },
  },
  {
    id: 'figure-03',
    name: 'Figure 03',
    eyebrow: '机器人 · 家庭场景',
    headline: '机器人开始挑战连续家务',
    summary: 'Figure的官方演示展示了机器人整理洗碗机、收拾卧室等连续任务。',
    boundary: '企业官方演示，不代表机器人已经进入普通家庭或能应对所有意外。',
    question: '机器人做家务，最难的是有力气，还是看懂复杂环境？',
    image: '/assets/generated/figure-03.png',
    alt: '人形机器人在家庭环境中整理杯子的概念图',
    officialUrl: 'https://www.figure.ai/news/introducing-figure-03',
    source: 'Figure 官网',
    media: {
      kind: 'video',
      src: 'https://videos.ctfassets.net/qx5k8y1u9drj/7paGSRiSMhHqQVrBpeQ1Kg/c65b5fb1fdc7986d7e8d0061680ccea8/figure-03-01.mp4',
    },
  },
  {
    id: 'unitree-g1',
    name: 'Unitree G1',
    eyebrow: '机器人 · 感知与运动',
    headline: '当AI拥有一个可以行动的身体',
    summary: '摄像头、激光雷达、关节电机和控制系统共同帮助人形机器人移动与保持平衡。',
    boundary: '动作可能来自程序、遥控或训练系统，不能只看画面就判断它完全自主。',
    question: '很会走路和跳舞，就代表机器人真正理解任务了吗？',
    image: '/assets/generated/unitree-g1.png',
    alt: '人形机器人在安全训练台上练习平衡的概念图',
    officialUrl: 'https://www.unitree.com/g1/',
    source: '宇树科技官网与官方视频',
    media: {
      kind: 'iframe',
      src: 'https://player.bilibili.com/player.html?bvid=BV1QW42197LE&page=1&high_quality=1&danmaku=0&autoplay=0',
      title: '宇树科技 G1 官方视频',
    },
  },
  {
    id: 'flying-car',
    name: '小鹏汇天飞行汽车',
    eyebrow: '未来交通 · 低空飞行',
    headline: '从公路，驶向天空',
    summary: '“陆地航母”由陆行体和飞行体组成，官网展示了自动分离、结合与飞行。',
    boundary: '企业产品页资料；真正进入生活还要满足安全、取证和管理要求。',
    question: '会飞只是第一步，它还需要解决哪些现实问题？',
    image: '/assets/generated/flying-car.png',
    alt: '模块化汽车与电动飞行器在安全测试场展示的概念图',
    officialUrl: 'https://www.xiaopeng.com/flyingcar.html',
    source: '小鹏汽车官网',
    media: {
      kind: 'video',
      src: 'https://s.xiaopeng.com/xp-fe/mainsite/2025/flyingCar/video/p2.mp4',
      poster: 'https://s.xiaopeng.com/xp-fe/mainsite/2025/flyingCar/pc/p1.jpg',
    },
  },
  {
    id: 'reusable-rocket',
    name: '可回收火箭',
    eyebrow: '航天 · 重复使用',
    headline: '火箭完成任务后，为什么还要回来？',
    summary: '2026年8月19日，朱雀三号遥二火箭一子级按计划完成陆地回收。',
    boundary: '国家航天局发布；完成回收不等于这一枚火箭已经再次发射复用。',
    question: '火箭如果能够重复使用，航天活动可能发生什么变化？',
    image: '/assets/generated/reusable-rocket.png',
    alt: '火箭一级在蓝色暮光中垂直返回着陆场的概念图',
    officialUrl: 'https://www.cnsa.gov.cn/n6758823/n6758838/c10768762/content.html',
    source: '国家航天局；素材来源：蓝箭航天',
    media: { kind: 'video', src: 'https://www.sastind.gov.cn/video/20260819.mp4' },
  },
];
