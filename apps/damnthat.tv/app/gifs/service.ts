import { DAMN_GIPHY_IDS, GIPHY_BY_ID } from './constants';
import { GiphyByIdsResponse } from './types';
import { createApiUrl } from './create-api-url';

export function fetchGiphyImages(): Promise<GiphyByIdsResponse> {
  return fetch(
    createApiUrl(GIPHY_BY_ID, {
      ids: DAMN_GIPHY_IDS.join(','),
    }),
  )
    .then((res) => res.json())
    .then((res) => res);
}
