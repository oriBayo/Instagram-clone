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
      <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/images/image-2.jpeg')] bg-cover bg-center bg-no-repeat">
        {/* Main Container */}
        <div className='flex flex-col max-w-sm w-full bg-white border border-gray-300 rounded p-10 mb-3'>
          <div className='flex justify-center mb-8'>
            <Instagram
              size={60}
              className='border rounded-full p-2 bg-gradient-to-tr from-red-200 to-blue-100'
            />
          </div>

          <button
            onClick={handelSignIn}
            className='flex items-center justify-center w-full bg-white text-sm font-semibold text-gray-700 border border-gray-300 rounded py-2 px-4 mt-4 hover:bg-gray-50 transition duration-150'
          >
            <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
              <path
                fill='#4285F4'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='#34A853'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='#FBBC05'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='#EA4335'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg>
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
        <div className='flex items-center justify-center w-full max-w-sm bg-white border border-gray-300 rounded p-4'>
          <p className='text-sm'>
            Don't have an account?{' '}
            <a href='#' className='text-blue-500 font-semibold'>
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
                width={30}
                height={30}
              />
              <p>App Store</p>
            </div>
            <div>
              <Image
                className='mr-1'
                src={'/images/google-play.svg'}
                alt='Logout Icon'
                width={30}
                height={30}
              />
              <p>Google Play</p>
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
