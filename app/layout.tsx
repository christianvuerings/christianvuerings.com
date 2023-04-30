import { ReactNode } from 'react';
import './global.css';
import Footer from './Footer';
import Header from './Header';

export const metadata = {
  description: 'Blog',
  title: {
    default: 'Christian Vuerings',
    template: '%s | Christian Vuerings',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
