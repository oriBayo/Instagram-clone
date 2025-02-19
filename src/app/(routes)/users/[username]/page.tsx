import { getSessionEmail } from '@/actions';
import ProfileContent from '@/components/ProfileContent';
import { prisma } from '@/db';
import React from 'react';

interface userProfileProps {
  params: Promise<{ username: string }>;
}

const UserProfilePage = async ({ params }: userProfileProps) => {
  const userName = (await params).username;
  const profile = await prisma.profile.findFirstOrThrow({
    where: { username: userName },
  });
  const ourFollow = await prisma.follower.findFirst({
    where: {
      followingProfileEmail: (await getSessionEmail()) || '',
      followedProfileId: profile.id,
    },
  });

  return <ProfileContent profile={profile} ourFollow={ourFollow} />;
};

export default UserProfilePage;
