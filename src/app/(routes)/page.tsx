import { signIn, auth } from '@/auth';
import Loading from '@/components/Loading';
import UserHome from '@/components/UserHome';
import { Suspense } from 'react';

export default async function Home() {
  const session = await auth();

  return (
    <div className='px-6'>
      {session ? (
        <Suspense fallback={<Loading />}>
          <UserHome />
        </Suspense>
      ) : (
        <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
        >
          <button
            className='border px-4 py-2 bg-ig-red text-white rounded-lg'
            type='submit'
          >
            Signin with Google
          </button>
        </form>
      )}
    </div>
  );
}
