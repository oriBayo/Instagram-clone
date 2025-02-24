'use client';
import { Follower, Post, Profile } from '@prisma/client';
import { CheckIcon, ChevronLeft, CogIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FollowButton from './FollowButton';
import PostsGrid from './PostsGrid';
import { useState } from 'react';

interface ProfileContentProps {
  profile: Profile;
  isOurProfile?: boolean;
  posts: Post[] | null;
  bookmarks: Post[] | null;
  ourFollow?: Follower | null;
}

type Tab = 'Posts' | 'Highlight' | 'Bookmarks';

const ProfileContent = ({
  profile,
  isOurProfile = false,
  ourFollow = null,
  bookmarks,
  posts,
}: ProfileContentProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('Posts');
  return (
    <main className=' mx-auto px-8'>
      <ProfileTopBar profile={profile} isOurProfile={isOurProfile} />
      <ProfileAvatar profile={profile} />

      {!isOurProfile && (
        <section className='flex justify-center my-3'>
          <FollowButton profileIdToFollow={profile.id} ourFollow={ourFollow} />
        </section>
      )}

      <ProfileInfo profile={profile} />
      <ProfileNavs
        isOurProfile={isOurProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <section className='mt-10'>
        {activeTab === 'Posts' && posts && <PostsGrid posts={posts} />}
        {activeTab === 'Highlight' && <ProfileHighlight />}
        {activeTab === 'Bookmarks' && bookmarks && (
          <PostsGrid posts={bookmarks} />
        )}
      </section>
    </main>
  );
};

export default ProfileContent;

const ProfileTopBar = ({
  profile,
  isOurProfile,
}: {
  profile: Profile;
  isOurProfile: boolean;
}) => {
  return (
    <section className='flex justify-between items-center'>
      <Link href='/' className='dark:text-gray-300'>
        <ChevronLeft />
      </Link>
      <div className='dark:text-gray-300 font-bold flex items-center gap-2'>
        {profile.username}
        <div className='bg-ig-red size-5 rounded-full inline-flex justify-center items-center text-white'>
          <CheckIcon size={16} />
        </div>
      </div>
      <div>
        {isOurProfile && (
          <Link href='/settings' className='dark:text-gray-300'>
            <CogIcon />
          </Link>
        )}
      </div>
    </section>
  );
};

const ProfileAvatar = ({ profile }: { profile: Profile }) => {
  return (
    <section className='mt-8 flex justify-center'>
      <div className='size-48 p-2 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red'>
        <div className='size-44 p-2 rounded-full bg-white'>
          <div className='size-40 aspect-square overflow-hidden rounded-full'>
            <Image
              className='rounded-lg'
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
  );
};

const ProfileInfo = ({ profile }: { profile: Profile }) => {
  return (
    <section className='text-center mt-4'>
      <h1 className='dark:text-gray-200 text-xl font-bold'>{profile.name}</h1>
      <p className='dark:text-gray-400 text-gray-500 my-1'>
        {profile.subtitle}
      </p>
      <p className='dark:text-gray-500'>{profile.bio}</p>
    </section>
  );
};

const ProfileNavs = ({
  isOurProfile,
  activeTab,
  setActiveTab,
}: {
  isOurProfile: boolean;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}) => {
  return (
    <section className='mt-4'>
      <div className='flex justify-center gap-4 font-bold'>
        <button
          onClick={() => setActiveTab('Posts')}
          className={`${
            activeTab === 'Posts'
              ? 'text-black dark:text-white'
              : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab('Highlight')}
          className={`${
            activeTab === 'Highlight'
              ? 'text-black dark:text-white'
              : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          Highlights
        </button>
        {isOurProfile && (
          <button
            onClick={() => setActiveTab('Bookmarks')}
            className={`${
              activeTab === 'Bookmarks'
                ? 'text-black dark:text-white'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            Bookmarked
          </button>
        )}
      </div>
    </section>
  );
};

const ProfileHighlight = () => {
  return <div>ProfileHighlight</div>;
};
