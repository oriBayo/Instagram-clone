import { auth } from '@/auth';
import ProfilePosts from '@/components/ProfilePosts';
import { prisma } from '@/db';
import { CheckIcon, ChevronLeft, CogIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProfilePage = async () => {
  const session = await auth();
  const profile = await prisma.profile.findFirstOrThrow({
    where: {
      email: session?.user?.email as string,
    },
  });
  return (
    <main>
      <section className='flex justify-between items-center'>
        <Link href='/'>
          <ChevronLeft />
        </Link>
        <div className='font-bold flex items-center gap-2'>
          {profile.username}
          <div className='bg-ig-red size-5 rounded-full inline-flex justify-center items-center text-white'>
            <CheckIcon size={16} />
          </div>
        </div>
        <Link href='/settings'>
          <CogIcon />
        </Link>
      </section>
      <section className='mt-8 flex justify-center'>
        <div className='size-48 p-2 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red'>
          <div className='size-44 p-2 rounded-full bg-white'>
            <div className='size-40 aspect-square overflow-hidden rounded-full'>
              <Image
                src={profile.avatar || ''}
                alt={`${profile.name}'s avatar`}
                width={200}
                height={200}
                layout='intrinsic'
                quality={50}
              />
            </div>
          </div>
        </div>
      </section>
      <section className='text-center mt-4'>
        <h1 className='text-xl font-bold'>{profile.name}</h1>
        <p className='text-gray-500 my-1'>{profile.subtitle}</p>
        <p>{profile.bio}</p>
      </section>
      <section className='mt-4'>
        <div className='flex justify-center gap-4 font-bold'>
          <Link href={''}> Posts</Link>
          <Link href={'/highlights'} className='text-gray-400'>
            Highlights
          </Link>
        </div>
      </section>
      <section className='m-3'>
        <ProfilePosts email={profile.email} />
      </section>
    </main>
  );
};

export default ProfilePage;
