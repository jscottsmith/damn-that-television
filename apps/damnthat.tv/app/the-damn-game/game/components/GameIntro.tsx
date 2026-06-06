import {
  CTAButton,
} from '@workspace/ui/components/cta-button';
import React from 'react';

type Props = { handleStart: () => void };

export const GameIntro = (props: Props) => {
  return (
    <div className="bg-club p-md md:p-lg fixed inset-0 flex items-center justify-center">
      <div className="max-w-2xl">
        <div className="">
          <h2 className="relative pb-[5%] text-center">
            <span className="font-futura block text-6xl leading-none font-black uppercase italic md:text-7xl lg:text-8xl xl:text-9xl">
              Damn TV!
            </span>
            <span className="text-md bg-cream px-sm font-futura md:px-md lg:px-lg absolute bottom-2 left-[30%] inline-block -rotate-6 rounded-sm font-bold italic md:text-xl lg:text-3xl xl:text-5xl">
              (the Game)
            </span>
          </h2>
        </div>
        <div className="my-lg text-ghost md:my-2xl mx-auto flex max-w-md flex-col">
          <p className="font-futura md:my-xs text-2xl font-medium md:text-3xl xl:text-4xl">
            Space, Click or Tap to shoot.
          </p>
          <p className="font-futura md:my-xs text-2xl font-medium md:text-3xl xl:text-4xl">
            Mouse or Touch to move.
          </p>
          <p className="font-futura md:my-xs text-2xl font-medium md:text-3xl xl:text-4xl">
            Kill the TVs to win.<sup>*</sup>
          </p>
          <p className="my-md font-poppins text-deep text-base font-bold">
            * I lied you can&apos;t win a game with no end.
          </p>
        </div>
        <div className="text-center">
          <CTAButton
            className="w-10xl"
            buttonType="deep"
            buttonSize="lg"
            onClick={props.handleStart}
          >
            Hit it!
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default GameIntro;
