import Image from 'next/image';
import Link from 'next/link';
import {
  CameraIcon,
  HomeIcon,
  LayoutGridIcon,
  SearchIcon,
  UserIcon,
} from 'lucide-react';

const DesktopNav = () => {
  return (
    <div className='hidden lg:block p-4 w-48 shadow-md shadow-gray-400'>
      <div className=' top-0 sticky'>
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png'
          alt=''
          width={1024}
          height={768}
          quality={75}
        />
        <div className='mt-6 ms-2 inline-flex flex-col gap-8 *:flex *:items-center *:gap-2'>
          <Link href='/'>
            <HomeIcon />
            Home
          </Link>

          <Link href='/search'>
            <SearchIcon />
            Search
          </Link>

          <Link href='/browser'>
            <LayoutGridIcon />
            Browser
          </Link>

          <Link href='/profile'>
            <UserIcon />
            Profile
          </Link>

          <Link href='/create'>
            <CameraIcon />
            Create
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;