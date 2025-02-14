const home = () => '/';
const post = (slug: string) => `/posts/${slug}`;
const about = () => '/about';
const contact = () => '/contact';

export const routes = {
  home,
  post,
  about,
  contact,
};
