'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Input } from '@/components/ui/input';
import { isValidEmail } from '@/utils';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { signInWithEmailAndPassword } from '../services/actions';

function EmailLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isPending, startTransition] = useTransition();

  const isFormValid = isValidEmail(email) && password.length >= 6;

  const action = async () => {
    if (!isFormValid || isPending) return;
    setErrMsg('');
    startTransition(async () => {
      const err = await signInWithEmailAndPassword(email, password);
      if (err) {
        setErrMsg(err);
        return;
      }
      router.push('/');
    });
  };

  return (
    <div className='grid gap-4'>
      <Input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete='current-email'
        disabled={isPending}
      />
      <Input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete='current-password'
        disabled={isPending}
      />
      <SubmitServerActionButton
        isPending={isPending}
        disabled={!isFormValid}
        errMsg={errMsg}
        action={action}
      >
        Login
      </SubmitServerActionButton>
    </div>
  );
}

export default EmailLoginForm;
