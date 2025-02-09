import { Post } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PostResults = ({ posts }: { posts: Post[] }) => {
  return (
    <div className='grid grid-col'>
      {posts.map((post) => (
        <Link
          className='bg-gray-200 border border-gray-300 p-5 flex gap-4 rounded-full items-center'
          key={post.id}
          href={`/post/${post.id}`}
        >
          <div className='size-24 flex items-center'>
            <Image
              src={post.image}
              alt=''
              width={1024}
              height={768}
              layout='responsive'
              quality={75}
            />
          </div>
          <div>{post.description}</div>
        </Link>
      ))}
    </div>
  );
};

export default PostResults;
