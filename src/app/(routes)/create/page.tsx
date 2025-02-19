'use client';

import { postEntry } from '@/actions';
import { Button, TextArea } from '@radix-ui/themes';
import { CloudUploadIcon, SendIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const CreatePage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.set('file', file);
      fetch('api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((url) => setImageUrl(url));
      });
    }
  }, [file]);

  return (
    <form
      className='max-w-lg mx-auto'
      action={async (data: FormData) => {
        const id = await postEntry(data);
        router.push(`/posts/${id}`);
        router.refresh();
      }}
    >
      <input
        type='text'
        value={imageUrl}
        name='imageUrl'
        onChange={() => {}}
        className='hidden'
      />
      <div className='flex flex-col gap-4'>
        <div className=' relative w-auto min-h-64 rounded-md bg-gray-400 p-2 '>
          {imageUrl && (
            <div className='flex justify-center items-center'>
              <Image
                className='rounded-md flex-auto'
                src={imageUrl || ''}
                alt=''
                width={200}
                height={200}
                quality={50}
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover', // Optional: Customize fit behavior
                }}
              />
            </div>
          )}

          <div className='absolute inset-0 flex justify-center items-center'>
            <input
              className='hidden'
              type='file'
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button
              type='button'
              variant='surface'
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudUploadIcon size={16} />
              Choose image
            </Button>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <TextArea
            name='description'
            className='h-16 '
            placeholder='Add photo description...'
          />
        </div>
      </div>
      <div className='flex justify-center mt-4'>
        <Button type='submit'>
          <SendIcon size={16} /> Publish
        </Button>
      </div>
    </form>
  );
};

export default CreatePage;
