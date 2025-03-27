const home = () => '/';
const post = (slug: string) => `/posts/${slug}`;
const about = () => '/about';
const contact = () => '/contact';
const icons = () => '/icons';
const charity = () => 'https://wisdomhouse.org.uk';

export const routes = {
  home,
  post,
  about,
  contact,
  icons,
  charity,
};
