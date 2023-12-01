import { useCallback, useMemo } from 'react';
import ReactPaginate from 'react-paginate';

import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import ChevronLeftDouble from '@/assets/icons/chevron-left-double.svg?react';
import ChevronRight from '@/assets/icons/chevron-right.svg?react';
import ChevronRightDouble from '@/assets/icons/chevron-right-double.svg?react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
}

const Pagination = ({ totalPage, currentPage }: PaginationProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // page 쿼리 파라미터 외의 다른 파라미터가 있을 경우
  // 페이지 이동 시 다른 파라미터를 빠뜨리지 않기 위함
  const params = useMemo(() => {
    return new URLSearchParams(
      [...searchParams.entries()].filter(([key]) => key !== 'page')
    );
  }, [searchParams]);

  // 10페이지 이전으로
  const onClickPreviousDouble = useCallback(() => {
    const targetPage = currentPage - 10 < 1 ? 1 : currentPage - 10;

    params.append('page', String(targetPage));
    navigate(`?${params}`);
  }, [currentPage, navigate, params]);

  // 10페이지 다음으로
  const onClickNextDouble = useCallback(() => {
    const targetPage =
      currentPage + 10 > totalPage ? totalPage : currentPage + 10;

    params.append('page', String(targetPage));
    navigate(`?${params}`);
  }, [currentPage, navigate, params, totalPage]);

  const onPageChange = useCallback(
    ({ selected }: { selected: number }) => {
      params.append('page', String(selected + 1));
      navigate(`?${params}`);
    },
    [navigate, params]
  );

  // 페이지 블록을 5개로 유지하기 위함 (첫페이지 페이지1 페이지2 페이지3 끝페이지)
  const pageRangeDisplayed = useMemo(() => {
    if (currentPage === 1 || currentPage === totalPage) {
      return 3;
    } else if (currentPage === 2 || currentPage === totalPage - 1) {
      return 2;
    } else {
      return 1;
    }
  }, [currentPage, totalPage]);

  return (
    <div className="mx-auto flex w-fit gap-8 [&_svg_path]:fill-gray-500">
      <div
        onClick={onClickPreviousDouble}
        className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-4 border border-white"
      >
        <ChevronLeftDouble />
      </div>
      <ReactPaginate
        breakLabel="···"
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={1}
        previousLabel={<ChevronLeft />}
        nextLabel={<ChevronRight />}
        onPageChange={onPageChange}
        pageCount={totalPage}
        renderOnZeroPageCount={() => null}
        forcePage={currentPage - 1}
        className="pagination"
      />
      <div
        onClick={onClickNextDouble}
        className="flex h-28 w-28 cursor-pointer items-center justify-center rounded-4 border border-white"
      >
        <ChevronRightDouble />
      </div>
    </div>
  );
};

export default Pagination;
