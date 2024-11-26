import { signIn, auth, signOut } from '@/auth';

export default async function Home() {
  const session = await auth();
  return (
    <main>
      {session ? (
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button
            className='border px-4 py-2 bg-ig-red text-white rounded-lg'
            type='submit'
          >
            Logout
          </button>
        </form>
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
    </main>
  );
}
