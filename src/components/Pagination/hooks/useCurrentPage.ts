import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const useCurrentPage = () => {
  const [searchParams] = useSearchParams();
  const currentPage = useMemo(() => {
    const page = searchParams.get('page');
    if (!page) return 1;

    return +page;
  }, [searchParams]);

  return { currentPage };
};

export default useCurrentPage;
