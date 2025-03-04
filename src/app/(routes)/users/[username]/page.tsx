import { getSessionEmail } from '@/actions';
import ProfileContent from '@/components/ProfileContent';
import { prisma } from '@/db';
import React from 'react';

interface userProfileProps {
  params: Promise<{ username: string }>;
}

const UserProfilePage = async ({ params }: userProfileProps) => {
  const userName = (await params).username;
  const sessionEmail = (await getSessionEmail()) || '';
  const profile = await prisma.profile.findFirstOrThrow({
    where: { username: userName },
  });
  const ourFollow = await prisma.follower.findFirst({
    where: {
      followingProfileEmail: sessionEmail,
      followedProfileId: profile.id,
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      author: profile.email,
    },
  });

  return (
    <ProfileContent
      isOurProfile={sessionEmail === profile.email}
      profile={profile}
      ourFollow={ourFollow}
      bookmarks={null}
      posts={posts}
    />
  );
};

export default UserProfilePage;
