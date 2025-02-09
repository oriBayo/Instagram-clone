'use client';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className='bg-black/80 fixed inset-0 z-20'
    >
      <div className='bg-white rounded-lg left-20 right-20 top-14 bottom-14 fixed'>
        <div className='absolute top-1 bottom-1 z-30 overflow-y-auto'>
          <div onClick={(ev) => ev.stopPropagation()} className='p-4'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
