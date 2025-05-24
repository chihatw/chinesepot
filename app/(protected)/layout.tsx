import Header from '@/components/header';
import React from 'react';

type Props = { children?: React.ReactNode };

const ProtectedLayout = ({ children }: Props) => {
  return (
    <div>
      <nav className='pb-10'>
        <Header />
      </nav>
      {children}
    </div>
  );
};

export default ProtectedLayout;
