import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: '未来已经发生｜沉浸式科技馆',
  description: '面向小学高年级的七项前沿科技互动展。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
