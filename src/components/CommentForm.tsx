'use client';
import { useRef } from 'react';
import { Button, TextArea } from '@radix-ui/themes';
import Avatar from './Avatar';
import { createComment } from '@/actions';
import { useRouter } from 'next/navigation';

type CommentFormProps = {
  postId: string;
  avatar: string;
};

const CommentForm = ({ postId, avatar }: CommentFormProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  return (
    <form
      action={async (data: FormData) => {
        if (textAreaRef.current?.value) {
          textAreaRef.current.value = '';
        }
        await createComment(data, postId);
        router.refresh();
      }}
    >
      <div className='flex gap-2'>
        <Avatar src={avatar} />
        <div className='w-full flex flex-col gap-2'>
          <TextArea
            ref={textAreaRef}
            name='text'
            placeholder='Tell the world what you think...'
          />
          <div>
            <Button>Post comment</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
