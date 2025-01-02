import Header from '@/components/header';

export const dynamic = 'force-dynamic';

export const revalidate = 60;

const PrimaryLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />

      <main>{children}</main>
    </>
  );
};

export default PrimaryLayout;
