'use client';
import { Post } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import Masonry from 'react-masonry-css';

const PostsGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <div className='max-w-4xl mx-auto '>
      <Masonry
        breakpointCols={{
          default: 4,
          860: 3,
          500: 2,
        }}
        className='flex -ml-4 '
        columnClassName='pl-4'
      >
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id} className='mb-4'>
            <Image
              src={post.image}
              alt={`Image ${post.id}`}
              width={1024}
              height={768}
              layout='responsive'
              quality={75}
            />
          </Link>
        ))}
      </Masonry>
    </div>
  );
};

export default PostsGrid;
