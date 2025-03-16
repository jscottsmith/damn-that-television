import { GIPHY_BY_ID } from './constants';
import { createApiUrl } from './create-api-url';

describe('given createApiUrl', () => {
  describe('when called with a route', () => {
    const route = GIPHY_BY_ID;

    test('then it returns a complete url with the api key appended as a param', () => {
      const expected = 'https://api.giphy.com/v1/gifs?api_key=abc123';
      const actual = createApiUrl(route);
      expect(actual).toBe(expected);
    });

    describe('and when called with object params', () => {
      const params = {
        id: 'foo',
        limit: 'bar',
      };

      test('then it returns a complete url with api key and additional params appended', () => {
        const expected =
          'https://api.giphy.com/v1/gifs?id=foo&limit=bar&api_key=abc123';
        const actual = createApiUrl(route, params);
        expect(actual).toBe(expected);
      });
    });
  });
});
