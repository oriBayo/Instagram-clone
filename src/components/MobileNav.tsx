import Link from 'next/link';
import {
  CameraIcon,
  HomeIcon,
  LayoutGridIcon,
  SearchIcon,
  UserIcon,
} from 'lucide-react';

const MobileNav = () => {
  return (
    <div className=' block lg:hidden fixed left-0 right-0 bottom-0 px-4'>
      <div className='flex justify-between text-gray-600 *:flex *:items-center '>
        <NavSection className='pl-2 dark:bg-black dark:text-gray-300'>
          <NavLink href='/' icon={<HomeIcon />} />
          <NavLink href='/search' icon={<SearchIcon />} />
        </NavSection>
        <NavCamera />
        <NavSection className='pr-2 dark:bg-black dark:text-gray-300'>
          <NavLink href='/browse' icon={<LayoutGridIcon />} />
          <NavLink
            href='/profile'
            icon={<UserIcon />}
            className='text-ig-red'
          />
        </NavSection>
      </div>
    </div>
  );
};
interface NavSectionProps {
  children: React.ReactNode;
  className?: string;
}

const NavSection: React.FC<NavSectionProps> = ({ children, className }) => (
  <div
    className={`bg-white w-full rounded-t-xl relative z-10 flex justify-around items-center ${className}`}
  >
    {children}
  </div>
);

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, className }) => (
  <Link
    href={href}
    className={`size-12 flex items-center justify-center ${className}`}
  >
    {icon}
  </Link>
);

const NavCamera = () => (
  <div className=' size-14 relative -top-4 justify-center w-[140px]'>
    <div className='dark:border-black dark:border-t-transparent dark:border-l-transparent absolute bg-clip-text border-white border-t-transparent border-l-transparent border-[50px] rounded-full rotate-45'>
      <div className='border-4 size-14 border-transparent'>
        <Link
          href='/create'
          className=' -rotate-45 bg-gradient-to-tr from-ig-orange to-ig-red text-white rounded-full size-12 flex items-center justify-center '
        >
          <CameraIcon />
        </Link>
      </div>
    </div>
  </div>
);
export default MobileNav;
