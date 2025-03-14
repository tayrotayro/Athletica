'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signInWithCredentials } from '@/lib/actions/user.actions';
import { signInDefaultValues } from '@/lib/constants';
import { useSearchParams } from 'next/navigation';

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: ''
  })

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const SignInButton = () => {
    const { pending } = useFormStatus()

    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? 'Signing In...' : 'Sign In'}
      </Button>
    )
  }

  return <form action={action}>
    <input type='hidden' name='callbackUrl' value={callbackUrl} />
    <div className="space-y-6">
      <div>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          defaultValue={signInDefaultValues.email}
        />
      </div>
      <div>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          name='password'
          type='password'
          autoComplete='password'
          defaultValue={signInDefaultValues.password}
        />
      </div>
      <div>
        <SignInButton />
      </div>

      {data && !data.success && (
        <div className='text-center text-destructive'>{data.message}</div>
      )}

      <div className="text-sm text-center text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href='/sign-up' target='_self' className='link'>
          Sign Up
        </Link>
      </div>
    </div>
  </form>;
}

export default CredentialsSignInForm;