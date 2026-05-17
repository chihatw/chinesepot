'use client';

import { buttonGhostIcon } from '@/lib/styles';
import { DoorOpen } from 'lucide-react';
import { logout } from '../services/actions';

type Props = {};

const HeaderLogoutButton = (props: Props) => {
  return (
    <form action={logout}>
      <button className={buttonGhostIcon} type='submit'>
        <DoorOpen />
      </button>
    </form>
  );
};

export default HeaderLogoutButton;
