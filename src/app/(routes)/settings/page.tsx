import SettingsForm from '@/components/SettingsForm';
import { auth } from '@/auth';
import { prisma } from '@/db';
import { signOut } from '@/auth';
import { Button } from '@radix-ui/themes';

const SettingsPage = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    return 'not logged out';
  }
  const profile = await prisma.profile.findFirst({
    where: { email: session.user.email },
  });
  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Profile settings:</h1>
      <p className='text-sm text-gray-500 text-center -mt-4'>
        {session.user.email}
      </p>
      <SettingsForm userEmail={session.user.email} profile={profile} />
      <div className='flex justify-center mt-4 pt-4 border-t border-gray-200'>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <Button type='submit' variant='outline'>
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
