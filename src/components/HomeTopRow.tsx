import Avatar from '@/components/Avatar';
import { Profile } from '@prisma/client';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

const HomeTopRow = async ({ profiles }: { profiles: Profile[] }) => {
  return (
    <div className='flex max-w-lg mx-auto gap-4 mb-8 overflow-x-auto'>
      <NewStoryButton />
      {profiles.map((profile) => (
        <ProfileAvatar key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default HomeTopRow;

const ProfileAvatar = ({ profile }: { profile: Profile }) => {
  return (
    <Link
      href={`/users/${profile.username}`}
      key={profile.id}
      className='size-18 flex-col justify-center items-center'
    >
      <div className='inline-block p-1 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red  '>
        <div className='p-0.5 bg-white rounded-full'>
          <Avatar src={profile.avatar} />
        </div>
      </div>
      <p className='text-center text-gray-400 text-sm'>{profile.name}</p>
    </Link>
  );
};

const NewStoryButton = () => {
  return (
    <div>
      <button className='bg-gradient-to-tr from-ig-orange to-ig-red rounded-full size-[68px] flex justify-center items-center'>
        <PlusIcon size={32} color='white' />
      </button>
      <p className='text-center text-gray-400 text-sm'>New Story</p>
    </div>
  );
};
