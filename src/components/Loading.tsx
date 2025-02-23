'use client';
import { ClipLoader } from 'react-spinners';
import React from 'react';

const Loading = () => {
  return (
    <div className='h-96 flex justify-center items-center'>
      <ClipLoader size={100} />
    </div>
  );
};

export default Loading;
