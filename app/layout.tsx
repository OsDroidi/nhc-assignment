import type { Metadata } from 'next';
import './globals.css';
import Footer from 'components/footer';
import Header from 'components/header';
import { inter, abel } from './fonts';
import { StoreProvider } from 'store/StoreProvider';

export const metadata: Metadata = {
  title: 'NHC',
  description: 'NHC National Housing Company',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${inter.variable} ${abel.variable}`}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
