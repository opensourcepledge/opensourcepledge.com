// © Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

import { createClient } from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url";
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

export const sanityClient = makeClient();
export const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityAsset) {
  return imageBuilder.image(source).url();
}

export function makeClient() {
  return createClient({
    projectId: '4jfayhvz',
    dataset: 'production',
    apiVersion: '2026-05-13',
    useCdn: true,
    requestTagPrefix: 'pledge-astro',
  });
}
