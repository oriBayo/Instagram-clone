import { prisma } from '@/db';
import PostsGrid from './PostsGrid';

const ProfilePosts = async ({ email }: { email: string }) => {
  const posts = await prisma.post.findMany({ where: { author: email } });

  return <PostsGrid posts={posts} />;
};

export default ProfilePosts;
