'use client';
import { TextField } from '@radix-ui/themes';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SearchForm = () => {
  const router = useRouter();
  return (
    <form
      action={async (data) => {
        router.push(`/search?query=${data.get('query')}`);
      }}
    >
      <TextField.Root
        size='3'
        name='query'
        placeholder='Search for post or users...'
      >
        <TextField.Slot>
          <button
            type='submit'
            className='bg-transparent border-none cursor-pointer'
          >
            <SearchIcon />
          </button>
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
};

export default SearchForm;
