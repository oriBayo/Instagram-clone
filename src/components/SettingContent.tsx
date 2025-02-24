import { Profile } from '@prisma/client';
import React from 'react';
import SettingsForm from '@/components/SettingsForm';
import { signOut } from '@/auth';
import { Button } from '@radix-ui/themes';

const SettingContent = ({ profile }: { profile: Profile }) => {
  return (
    <div className='max-w-md mx-auto'>
      <h1 className='dark:text-gray-300 text-2xl font-bold mb-4 text-center'>
        Profile settings:
      </h1>
      <p className='dark:text-gray-500 text-sm text-gray-500 text-center -mt-4'>
        {profile?.email}
      </p>
      <SettingsForm userEmail={profile.email} profile={profile} />
      <div className='flex justify-center mt-4 pt-4 border-t border-gray-200'>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <Button type='submit' variant='outline'>
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SettingContent;
