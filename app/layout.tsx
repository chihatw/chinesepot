import NextTopLoader from 'nextjs-toploader';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <NextTopLoader
          color='#0f172a'
          height={3}
          showSpinner={false}
          zIndex={9999}
          shadow='0 0 0 transparent'
        />
        <div className='bg-slate-200 min-h-screen flex flex-col'>
          {children}
        </div>
      </body>
    </html>
  );
}
