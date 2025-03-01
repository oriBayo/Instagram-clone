'use client';

import Loading from '@/components/Loading';
import { Instagram } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handelSignIn = () => {
    signIn('google');
    router.push('/');
  };

  if (status === 'loading') {
    return <Loading />;
  }

  if (!session) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center min-h-screen bg-[url('/images/image-2.jpeg')] bg-cover bg-center bg-no-repeat ">
        {/* Main Container */}
        <div className=' rounded flex flex-col max-w-sm w-full bg-white border border-gray-300 p-10 mb-3 '>
          <div className='flex justify-center mb-8 animate-fade-in'>
            <Instagram
              size={60}
              className='border rounded-full p-2 bg-gradient-to-tr from-red-200 to-blue-100'
            />
          </div>

          <button
            onClick={handelSignIn}
            className='flex items-center justify-center w-full bg-white text-sm font-semibold text-gray-700 border border-gray-300  py-2 px-4 mt-4 hover:bg-gray-50 transition duration-150 '
          >
            <Image
              className='mr-1'
              src={'/images/google.svg'}
              alt='Logout Icon'
              width={20}
              height={20}
            />
            Sign in with Google
          </button>

          {/* Divider */}
          <div className='flex items-center my-4'>
            <div className='flex-1 h-px bg-gray-300'></div>
            <div className='px-4 text-sm text-gray-500 font-semibold'>OR</div>
            <div className='flex-1 h-px bg-gray-300'></div>
          </div>

          {/* Forgot Password Link */}
          <div className='text-center mt-4'>
            <a href='#' className='text-xs text-blue-900'>
              Forgot password?
            </a>
          </div>
        </div>

        {/* Sign Up Container */}
        <div className='flex items-center justify-center w-full max-w-sm bg-white border border-gray-300 rounded p-4 '>
          <p className='text-sm'>
            {"Don't have an account?"}{' '}
            <a href='#' className='text-blue-500 font-semibold animate-fade-in'>
              Sign up
            </a>
          </p>
        </div>

        {/* App Download Section */}
        <div className='mt-5 text-center'>
          <p className='text-sm mb-4'>Get the app.</p>
          <div className='flex justify-center space-x-2 items-center gap-3 *:flex *:items-center'>
            <div>
              <Image
                className='mr-1'
                src={'/images/app-store.svg'}
                alt='Logout Icon'
                width={25}
                height={25}
              />
              <p>App Store</p>
            </div>
            <div>
              <Image
                className='mr-1'
                src={'/images/google-play.svg'}
                alt='Logout Icon'
                width={20}
                height={20}
              />
              <p className='ms-1'>Google Play</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='mt-8 text-center text-xs text-gray-500'>
          <div className='flex flex-wrap justify-center mb-3'>
            <a href='#' className='mx-2 mb-2'>
              About
            </a>
            <a href='#' className='mx-2 mb-2'>
              Blog
            </a>
            <a href='#' className='mx-2 mb-2'>
              Jobs
            </a>
            <a href='#' className='mx-2 mb-2'>
              Help
            </a>
            <a href='#' className='mx-2 mb-2'>
              API
            </a>
            <a href='#' className='mx-2 mb-2'>
              Privacy
            </a>
            <a href='#' className='mx-2 mb-2'>
              Terms
            </a>
            <a href='#' className='mx-2 mb-2'>
              Top Accounts
            </a>
            <a href='#' className='mx-2 mb-2'>
              Hashtags
            </a>
            <a href='#' className='mx-2 mb-2'>
              Locations
            </a>
          </div>
          <div>© 2025 Instagram from Meta</div>
        </div>
      </div>
    );
  }
}
