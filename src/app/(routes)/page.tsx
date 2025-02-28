import Loading from '@/components/Loading';
import UserHome from '@/components/UserHome';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <div className='px-6'>
      <Suspense fallback={<Loading />}>
        <UserHome />
      </Suspense>
    </div>
  );
}
