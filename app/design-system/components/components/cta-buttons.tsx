import React from 'react';
import { ComponentSection } from './component-section';
import {
  CTAButton,
  CTAButtonSizes,
  CTAButtonTypes,
} from '@/components/buttons/cta-button';

const sizes = Object.values(CTAButtonSizes);
const types = Object.values(CTAButtonTypes);

export default function CTAButtons() {
  return (
    <ComponentSection title="CTA Buttons - Primary/Secondary">
      <div className="flex flex-col gap-lg">
        {types.map((type) => (
          <div className="flex gap-sm items-end" key={type}>
            {sizes.map((size) => (
              <CTAButton buttonSize={size} buttonType={type} key={size}>
                Say Hello
              </CTAButton>
            ))}
          </div>
        ))}
      </div>
    </ComponentSection>
  );
}
