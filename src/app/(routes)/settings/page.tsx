import SettingsForm from '@/components/SettingsForm';
import { auth } from '@/auth';
import { prisma } from '@/db';

const SettingsPage = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    return 'not logged out';
  }
  const profile = await prisma.profile.findFirstOrThrow({
    where: { email: session.user.email },
  });
  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Profile settings:</h1>
      <SettingsForm userEmail={session.user.email} profile={profile} />
    </div>
  );
};

export default SettingsPage;
