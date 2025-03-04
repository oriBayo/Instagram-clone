import Loading from '@/components/Loading';
import SearchForm from '@/components/SearchForm';
import SearchResult from '@/components/SearchResult';
import { Suspense } from 'react';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const query = (await searchParams).query;
  return (
    <div className='w-full'>
      <div className='max-w-lg mx-auto'>
        <SearchForm />
        {typeof query !== 'undefined' && (
          <Suspense fallback={<Loading />}>
            <SearchResult query={query} />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
