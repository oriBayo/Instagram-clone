import { Profile } from '@prisma/client';
import Avatar from './Avatar';
import Link from 'next/link';
import React from 'react';

const ProfileResult = ({ profiles }: { profiles: Profile[] }) => {
  return (
    profiles.length > 0 && (
      <div className='grid grid-cols-2 gap-2 mt-4'>
        {profiles.map((profile) => (
          <Link
            className='flex gap-2 bg-gray-200 border border-gray-300 p-2 rounded-full'
            key={profile.id}
            href={`/users/${profile.username}`}
          >
            <div>
              <Avatar src={profile.avatar} />
            </div>
            <div>
              <h3>{profile.name}</h3>
              <h4 className='text-gray-500 text-sm'>@{profile.username}</h4>
            </div>
          </Link>
        ))}
      </div>
    )
  );
};

export default ProfileResult;
