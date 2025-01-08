import DisableDraftMode from '@/components/disable-draft-mode';
import Footer from '@/components/footer';
import Header from '@/components/header';
import ShowView from '@/components/show-view';
import { SanityLive } from '@/sanity/lib/live';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';

export const dynamic = 'force-dynamic';

export const revalidate = 60;

const PrimaryLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />

      <SanityLive />

      <ShowView when={isDraftMode}>
        <DisableDraftMode />

        <VisualEditing />
      </ShowView>
    </>
  );
};

export default PrimaryLayout;
