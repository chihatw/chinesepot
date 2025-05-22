'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidEmail } from '@/utils';
import { Loader2 } from 'lucide-react';
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
    <form action={action} className='grid gap-4'>
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
      {errMsg && <div className='text-red-500 text-sm'>{errMsg}</div>}
      <Button
        type='submit'
        disabled={isPending || !isFormValid}
        className='flex items-center gap-x-0.5'
      >
        Login
        {isPending ? <Loader2 className='animate-spin' /> : null}
      </Button>
    </form>
  );
}

export default EmailLoginForm;
