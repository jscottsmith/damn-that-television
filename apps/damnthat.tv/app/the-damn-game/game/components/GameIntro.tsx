import { CTAButton } from '@workspace/ui/components/cta-button';
import React from 'react';

type Props = { handleStart: () => void };

export const GameIntro = (props: Props) => {
  return (
    <div className="bg-club fixed inset-0 flex items-center justify-center p-4 md:p-6">
      <div className="max-w-2xl">
        <div className="">
          <h2 className="relative pb-[5%] text-center">
            <span className="font-futura block text-6xl leading-none font-black uppercase italic md:text-7xl lg:text-8xl xl:text-9xl">
              Damn TV!
            </span>
            <span className="text-md bg-cream font-futura absolute bottom-2 left-[30%] inline-block -rotate-6 rounded-sm px-2 font-bold italic md:px-4 md:text-xl lg:px-6 lg:text-3xl xl:text-5xl">
              (the Game)
            </span>
          </h2>
        </div>
        <div className="text-ghost mx-auto my-6 flex max-w-md flex-col md:my-12">
          <p className="font-futura text-2xl font-medium md:my-1 md:text-3xl xl:text-4xl">
            Space, Click or Tap to shoot.
          </p>
          <p className="font-futura text-2xl font-medium md:my-1 md:text-3xl xl:text-4xl">
            Mouse or Touch to move.
          </p>
          <p className="font-futura text-2xl font-medium md:my-1 md:text-3xl xl:text-4xl">
            Kill the TVs to win.<sup>*</sup>
          </p>
          <p className="font-poppins text-deep my-4 text-base font-bold">
            * I lied you can&apos;t win a game with no end.
          </p>
        </div>
        <div className="text-center">
          <CTAButton
            className="w-64"
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
