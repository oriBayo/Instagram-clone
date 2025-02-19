import { Like, Post, Profile } from '@prisma/client';
import React from 'react';
import Image from 'next/image';
import Avatar from './Avatar';
import Link from 'next/link';
import Likes from './Like';
import { BookmarkIcon } from 'lucide-react';

const HomePosts = ({
  posts,
  profiles,
  likes,
}: {
  posts: Post[];
  profiles: Profile[];
  likes: Like[];
}) => {
  return (
    <div className='max-w-xl mx-auto flex flex-col gap-8 py-8'>
      {posts.map((post) => {
        const profile = profiles.find((p) => p.email === post.author);
        return (
          <div key={post.id} className=''>
            <div className='h-[500px] flex flex-col justify-center'>
              <Link href={`/posts/${post.id}`}>
                <Image
                  className='rounded-lg shadow-md shadow-black/50 max-h-[400px]'
                  src={post.image}
                  alt=''
                  layout='responsive'
                  width={300}
                  height={300}
                />
              </Link>

              <div className='flex justify-between items-center my-4'>
                <div className='flex gap-2'>
                  <button>
                    <BookmarkIcon />
                  </button>
                  <Likes
                    post={post}
                    isLiked={!!likes?.find((p) => p.postId === post.id)}
                  />
                </div>
                <Link
                  href={`/users/${profile?.username}`}
                  className='flex justify-center items-center gap-2'
                >
                  <p className='font-bold'>{profile?.name}</p>
                  <Avatar src={profile?.avatar || ''} />
                </Link>
              </div>
            </div>
            <p>{post.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HomePosts;
