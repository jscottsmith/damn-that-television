import { GIPHY_API_URL } from './constants';

export function createApiUrl(route: string, params?: any): string {
  const urlParams = new URLSearchParams();
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      urlParams.set(key, params[key]);
    }
  }

  urlParams.set('api_key', process.env.NEXT_PUBLIC_API_KEY_GIPHY ?? 'not-set');

  return `${GIPHY_API_URL}${route}?${urlParams.toString()}`;
}
