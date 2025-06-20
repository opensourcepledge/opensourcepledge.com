// © 2024 Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0

import type { APIRoute } from 'astro';

import css from '../styles/common.css?raw';

export const GET: APIRoute = async (_context) => {
  // NOTE: This is a bit of a hack, but I haven't found a straightforward way
  // to have Astro build a separate CSS file in production. Know how? Send a
  // PR!
  // NOTE: At the time of writing, this is used only in `rss.xsl`. It doesn't
  // seem straightforwardly possible to embed the CSS in the XSL file.
  return new Response(css, {
    headers: {
      'Content-Type': 'text/css',
    },
  });
}
