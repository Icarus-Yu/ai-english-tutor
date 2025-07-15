'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

import { register, type RegisterActionState } from '../actions';
import { toast } from '@/components/toast';
import { useSession } from 'next-auth/react';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: 'idle',
    },
  );

  const { update: updateSession } = useSession();

  useEffect(() => {
    if (state.status === 'user_exists') {
      toast({ type: 'error', description: 'Account already exists!' });
    } else if (state.status === 'failed') {
      toast({ type: 'error', description: 'Failed to create account!' });
    } else if (state.status === 'invalid_data') {
      toast({
        type: 'error',
        description: 'Failed validating your submission!',
      });
    } else if (state.status === 'success') {
      toast({ type: 'success', description: 'Account created successfully!' });

      setIsSuccessful(true);
      updateSession();
      router.push('/books');
    }
  }, [state]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('email') as string);
    formAction(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-10 h-10 object-cover rounded-lg"
              />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              智言
            </h1>
          </Link>
        </div>
        <div className="border-yellow-100 shadow-xl bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-10 flex flex-col gap-8">
          <div className="flex flex-col items-center gap-2 text-center">
            <h3 className="text-2xl font-bold text-gray-800">注册账号</h3>
            <p className="text-sm text-gray-600">创建你的智言账号</p>
          </div>
          <AuthForm action={handleSubmit} defaultEmail={email}>
            <SubmitButton isSuccessful={isSuccessful}>注册</SubmitButton>
            <p className="text-center text-sm text-gray-600 mt-4">
              已有账号？{' '}
              <Link
                href="/login"
                className="font-semibold text-amber-600 hover:text-orange-600 hover:underline"
              >
                立即登录
              </Link>
            </p>
          </AuthForm>
        </div>
      </div>
    </div>
  );
}
