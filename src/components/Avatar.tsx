import React from 'react';
import Image from 'next/image';

const Avatar = ({ src }: { src: string }) => {
  return (
    <div className='size-14 aspect-square overflow-hidden rounded-full'>
      <Image src={src || ''} alt='' width={1024} height={768} quality={75} />
    </div>
  );
};

export default Avatar;
