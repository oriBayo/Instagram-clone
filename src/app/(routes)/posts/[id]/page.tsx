import { auth } from '@/auth';
import Comment from '@/components/Comment';
import SessionCommentForm from '@/components/SessionCommentForm';
import { prisma } from '@/db';
import Image from 'next/image';
import React from 'react';
import { uniq } from 'lodash';
import { Profile } from '@prisma/client';
import { BookmarkIcon } from 'lucide-react';
import Like from '@/components/Like';
import { getSessionEmailOrThrow } from '@/actions';

const SinglePostPage = async ({ params }: { params: { id: string } }) => {
  const { id: postId } = await Promise.resolve(params);

  // Fetch post details
  const post = await prisma.post.findFirstOrThrow({ where: { id: postId } });

  const session = await auth();

  // Fetch user profile
  const profile = await prisma.profile.findFirstOrThrow({
    where: { email: session?.user?.email as string },
  });

  // Fetch comments for the post
  const comments = await prisma.comment.findMany({
    where: { postId: postId },
  });

  // Fetch unique authors of the comments
  const uniqueAuthors = uniq(comments.map((c) => c.author));
  const commentsAuthors = await prisma.profile.findMany({
    where: {
      email: { in: uniqueAuthors },
    },
  });

  // Fetch my like
  const myLike = await prisma.like.findFirst({
    where: {
      postId: postId,
      author: await getSessionEmailOrThrow(),
    },
  });

  return (
    <div className='grid md:grid-cols-2 gap-4 m-5'>
      {/* Image column */}
      <div>
        <Image
          className='rounded-md'
          src={post.image}
          alt={`Image ${post.id}`}
          width={1024}
          height={768}
          quality={75}
        />
      </div>

      {/* Content Column */}
      <div className='2xl:px-16'>
        <Comment
          profile={profile}
          text={post.description}
          createdAt={post.createdAt as Date}
        />
        <div className='flex flex-col gap-4 pt-4'>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              text={comment.text}
              createdAt={comment.createdAt as Date}
              profile={
                commentsAuthors.find(
                  (author) => author.email === comment.author
                ) as Profile
              }
            />
          ))}
        </div>
        <div className='flex justify-between border-t pt-6 mt-4 border-t-gray-300 items-center text-gray-600 '>
          <div>
            <Like post={post} isLiked={!!myLike} />
          </div>
          <div>
            <button>
              <BookmarkIcon />
            </button>
          </div>
        </div>
        <div className='mt-6 pt-8 border-t border-t-gray-300'>
          <SessionCommentForm postId={postId} />
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
