import { Post } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PostResults = ({ posts }: { posts: Post[] }) => {
  return (
    <div className='grid grid-cols-3 gap-3 w-full'>
      {posts.map((post) => (
        <Link
          className='size-36 flex items-center m-auto justify-center gap-2'
          key={post.id}
          href={`/posts/${post.id}`}
        >
          <Image
            className='rounded-lg max-h-[150px]'
            src={post.image}
            alt=''
            width={1024}
            height={768}
            layout='responsive'
            quality={75}
          />
        </Link>
      ))}
    </div>
  );
};

export default PostResults;
