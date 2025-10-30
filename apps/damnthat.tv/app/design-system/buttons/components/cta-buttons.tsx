import React from 'react';
import { ComponentSection } from '../../component-section';
import {
  CTAButton,
  CTAButtonSizes,
  CTAButtonTypes,
} from '@/components/buttons/cta-button';

const sizes = [CTAButtonSizes.default]; // Object.values(CTAButtonSizes);
const types = Object.values(CTAButtonTypes);

export default function CTAButtons() {
  return (
    <ComponentSection title="CTA Buttons">
      <div className="flex flex-row gap-lg">
        {types.map((type) => (
          <div className="flex items-end gap-sm" key={type}>
            {sizes.map((size) => (
              <CTAButton buttonSize={size} buttonType={type} key={size}>
                Wake Up!
              </CTAButton>
            ))}
          </div>
        ))}
      </div>
    </ComponentSection>
  );
}
