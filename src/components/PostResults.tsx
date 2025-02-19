import { Post } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PostResults = ({ posts }: { posts: Post[] }) => {
  return (
    <div className='grid grid-cols-3 gap-3 w-full'>
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <div className='size-36 flex items-center m-auto justify-center'>
            <Image
              className='rounded-lg'
              src={post.image}
              alt=''
              width={1024}
              height={768}
              layout='responsive'
              quality={75}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostResults;
