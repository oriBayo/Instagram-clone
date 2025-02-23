import { auth } from '@/auth';
import Loading from '@/components/Loading';
import ProfileContent from '@/components/ProfileContent';
import { prisma } from '@/db';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

const ProfilePage = async () => {
  const session = await auth();
  const profile = await prisma.profile.findFirst({
    where: {
      email: session?.user?.email as string,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      author: profile?.email,
    },
  });

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      author: profile?.email,
    },
  });

  const postsByBookmarks = await prisma.post.findMany({
    where: {
      id: { in: bookmarks.map((b) => b.postId) },
    },
  });

  if (!profile) {
    return redirect('/settings');
  }
  return (
    <Suspense fallback={<Loading />}>
      <ProfileContent
        profile={profile}
        posts={posts}
        bookmarks={postsByBookmarks}
        isOurProfile={true}
      />
    </Suspense>
  );
};

export default ProfilePage;
