import React from 'react';
import Image from 'next/image';

const Avatar = ({ src, size = '16' }: { src: string; size: string }) => {
  return (
    <div className={`size-${size} aspect-square overflow-hidden rounded-full`}>
      <Image src={src || ''} alt='' width={1024} height={768} quality={75} />
    </div>
  );
};

export default Avatar;
