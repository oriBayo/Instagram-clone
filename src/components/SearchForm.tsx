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
      <TextField.Root name='query' placeholder='Search for post or users...'>
        <TextField.Slot>
          <SearchIcon />
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
};

export default SearchForm;
