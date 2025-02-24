import { Bookmark, Comment, Like, Post, Profile } from '@prisma/client';
import React from 'react';
import Image from 'next/image';
import Avatar from './Avatar';
import Link from 'next/link';
import Likes from './Like';
import CommentIcon from './CommentIcon';
import BookmarkIcon from './Bookmark';

const HomePosts = ({
  posts,
  profiles,
  likes,
  comments,
  bookmarks,
}: {
  posts: Post[];
  profiles: Profile[];
  likes: Like[];
  comments: Comment[];
  bookmarks: Bookmark[];
}) => {
  return (
    <div className='max-w-xl mx-auto flex flex-col gap-8 pb-12 '>
      {posts.map((post) => {
        const profile = profiles.find((p) => p.email === post.author);
        const commentsPerProfile = comments.filter(
          (comment) => comment.postId === post.id
        );
        const bookmark = bookmarks.find(
          (bookmark) => bookmark.postId === post.id
        );
        return (
          <div key={post.id}>
            <div className='flex flex-col mb-3'>
              <div className='flex justify-end mb-4 dark:text-white'>
                <Link
                  href={`/users/${profile?.username}`}
                  className='flex justify-center items-center gap-2'
                >
                  <p className='font-bold'>{profile?.name}</p>
                  <Avatar src={profile?.avatar || ''} />
                </Link>
              </div>

              <Link href={`/posts/${post.id}`}>
                <Image
                  className='rounded-lg shadow-md shadow-black/50 max-h-[500px] '
                  src={post.image}
                  alt=''
                  layout='responsive'
                  width={300}
                  height={300}
                />
              </Link>

              <div className='dark:text-gray-300 flex justify-between gap-2 mt-3 px-3'>
                <p>{post.description}</p>
                <div className='flex gap-3'>
                  <BookmarkIcon post={post} isActive={!!bookmark} />
                  <CommentIcon commentsCount={commentsPerProfile.length} />

                  <Likes
                    post={post}
                    withText={false}
                    isLiked={!!likes?.find((p) => p.postId === post.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomePosts;
