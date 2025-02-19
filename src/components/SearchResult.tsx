import { prisma } from '@/db';
import ProfileResult from './ProfileResult';
import PostResults from './PostResults';

const SearchResult = async ({ query }: { query: string }) => {
  const profiles = await prisma.profile.findMany({
    where: {
      OR: [{ username: { contains: query } }, { name: { contains: query } }],
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      description: { contains: query },
    },
  });
  return (
    <div>
      <h1 className='text-lg mt-4'>{`Search results for : "${query}"`}</h1>
      <ProfileResult profiles={profiles} />
      <PostResults posts={posts} />
    </div>
  );
};

export default SearchResult;
