export type ImageItem = DataEntity;
export type ImageCollection = DataEntity[];

// NOTE: types below were generated based on the API response

export interface GiphyByIdsResponse {
  data?: DataEntity[] | null;
  pagination: Pagination;
  meta: Meta;
}
export interface DataEntity {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  user: User;
  analytics: Analytics;
  analytics_response_payload: string;
}

export interface Images {
  fixed_width_still: FixedWidthStillOrPreviewGifOrDownsizedOrDownsizedStillOrDownsizedMediumOrDownsizedLargeOrPreviewWebpOrOriginalStillOrFixedHeightSmallStillOrFixedWidthSmallStillOrFixedHeightStill;
  preview_gif: FixedWidthStillOrPreviewGifOrDownsizedOrDownsizedStillOrDownsizedMediumOrDownsizedLargeOrPreviewWebpOrOriginalStillOrFixedHeightSmallStillOrFixedWidthSmallStillOrFixedHeightStill;
  fixed_height_downsampled: FixedHeightDownsampledOrFixedWidthDownsampled;
  preview: PreviewOrOriginalMp4OrDownsizedSmallOrHd;
  fixed_height_small: FixedHeightSmallOrFixedWidthOrFixedWidthSmallOrFixedHeight;
  downsized: FixedWidthStillOrPreviewGifOrDownsizedOrDownsizedStillOrDownsizedMediumOrDownsizedLargeOrPreviewWebpOrOriginalStillOrFixedHeightSmallStillOrFixedWidthSmallStillOrFixedHeightStill;
  fixed_width_downsampled: FixedHeightDownsampledOrFixedWidthDownsampled;
  fixed_width: FixedHeightSmallOrFixedWidthOrFixedWidthSmallOrFixedHeight;
  downsized_still: FixedWidthStillOrPreviewGifOrDownsizedOrDownsizedStillOrDownsizedMediumOrDownsizedLargeOrPreviewWebpOrOriginalStillOrFixedHeightSmallStillOrFixedWidthSmallStillOrFixedHeightStill;
  downsized_medium: FixedWidthStillOrPreviewGifOrDownsizedOrDownsizedStillOrDownsizedMediumOrDownsizedLargeOrPreviewWebpOrOriginalStillOrFixedHeightSmallStillOrFixedWidthSmallStillOrFixedHeightStill;
  original_mp4: PreviewOrOriginalMp4OrDownsizedSmallOrHd;
  downsized_large: FixedWidthStillOrPreviewGifOrDownsizedOrDownsizedStillOrDownsizedMediumOrDownsizedLargeOrPreviewWebpOrOriginalStillOrFixedHeightSmallStillOrFixedWidthSmallStillOrFixedHeightStill;
  preview_webp: FixedWidthStillOrPreviewGifOrDownsizedOrDownsizedStillOrDownsizedMediumOrDownsizedLargeOrPreviewWebpOrOriginalStillOrFixedHeightSmallStillOrFixedWidthSmallStillOrFixedHeightStill;
  original: Original;
  original_still: FixedWidthStillOrPreviewGifOrDownsizedOrDownsizedStillOrDownsizedMediumOrDownsizedLargeOrPreviewWebpOrOriginalStillOrFixedHeightSmallStillOrFixedWidthSmallStillOrFixedHeightStill;
  fixed_height_small_still: FixedWidthStillOrPreviewGifOrDownsizedOrDownsizedStillOrDownsizedMediumOrDownsizedLargeOrPreviewWebpOrOriginalStillOrFixedHeightSmallStillOrFixedWidthSmallStillOrFixedHeightStill;
  fixed_width_small: FixedHeightSmallOrFixedWidthOrFixedWidthSmallOrFixedHeight;
  looping: Looping;
  downsized_small: PreviewOrOriginalMp4OrDownsizedSmallOrHd;
  fixed_width_small_still: FixedWidthStillOrPreviewGifOrDownsizedOrDownsizedStillOrDownsizedMediumOrDownsizedLargeOrPreviewWebpOrOriginalStillOrFixedHeightSmallStillOrFixedWidthSmallStillOrFixedHeightStill;
  fixed_height_still: FixedWidthStillOrPreviewGifOrDownsizedOrDownsizedStillOrDownsizedMediumOrDownsizedLargeOrPreviewWebpOrOriginalStillOrFixedHeightSmallStillOrFixedWidthSmallStillOrFixedHeightStill;
  fixed_height: FixedHeightSmallOrFixedWidthOrFixedWidthSmallOrFixedHeight;
  I480w_still: I480wStill;
  hd?: PreviewOrOriginalMp4OrDownsizedSmallOrHd1 | null;
}
export interface FixedWidthStillOrPreviewGifOrDownsizedOrDownsizedStillOrDownsizedMediumOrDownsizedLargeOrPreviewWebpOrOriginalStillOrFixedHeightSmallStillOrFixedWidthSmallStillOrFixedHeightStill {
  height: string;
  size: string;
  url: string;
  width: string;
}
export interface FixedHeightDownsampledOrFixedWidthDownsampled {
  height: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}
export interface PreviewOrOriginalMp4OrDownsizedSmallOrHd {
  height: string;
  mp4: string;
  mp4_size: string;
  width: string;
}
export interface FixedHeightSmallOrFixedWidthOrFixedWidthSmallOrFixedHeight {
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}
export interface Original {
  frames: string;
  hash: string;
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}
export interface Looping {
  mp4: string;
  mp4_size: string;
}
export interface I480wStill {
  url: string;
  width: string;
  height: string;
}
export interface PreviewOrOriginalMp4OrDownsizedSmallOrHd1 {
  height: string;
  mp4: string;
  mp4_size: string;
  width: string;
}
export interface User {
  id: number;
  avatar_url: string;
  avatar: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  attribution_display_name: string;
  name: string;
  description: string;
  suppress_chrome: boolean;
  user_type: string;
  is_public: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  metadata_title: string;
  metadata_description: string;
  website_url: string;
  website_display_url: string;
  facebook_url: string;
  twitter_url: string;
  twitter: string;
  instagram_url: string;
  tumblr_url: string;
  last_login: string;
  date_joined: string;
}
export interface Analytics {
  onload: OnloadOrOnclickOrOnsentOrOnstart;
  onclick: OnloadOrOnclickOrOnsentOrOnstart;
  onsent: OnloadOrOnclickOrOnsentOrOnstart;
  onstart: OnloadOrOnclickOrOnsentOrOnstart;
}
export interface OnloadOrOnclickOrOnsentOrOnstart {
  url: string;
}
export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}
export interface Meta {
  msg: string;
  status: number;
  response_id: string;
}
