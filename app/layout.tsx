import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AppProviders } from '@/components/providers/AppProviders';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RightsGuard AI — Know Your Rights in Malawi',
  description:
    'Confidential legal guidance for survivors of gender-based violence in Malawi. Safe, private, and no data stored.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200`}
      >
        <ThemeProvider>
          <AppProviders>
            <Header />
            <main className="ml-20 min-h-screen flex-1 w-[calc(100%-5rem)] md:ml-64 md:w-[calc(100%-16rem)]">{children}</main>
            <div className="ml-20 md:ml-64"><Footer /></div>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
