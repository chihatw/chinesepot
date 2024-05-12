import Link from 'next/link';

import HeaderLogoutButton from '@/features/auth/components/HeaderLogoutButton';
import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { DoorClosed, Home } from 'lucide-react';
import { buttonVariants } from './ui/button';

const LINKS: { url: string; label: string }[] = [
  { url: '/article/list', label: 'Article List' },
];

const Header = async () => {
  const supabase = createSupabaseServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className='grid h-12 shadow'>
      <div className='container flex w-full items-center justify-between mx-auto'>
        <div className='flex gap-x-4 items-center'>
          <Link
            href={'/'}
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
          >
            <Home />
          </Link>
          {user ? (
            <>
              <Link
                href={'/article/form'}
                className={buttonVariants({ variant: 'ghost' })}
              >
                <span>Create New Article</span>
              </Link>
              {LINKS.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  className={buttonVariants({ variant: 'ghost' })}
                >
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
            <Link
              href={'/login'}
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
            >
              <DoorClosed />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
