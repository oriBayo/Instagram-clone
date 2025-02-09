import Comment from '@/components/Comment';
import SessionCommentForm from '@/components/SessionCommentForm';
import Image from 'next/image';
import React from 'react';
import { Comment as CommentModel, Like, Post, Profile } from '@prisma/client';
import { BookmarkIcon } from 'lucide-react';
import LikesInfo from '@/components/Like';

const SinglePostContent = async ({
  post,
  authorProfile,
  comments,
  commentsAuthors,
  myLike,
}: {
  post: Post;
  authorProfile: Profile;
  comments: CommentModel[];
  commentsAuthors: Profile[];
  myLike: Like | null;
}) => {
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
          profile={authorProfile}
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
            <LikesInfo post={post} isLiked={!!myLike} />
          </div>
          <div>
            <button>
              <BookmarkIcon />
            </button>
          </div>
        </div>
        <div className='mt-6 pt-8 border-t border-t-gray-300'>
          <SessionCommentForm postId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default SinglePostContent;
