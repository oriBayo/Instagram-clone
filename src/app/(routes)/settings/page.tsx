import { auth } from '@/auth';
import { prisma } from '@/db';

import SettingContent from '@/components/SettingContent';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { redirect } from 'next/navigation';

const SettingsPage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return redirect('/login');
  }
  const profile = await prisma.profile.findFirst({
    where: { email: session.user.email },
  });
  return (
    <Suspense fallback={<Loading />}>
      <SettingContent profile={profile!} />
    </Suspense>
  );
};

export default SettingsPage;
