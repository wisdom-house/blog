import { cn } from '@/lib/classnameMerge';
import { Button } from './buttons/button';
import SvgIcon from './icon';
import ShowView from './show-view';

interface SearchProps {
  iconButton?: boolean;
}

const Search = ({ iconButton = false }: SearchProps) => {
  return (
    <div className="w-full h-max">
      <div
        className={cn(
          'flex-1 flex gap-3 w-full overflow-hidden rounded items-center border bg-white shadow-app-shadow mx-auto',
          iconButton && 'px-2 gap-4'
        )}
      >
        <input
          type="search"
          name=""
          id="search"
          className="flex-1 p-2 outline-none"
          placeholder="Search posts"
        />

        <label htmlFor="search">
          <ShowView
            when={iconButton}
            fallback={<Button className="rounded-none">Search</Button>}
          >
            <button className="block" aria-label="search blog">
              <SvgIcon name="search" className="w-6 h-6" />
            </button>
          </ShowView>
        </label>
      </div>
    </div>
  );
};

export default Search;
