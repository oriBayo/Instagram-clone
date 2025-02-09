import SearchForm from '@/components/SearchForm';
import SearchResult from '@/components/SearchResult';
import { Suspense } from 'react';

const SearchPage = ({
  searchParams: { query },
}: {
  searchParams: { query: string };
}) => {
  return (
    <div className='max-w-lg mx-auto'>
      <SearchForm />
      <div className='mt-5'>
        <Suspense fallback='Loading...'>
          <div className='mt-10'>
            <SearchResult query={query} />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default SearchPage;
