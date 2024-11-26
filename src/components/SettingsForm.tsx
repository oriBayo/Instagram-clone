'use client';

import { updateProfile } from '@/actions';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import { CloudUploadIcon } from 'lucide-react';
import { Profile } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type SettingsFormProps = {
  userEmail: string;
  profile: Profile;
};

const SettingsForm = ({ profile }: SettingsFormProps) => {
  const [file, setFile] = useState<File>();
  const [avatar, setAvatar] = useState(profile.avatar || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.set('file', file);
      fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((res) => {
        res.json().then((url) => {
          setAvatar(url);
        });
      });
    }
  }, [file]);

  const handleSubmit = async (data: FormData) => {
    await updateProfile(data);
  };

  return (
    <form action={handleSubmit}>
      <input type='text' name='avatar' value={avatar} className='hidden' />
      <div className='flex gap-4 items-center'>
        <div>
          <div className='bg-gray-400 rounded-full size-24 aspect-square overflow-hidden shadow-md shadow-gray-300'>
            <Image
              src={avatar}
              alt=''
              width={1024}
              height={768}
              layout='responsive'
              quality={75}
            />
          </div>
        </div>
        <div>
          <input
            className='hidden'
            type='file'
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files?.[0])}
          ></input>

          <Button
            type='button'
            variant='surface'
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUploadIcon />
            Change avatar
          </Button>
        </div>
      </div>
      <p className='mt-2 font-bold'>username</p>
      <TextField.Root
        name='username'
        placeholder='username'
        defaultValue={profile.username || ''}
      />
      <p className='mt-2 font-bold'>name</p>
      <TextField.Root
        name='name'
        placeholder='name'
        defaultValue={profile.name || ''}
      />
      <p className='mt-2 font-bold'>subtitle</p>
      <TextField.Root
        name='subtitle'
        placeholder='subtitle'
        defaultValue={profile.subtitle || ''}
      />
      <p className='mt-2 font-bold'>bio</p>
      <TextArea name='bio' defaultValue={profile.bio || ''} />
      <div className='mt-4 flex justify-end'>
        <Button variant='solid' type='submit'>
          Save Settings
        </Button>
      </div>
    </form>
  );
};

export default SettingsForm;
