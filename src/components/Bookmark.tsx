'use client';
import { createBookmark, deleteBookmark } from '@/actions';
import { Post } from '@prisma/client';
import { BookmarkCheckIcon, BookmarkIcon } from 'lucide-react';
import React, { useState } from 'react';

const Bookmark = ({
  post,
  isActive = true,
}: {
  post: Post;
  isActive: boolean;
}) => {
  const [toggle, setToggle] = useState<boolean>(isActive);
  const handleClick = async () => {
    if (toggle) {
      await deleteBookmark(post.id);
    } else {
      await createBookmark(post.id);
    }
    setToggle((prev) => !prev);
  };
  return (
    <button onClick={handleClick}>
      <div className='dark:text-gray-300'>
        {toggle ? (
          <BookmarkCheckIcon size={34} className='fill-blue-500 text-white' />
        ) : (
          <BookmarkIcon />
        )}
      </div>
    </button>
  );
};

export default Bookmark;
