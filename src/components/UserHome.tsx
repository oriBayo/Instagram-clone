import HomeTopRow from '@/components/HomeTopRow';
import { getSessionEmailOrThrow } from '@/actions';
import { prisma } from '@/db';
import HomePosts from './HomePosts';

const UserHome = async () => {
  const sessionEmail = await getSessionEmailOrThrow();

  const follows = await prisma.follower.findMany({
    where: { followingProfileEmail: sessionEmail },
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
    where: { author: sessionEmail },
  });

  const comments = await prisma.comment.findMany({
    where: {
      postId: { in: posts.map((post) => post.id) },
    },
  });

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      author: sessionEmail,
    },
  });
  return (
    <div>
      <HomeTopRow profiles={profiles} />
      <HomePosts
        bookmarks={bookmarks}
        posts={posts}
        profiles={profiles}
        likes={likes}
        comments={comments}
      />
    </div>
  );
};

export default UserHome;
