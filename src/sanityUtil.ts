// © Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

import { sanityClient } from 'sanity:client';
import imageUrlBuilder from "@sanity/image-url";
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

export const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityAsset) {
  return imageBuilder.image(source).url();
}
