'use client';

import { Button } from '@/components/ui/button';
import { DoorOpen } from 'lucide-react';
import { logout } from '../services/actions';

type Props = {};

const HeaderLogoutButton = (props: Props) => {
  const signOut = async () => {
    logout();
  };

  return (
    <form action={signOut}>
      <Button variant={'ghost'} size={'icon'} type='submit'>
        <DoorOpen />
      </Button>
    </form>
  );
};

export default HeaderLogoutButton;
