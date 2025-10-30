import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { ImageCollection } from '../../types';
import { GalleryContextProvider, useGalleryContext } from './index';

const testContext = [{ id: 'foo' }] as ImageCollection;

function Wrapper(props: PropsWithChildren<{}>) {
  const images: ImageCollection = testContext;

  return (
    <GalleryContextProvider images={images}>
      {props.children}
    </GalleryContextProvider>
  );
}

describe('given the GalleryContextProvider', () => {
  describe('when rendered with provide images prop', () => {
    test('then renders children', () => {
      const { getByTestId } = render(<div data-testid="test" />, {
        wrapper: Wrapper,
      });
      expect(getByTestId('test')).toBeInTheDocument();
    });

    test('then provides the image context to consumers', () => {
      let actualContext;
      function TestContext() {
        actualContext = useGalleryContext();
        return null;
      }

      render(<TestContext />, {
        wrapper: Wrapper,
      });

      expect(actualContext).toBe(testContext);
      expect(actualContext[0].id).toBe(testContext[0].id);
    });
  });
});
