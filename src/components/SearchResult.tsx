import { prisma } from '@/db';
import ProfileResult from './ProfileResult';
import PostResults from './PostResults';
import Link from 'next/link';
import Avatar from './Avatar';

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
      {query && (
        <h1 className='text-lg mt-4 mb-2'>{`Search results for : "${query}"`}</h1>
      )}

      <div className='grid grid-cols-2 gap-2'>
        {profiles.map((profile) => (
          <Link
            className='flex gap-2 bg-gray-200 border border-gray-300 p-2 rounded-full'
            key={profile.id}
            href={`/users/${profile.username}`}
          >
            <div>
              <Avatar src={profile.avatar} />
            </div>
            <div>
              <h3>{profile.name}</h3>
              <h4 className='text-gray-500 text-sm'>@{profile.username}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
