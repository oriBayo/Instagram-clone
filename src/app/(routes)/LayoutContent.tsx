'use client';

import { usePathname } from 'next/navigation';
import MobileNav from '@/components/MobileNav';
import DesktopNav from '@/components/DesktopNav';
import ThemeObserver from '@/components/ThemeObserver';
import { ReactNode } from 'react';

export default function LayoutContent({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const pathname = usePathname();
  console.log(pathname);
  const isAuthPage = pathname === '/login' || pathname === '/signout';

  return (
    <>
      {modal}
      {isAuthPage ? (
        <div>{children}</div>
      ) : (
        <div className='flex min-h-screen dark:bg-gray-950'>
          <DesktopNav />
          <div className='p-2 mt-6 flex justify-around w-full'>
            <div className='w-full'>{children}</div>
          </div>
          <MobileNav />
        </div>
      )}
      <ThemeObserver />
    </>
  );
}
