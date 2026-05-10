import Link from 'next/link';

import HeaderLogoutButton from '@/features/auth/components/HeaderLogoutButton';

import { buttonGhost, buttonGhostIcon } from '@/lib/styles';
import { createClient } from '@/utils/supabase/server';
import { DoorClosed, Home } from 'lucide-react';

const LINKS: { url: string; label: string }[] = [
  { url: '/articles', label: '文章一覧' },
];

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className='grid h-12 shadow-sm'>
      <div className='container flex w-full items-center justify-between mx-auto'>
        <div className='flex gap-x-4 items-center'>
          <Link href={'/'} className={buttonGhostIcon}>
            <Home />
          </Link>
          {user ? (
            <>
              <Link href={'/articles/new'} className={buttonGhost}>
                <span>新規文章作成</span>
              </Link>
              {LINKS.map((link) => (
                <Link key={link.url} href={link.url} className={buttonGhost}>
                  {link.label}
                </Link>
              ))}
            </>
          ) : null}
        </div>
        <div className='flex items-center gap-x-2'>
          {user ? (
            <HeaderLogoutButton />
          ) : (
            <Link href={'/login'} className={buttonGhostIcon}>
              <DoorClosed />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
