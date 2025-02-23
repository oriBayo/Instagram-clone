import { MessageCircle } from 'lucide-react';
import React from 'react';

const CommentIcon = ({ commentsCount }: { commentsCount: number }) => {
  return (
    <div className='flex gap-1 justify-center items-center'>
      <MessageCircle />
      <span>{commentsCount}</span>
    </div>
  );
};

export default CommentIcon;
