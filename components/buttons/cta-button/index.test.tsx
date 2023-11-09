import { render, screen } from '@testing-library/react';
import { CTAButton } from '.';

describe('given a <CTAButton>', () => {
  test('then it renders an accessible button', () => {
    render(<CTAButton>Click me</CTAButton>);
    expect(
      screen.getByRole('button', { name: 'Click me' }),
    ).toBeInTheDocument();
  });
});
