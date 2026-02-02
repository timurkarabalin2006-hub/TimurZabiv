import Header from '../components/header';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Мой проект на Next.js',
  description: 'Лабораторная работа Part 1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Header /> {/* Ставим шапку ПЕРЕД контентом страниц */}
        {children} {/* Здесь будет отображаться содержимое из page.tsx */}
      </body>
    </html>
  );
}