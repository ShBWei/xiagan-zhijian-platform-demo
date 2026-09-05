import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '侠肝智鉴｜肝癌 TKI 耐药研究辅助分析平台',
  description: '多组学驱动的肝癌 TKI 耐药研究辅助分析与科研协作平台演示界面',
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
