import clsx from 'clsx';

export function TitleAndSubtitle(props: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  const hasSub = !!props.subtitle;
  return (
    <div
      className={clsx(
        props.className,
        'font-futura flex flex-wrap text-foreground',
      )}
    >
      <span className="inline-block font-medium">{props.title}</span>
      {hasSub && (
        <>
          <span className="border-peach dark:border-club-700 mx-4 my-1 inline-block border-r-2 border-solid" />
          <span className="inline-block font-light italic">
            {props.subtitle}
          </span>
        </>
      )}
    </div>
  );
}
