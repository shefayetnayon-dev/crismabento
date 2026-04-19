import type {Metadata} from 'next';
import { Space_Grotesk } from 'next/font/google';
import { SmoothScroll } from '@/components/SmoothScroll';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Crimson Bento | Premium Portfolio',
  description: 'A cutting-edge, ultra-responsive portfolio landing page with an Apple-style Bento Grid layout.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className="bg-[#050505] text-white antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
