import { useState } from 'react';
import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';

type GalleryImageProps = ImageProps & {
  smallImageSrc: string;
};

export function GalleryImage(props: GalleryImageProps) {
  const { smallImageSrc, className, alt, ...rest } = props;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onLoad = () => setIsLoaded(true);

  return (
    <div className="relative overflow-hidden bg-gray-100">
      <Image
        onDragStart={(e) => {
          e.preventDefault();
        }}
        className={clsx(isLoaded ? 'opacity-100' : 'opacity-0', className)}
        onLoad={onLoad}
        alt={alt}
        {...rest}
      />

      <Image
        onDragStart={(e) => e.preventDefault()}
        className={clsx(
          'absolute inset-0 z-10 w-full max-w-none scale-125 blur-xl transition-all duration-1000',
          isLoaded ? 'hidden opacity-0' : 'opacity-100',
        )}
        alt={alt}
        {...rest}
        src={props.smallImageSrc}
      />
    </div>
  );
}
