import { Profile } from '@prisma/client';
import { Avatar } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

const ProfileResult = ({ profiles }: { profiles: Profile[] }) => {
  return (
    <div className='grid grid-cols-2 gap-2'>
      {profiles.map((profile) => (
        <Link
          href={`/users/${profile.username}`}
          className=' flex gap-2 bg-gray-200 border border-gray-300 p-2 rounded-full'
          key={profile.id}
        >
          <div className='flex gap-3 '>
            <div>
              <Avatar
                radius='full'
                size={'4'}
                fallback='user avatar'
                src={profile.avatar || ''}
              />
            </div>
            <div>
              <h3>{profile.name}</h3>
              <h4 className='text-gray-500 text-sm '>{profile.username}</h4>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfileResult;
