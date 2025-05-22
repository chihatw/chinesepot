import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <div className='bg-slate-200 min-h-screen flex flex-col'>
          {children}
        </div>
      </body>
    </html>
  );
}
