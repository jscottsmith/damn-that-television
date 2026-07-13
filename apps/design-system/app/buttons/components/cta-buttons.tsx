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
      <div className="gap-6 flex flex-row">
        {types.map((type) => (
          <div className="gap-2 flex items-end" key={type}>
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
