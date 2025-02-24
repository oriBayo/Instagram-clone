import { Profile } from '@prisma/client';
import Avatar from '@/components/Avatar';
import { format } from 'date-fns';

const Comment = ({
  profile,
  text,
  createdAt,
}: {
  profile: Profile;
  text: string;
  createdAt: Date;
}) => {
  return (
    <div className='flex gap-2 '>
      <Avatar src={profile.avatar || ''} />
      <div className='w-full'>
        <div className='flex justify-between items-center'>
          <div className='dark:text-gray-300'>
            <h3>{profile.name}</h3>
            <h4 className='dark:text-gray-400 text-gray-600 -mt-1 text-sm'>
              @{profile.username}
            </h4>
          </div>
        </div>
        <div className='dark:bg-gray-300 dark:border-none bg-gray-200 p-4 rounded-md mt-2 border border-gray-300'>
          <p className='dark:text-gray-500'>{text}</p>
        </div>
        <div className='dark:text-gray-400 text-end text-xs text-gray-500'>
          {format(createdAt, 'yyyy-MM-dd HH:mm:ss')}
        </div>
      </div>
    </div>
  );
};

export default Comment;
