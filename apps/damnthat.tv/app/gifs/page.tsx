import { METADATA } from '@/constants/app';
import { GalleryContextProvider } from './components/gallery-context-provider';
import { GalleryRoute } from './gallery';
import { fetchGiphyImages } from './service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `GIFs | ${METADATA.title}`,
  description: 'Damn good collection of GIFs created by me and hosted on Giphy',
};

export default async function GalleryPage() {
  const images = await fetchGiphyImages();

  return (
    <GalleryContextProvider images={images.data}>
      <GalleryRoute />
    </GalleryContextProvider>
  );
}
