'use client';

import { buttonGhostIcon } from '@/lib/styles';
import { DoorOpen } from 'lucide-react';
import { logout } from '../services/actions';

type Props = {};

const HeaderLogoutButton = (props: Props) => {
  const signOut = async () => {
    logout();
  };

  return (
    <form action={signOut}>
      <button className={buttonGhostIcon} type='submit'>
        <DoorOpen />
      </button>
    </form>
  );
};

export default HeaderLogoutButton;
