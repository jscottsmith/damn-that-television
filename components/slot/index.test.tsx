import { render, screen } from '@testing-library/react';
import { SlotComponent } from '.';

describe('given a <SlotComponent>', () => {
  test('then it renders a div by default', () => {
    render(<SlotComponent data-testid="root">test</SlotComponent>);
    expect(screen.getByTestId('root').tagName).toBe('DIV');
  });

  describe('when {asChild} is true', () => {
    test('then it renders an h1', () => {
      render(
        <SlotComponent as="h1" data-testid="root">
          test
        </SlotComponent>,
      );
      expect(screen.getByTestId('root').tagName).toBe('H1');
    });
  });

  describe('when {asChild} is true', () => {
    test('then it renders the child only', () => {
      render(
        <SlotComponent data-testid="root" asChild>
          <p>test</p>
        </SlotComponent>,
      );
      expect(screen.getByTestId('root').tagName).toBe('P');
    });

    test('then it merges the {className} of child and parent', () => {
      render(
        <SlotComponent className="foo" data-testid="root" asChild>
          <p className="bar">test</p>
        </SlotComponent>,
      );
      expect(screen.getByTestId('root')).toHaveClass('foo');
      expect(screen.getByTestId('root')).toHaveClass('bar');
    });

    test('then it merges tailwind {classNames} and omits the conflicts of the parent', () => {
      render(
        <SlotComponent className="pt-10" data-testid="root" asChild>
          <p className="pt-24">test</p>
        </SlotComponent>,
      );
      expect(screen.getByTestId('root')).toHaveClass('pt-24');
      expect(screen.getByTestId('root')).not.toHaveClass('pt-10');
    });
  });
});
