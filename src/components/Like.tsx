'use client';
import { likePost, removeLikeFromPost } from '@/actions';
import { Post } from '@prisma/client';
import { HeartIcon } from 'lucide-react';
import { useState } from 'react';

const Like = ({ post, isLiked }: { post: Post; isLiked: boolean }) => {
  const [likedByMe, setLikedByMe] = useState(!!isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  const handleLike = async () => {
    setLikedByMe(!likedByMe);
    try {
      if (!likedByMe) {
        setLikesCount((prev) => prev + 1);
        await likePost(post.id as string);
      } else {
        setLikesCount((prev) => prev - 1);
        await removeLikeFromPost(post.id as string);
      }
    } catch (error) {
      console.error('Failed to update like status:', error);
    }
  };

  return (
    <div className='flex gap-2'>
      <button onClick={handleLike}>
        <HeartIcon className={likedByMe ? 'text-red-500 fill-red-500' : ''} />
      </button>
      {likesCount} people likes this
    </div>
  );
};

export default Like;
