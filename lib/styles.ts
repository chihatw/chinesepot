export const buttonBase =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0';

export const buttonPrimary = `${buttonBase} h-10 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800`;

export const buttonGhost = `${buttonBase} h-10 px-4 py-2 hover:bg-slate-100 hover:text-slate-900`;

export const buttonGhostSm = `${buttonBase} h-9 px-3 hover:bg-slate-100 hover:text-slate-900`;

export const buttonGhostIcon = `${buttonBase} h-10 w-10 hover:bg-slate-100 hover:text-slate-900`;

export const inputStyle =
  'flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
