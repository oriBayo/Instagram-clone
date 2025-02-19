import { signIn, auth } from '@/auth';
import UserHome from '@/components/UserHome';

export default async function Home() {
  const session = await auth();

  return (
    <div className='px-6'>
      {session ? (
        <UserHome />
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
