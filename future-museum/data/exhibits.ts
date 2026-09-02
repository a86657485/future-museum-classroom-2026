export type Exhibit = {
  id: string;
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
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
    | {
        kind: 'prompt-carousel';
        scenes: readonly {
          title: string;
          description: string;
          src: string;
          poster: string;
          captions: string;
          prompt: string;
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
    summary: '声音、画面、语境，同时理解，适时回应。',
    question: '它一直看着、听着，该遵守什么规则？',
    image: '/assets/generated/seedrealtime.png',
    alt: '学生在科技馆观看展品，声音和视觉信息同时汇聚的概念图',
    officialUrl: 'https://seed.bytedance.com/zh/SeedRealtime',
    source: '字节跳动 Seed 官网',
    media: {
      kind: 'carousel',
      scenes: [
        {
          title: '辅导学生读英语',
          description: '背景声嘈杂，依然跟住手指方向，纠正发音。',
          src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/user-upload/5pq1omseo6r3h.mp4',
          poster: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/user-upload/5pq1omsej1cae.jpeg',
          captions: '/captions/seedrealtime-english-tutoring.vtt',
        },
        {
          title: '跨语言交流',
          description: '看懂你所在的环境，给出应景的翻译。',
          src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/user-upload/5pq1omsej20yk.mp4',
          poster: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/lapzild-tss/ljhwZthlaukjlkulzlp/user-upload/5pq1omsej05r1.png',
          captions: '/captions/seedrealtime-cross-language.vtt',
        },
        {
          title: '博物馆主动讲解',
          description: '锁定参观目标，出现即讲解。',
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
    summary: '文字与参考画面，生成有声电影，还可延长与编辑。',
    question: '画面如此逼真，为什么不能当作证据？',
    image: '/assets/generated/seedance-2-5.png',
    alt: '纸面分镜变成连续电影画面的概念图',
    officialUrl: 'https://seed.bytedance.com/zh/seedance2_5',
    source: '字节跳动 Seed 官网',
    media: {
      kind: 'prompt-carousel',
      scenes: [
        {
          title: '更长叙事，更稳掌控',
          description: '单段 30 秒，可延长两次，叙事完整。',
          src: '/videos/seedance-barbershop.mp4',
          poster: '/videos/seedance-barbershop.jpg',
          captions: '/captions/seedance-barbershop.vtt',
          prompt: '一家老社区理发店即将打烊。外面天色已经变暗，街道微蓝，店内是暖黄色灯光。墙上有老照片、旧理发证书、褪色的顾客合影。人物设定：理发师，客人，两人关系自然熟悉，像多年社区老友，不要夸张表演。……[官网省略约 1250 字]',
        },
        {
          title: '精细化参考与编辑',
          description: '读懂参考画面，从模仿升级为演绎。',
          src: '/videos/seedance-paper-dog.mp4',
          poster: '/videos/seedance-paper-dog.jpg',
          captions: '/captions/seedance-paper-dog.vtt',
          prompt: '[参考生成] 整体内容要求：2D角色与3D世界的趣味交互，电影质感，可爱温馨，真实场景；角色设定：纸片小狗 @图片1 大小与拳头一致，并且为二维存在2D，纸片小狗 @图片1 的侧面是一张纸的厚度，纸片小狗 @图片1 的四肢与耳朵是可拆分的纸片在表达角色动作和情绪是可与躯干分离，纸片小狗 @图片1 一切的动作都有像定格动画一样的抽帧效果；黄色小狗 @图片2，真实存在的黄色幼犬。……[官网省略约 730 字]',
        },
        {
          title: '为专业视频创作而生',
          description: '白模控制、绿幕编辑，适配专业制作。',
          src: '/videos/seedance-whitebox.mp4',
          poster: '/videos/seedance-whitebox.jpg',
          captions: '/captions/seedance-whitebox.vtt',
          prompt: '以白模参考视频作为整支视频唯一的运镜、镜头节奏、景别变化、主体运动轨迹和镜头调度参考。结合各阶段关键帧参考图，生成一部30秒电影级3D动画短片，整体风格梦幻、童话、温暖，具有儿童幻想色彩，角色外形与各阶段的关键帧保持一致，不要改变角色形象，人物表情情绪随场景变化而改变。……[官网省略约 1000 字]',
        },
      ],
    },
  },
  {
    id: 'qwen-vibe-coding',
    name: 'Qwen3.5-Omni',
    eyebrow: 'AI · 音视频编程',
    headline: '说出想法，程序即成',
    summary: '展示画面、说出想法，AI 现场生成网页与小游戏。',
    question: 'AI 会写程序了，我们还该学什么？',
    image: '/assets/generated/qwen-vibe-coding.png',
    alt: '学生展示游戏草图，声音与画面转化为程序原型的概念图',
    officialUrl: 'https://qwen.ai/blog?id=qwen3.5-omni',
    source: 'Qwen 官方博客与官方视频',
    media: {
      kind: 'video',
      src: '/videos/qwen-vibe-coding.mp4',
      poster: '/videos/qwen-vibe-coding.jpg',
    },
  },
  {
    id: 'figure-03',
    name: 'Figure 03',
    eyebrow: '机器人 · 家庭场景',
    headline: '家务，交给机器人',
    summary: '从洗碗机到卧室，连续家务一气呵成。',
    question: '做家务，最难的是力气，还是理解？',
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
    headline: '当 AI 有了身体',
    summary: '摄像头、激光雷达与关节电机，让它行走、奔跑、保持平衡。',
    question: '会走路会跳舞，就等于理解世界吗？',
    image: '/assets/generated/unitree-g1.png',
    alt: '人形机器人在安全训练台上练习平衡的概念图',
    officialUrl: 'https://www.unitree.com/g1/',
    source: '宇树科技官网与官方视频',
    media: {
      kind: 'video',
      src: '/videos/unitree-g1.mp4',
      poster: '/videos/unitree-g1.jpg',
    },
  },
  {
    id: 'flying-car',
    name: '小鹏汇天飞行汽车',
    eyebrow: '未来交通 · 低空飞行',
    headline: '从公路，驶向天空',
    summary: '陆行体与飞行体，自动分离与结合。',
    question: '会飞之后，还要解决什么？',
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
    summary: '2026年8月，朱雀三号一子级陆地回收成功。',
    question: '火箭可重复使用，航天会变成什么样？',
    image: '/assets/generated/reusable-rocket.png',
    alt: '火箭一级在蓝色暮光中垂直返回着陆场的概念图',
    officialUrl: 'https://www.cnsa.gov.cn/n6758823/n6758838/c10768762/content.html',
    source: '国家航天局；素材来源：蓝箭航天',
    media: { kind: 'video', src: 'https://www.sastind.gov.cn/video/20260819.mp4' },
  },
];
