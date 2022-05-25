import { Button, ButtonSizes, ButtonTypes } from '@/components/button';
import React from 'react';

type Props = { handleStart: () => void };

export const GameIntro = (props: Props) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center p-md md:p-lg bg-club">
      <div className="max-w-2xl">
        <div className="">
          <h2 className="relative text-center pb-[5%]">
            <span className="block font-futura leading-none uppercase italic font-black text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              Damn TV!
            </span>
            <span className="inline-block -rotate-6 absolute left-[30%] bottom-2 bg-cream rounded-sm font-futura italic font-bold text-md md:text-xl lg:text-3xl xl:text-5xl px-sm md:px-md lg:px-lg">
              (the Game)
            </span>
          </h2>
        </div>
        <div className="text-ghost my-lg md:my-2xl flex flex-col max-w-md mx-auto">
          <p className="font-futura font-medium md:my-xs text-2xl md:text-3xl xl:text-4xl">
            Space, Click or Tap to shoot.
          </p>
          <p className="font-futura font-medium md:my-xs text-2xl md:text-3xl xl:text-4xl">
            Mouse or Touch to move.
          </p>
          <p className="font-futura font-medium md:my-xs text-2xl md:text-3xl xl:text-4xl">
            Kill the TVs to win.<sup>*</sup>
          </p>
          <p className="font-poppins font-bold my-md text-base text-deep">
            * I lied you can&apos;t win a game with no end.
          </p>
        </div>
        <div className="text-center">
          <Button
            className="w-10xl"
            buttonType={ButtonTypes.deep}
            buttonSize={ButtonSizes.lg}
            onClick={props.handleStart}
          >
            Hit it!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameIntro;
