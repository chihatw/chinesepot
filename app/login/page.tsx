import EmailLoginForm from '@/features/auth/components/EmailLoginForm';

const Login = () => {
  return (
    <div className='flex-1 flex items-center '>
      <div className='w-full max-w-sm mx-auto translate-y-[-48px] '>
        <EmailLoginForm />
      </div>
    </div>
  );
};

export default Login;
