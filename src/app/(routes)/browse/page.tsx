import Loading from '@/components/Loading';
import PostsGrid from '@/components/PostsGrid';
import { prisma } from '@/db';
import React, { Suspense } from 'react';

const BrowsePage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return (
    <>
      <Suspense fallback={<Loading />}>
        <PostsGrid posts={posts} />
      </Suspense>
    </>
  );
};

export default BrowsePage;
