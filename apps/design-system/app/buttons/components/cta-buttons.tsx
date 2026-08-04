import React from 'react';
import { ComponentSection } from '../../component-section';
import {
  CTAButton,
  type CTAButtonSize,
  type CTAButtonType,
} from '@workspace/ui/components/cta-button';

const sizes: CTAButtonSize[] = ['default']; // ["sm", "default", "md", "lg"]
const types: CTAButtonType[] = ['pepto', 'blue', 'gray', 'deep'];

export default function CTAButtons() {
  return (
    <ComponentSection title="CTA Buttons">
      <div className="flex flex-row gap-6">
        {types.map((type) => (
          <div className="flex items-end gap-2" key={type}>
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
