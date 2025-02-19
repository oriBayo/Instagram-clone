import HomeTopRow from '@/components/HomeTopRow';
import { getSessionEmailOrThrow } from '@/actions';
import { prisma } from '@/db';
import HomePosts from './HomePosts';

const UserHome = async () => {
  const follows = await prisma.follower.findMany({
    where: { followingProfileEmail: await getSessionEmailOrThrow() },
  });

  const profiles = await prisma.profile.findMany({
    where: {
      id: { in: follows.map((follower) => follower.followedProfileId) },
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      author: { in: profiles.map((profile) => profile.email) },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 100,
  });

  const likes = await prisma.like.findMany({
    where: { author: await getSessionEmailOrThrow() },
  });

  return (
    <div>
      <HomeTopRow profiles={profiles} />
      <HomePosts posts={posts} profiles={profiles} likes={likes} />
    </div>
  );
};

export default UserHome;
