import Header from '@/components/header';
import HowOldAmI from '@/features/birthday/components/HowOldAmI';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen grid grid-rows-[48px,1fr,auto] gap-10 bg-slate-200 text-gray-700 ',
          fontSans.className
        )}
      >
        <Header />
        <div>{children}</div>
        <HowOldAmI />
      </body>
    </html>
  );
}
