import { Abel, Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export const abel = Abel({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-abel',
});
