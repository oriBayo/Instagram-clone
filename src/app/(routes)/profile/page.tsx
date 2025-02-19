import { auth } from '@/auth';
import ProfileContent from '@/components/ProfileContent';
import { prisma } from '@/db';
import { redirect } from 'next/navigation';
import React from 'react';

const ProfilePage = async () => {
  const session = await auth();
  const profile = await prisma.profile.findFirst({
    where: {
      email: session?.user?.email as string,
    },
  });
  if (!profile) {
    return redirect('/settings');
  }
  return <ProfileContent profile={profile} isOurProfile={true} />;
};

export default ProfilePage;
