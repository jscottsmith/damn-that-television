import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('given a <Button>', () => {
  it('renders an accessible button', () => {
    render(<Button>Click me</Button>);

    expect(
      screen.getByRole('button', { name: 'Click me' }),
    ).toBeInTheDocument();
  });
});
