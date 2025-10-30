import {
  CTAButton,
  CTAButtonSizes,
  CTAButtonTypes,
} from '@/components/buttons/cta-button';
import React from 'react';

type Props = { handleStart: () => void };

export const GameIntro = (props: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-club p-md md:p-lg">
      <div className="max-w-2xl">
        <div className="">
          <h2 className="relative pb-[5%] text-center">
            <span className="block font-futura text-6xl font-black uppercase italic leading-none md:text-7xl lg:text-8xl xl:text-9xl">
              Damn TV!
            </span>
            <span className="text-md absolute bottom-2 left-[30%] inline-block -rotate-6 rounded-sm bg-cream px-sm font-futura font-bold italic md:px-md md:text-xl lg:px-lg lg:text-3xl xl:text-5xl">
              (the Game)
            </span>
          </h2>
        </div>
        <div className="mx-auto my-lg flex max-w-md flex-col text-ghost md:my-2xl">
          <p className="font-futura text-2xl font-medium md:my-xs md:text-3xl xl:text-4xl">
            Space, Click or Tap to shoot.
          </p>
          <p className="font-futura text-2xl font-medium md:my-xs md:text-3xl xl:text-4xl">
            Mouse or Touch to move.
          </p>
          <p className="font-futura text-2xl font-medium md:my-xs md:text-3xl xl:text-4xl">
            Kill the TVs to win.<sup>*</sup>
          </p>
          <p className="my-md font-poppins text-base font-bold text-deep">
            * I lied you can&apos;t win a game with no end.
          </p>
        </div>
        <div className="text-center">
          <CTAButton
            className="w-10xl"
            buttonType={CTAButtonTypes.deep}
            buttonSize={CTAButtonSizes.lg}
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
