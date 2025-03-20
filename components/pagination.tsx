'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import SvgIcon from './icon';
import ShowView from './show-view';
import { scrollToHeading } from '@/utils/scrollToHeading';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    scrollToHeading('blog-posts');

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-end items-center gap-2 mt-6 text-a-14">
      <ShowView when={currentPage > 1}>
        <button
          className="w-fit h-fit p-2 aspect-square border disabled:opacity-50 rounded-full border-primary"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <SvgIcon name="chevron-right" className="w-3 h-3 rotate-180" />
        </button>
      </ShowView>

      <span className=" py-2 [&>span]:font-bold [&>span]:mx-[0.7ch]  [&>span]:text-primary ">
        Page<span>{currentPage}</span>of<span>{totalPages}</span>
      </span>

      <ShowView when={currentPage < totalPages}>
        <button
          className="w-fit h-fit p-2 aspect-square border disabled:opacity-50 rounded-full border-primary"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <SvgIcon name="chevron-right" className="w-3 h-3" />
        </button>
      </ShowView>
    </div>
  );
};

export default Pagination;
