import SvgIcon from './icon';

const NoBlogPosts = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 py-10 text-center shadow-app-foreground rounded-lg bg-app-background">
      <SvgIcon name="file-text" className="w-12 h-12" />
      <p className="mt-4 text-lg font-semibold">No Blog Posts Yet</p>
      <p className="mt-2 text-sm">
        Stay tuned! New blog posts will be available soon.
      </p>
    </div>
  );
};

export default NoBlogPosts;
