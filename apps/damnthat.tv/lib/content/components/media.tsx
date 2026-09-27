import MediaAsset from '@/components/media-asset';

export function Media({
  src,
  alt,
  title,
  description,
  width,
  height,
}: {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}) {
  return (
    <MediaAsset
      image={{ src, alt, width, height }}
      title={title}
      description={
        description ? (
          <span dangerouslySetInnerHTML={{ __html: description }} />
        ) : null
      }
      showOverlay={false}
    />
  );
}
