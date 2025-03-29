import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { UseCycleIndex } from 'hooks/use-cycle-index';
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function Dots({
  max = 9,
  ...props
}: {
  indexController: UseCycleIndex;
  length: number;
  max?: number;
}) {
  const container = useRef(null);
  const dots = Array(props.length).fill(0);
  const [ref, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    watchDrag: false,
  });

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi?.scrollTo(props.indexController.index);
  }, [props.indexController.index, emblaApi]);

  return (
    <div ref={ref} className="relative w-28 overflow-hidden">
      <div className="flex" ref={container}>
        {dots.map((_, index) => {
          return (
            <motion.button
              key={index}
              // viewport={{
              //   root: container,
              //   margin: '0px -20px 0px -20px',
              //   amount: 0.99,
              // }}
              // whileInView={{ scale: 1, transition: { delay: 0.2 } }}
              // initial={{ scale: 0 }}
              // exit={{ scale: 0 }}
              onClick={() => {
                emblaApi?.scrollTo(index);
                props.indexController.goTo(index);
              }}
              className={clsx(
                'mx-0.5 inline-block h-2 w-2 min-w-0 shrink-0 rounded-full',
                props.indexController.index === index
                  ? 'bg-club-500 dark:bg-miami'
                  : 'bg-slate-200 dark:bg-slate-600',
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
