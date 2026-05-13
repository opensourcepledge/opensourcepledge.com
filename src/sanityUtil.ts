// © Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

import sanityClient from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url";
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

export const ourSanityClient = makeClient();
export const imageBuilder = imageUrlBuilder(ourSanityClient);

export function urlForImage(source: SanityAsset) {
  return imageBuilder.image(source).url();
}

export function makeClient() {
  return sanityClient({
    projectId: '4jfayhvz',
    dataset: 'production',
    apiVersion: '2026-05-13',
    useCdn: true,
    requestTagPrefix: 'pledge-astro',
  });
}
