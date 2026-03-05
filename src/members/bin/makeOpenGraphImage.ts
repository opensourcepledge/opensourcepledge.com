#!/usr/bin/env -S npx tsx

// © Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0

// Must be run in repository root.

import fs from 'fs';
import { Resvg } from '@resvg/resvg-js';
import type { ResvgRenderOptions } from '@resvg/resvg-js';
import { performance } from 'perf_hooks';
import { getMembers, getAllTimeTotalRaised, fmtCurrency } from '../common.ts';

const FONT_FILES = [
  './public/fonts/AzeretMono-Bold.ttf',
  './public/fonts/LibreFranklin-Regular.ttf',
];

async function main() {
  const allTimeTotal = fmtCurrency(getAllTimeTotalRaised(getMembers()));
  const svgTemplate = fs.readFileSync('./public/generated/templates/opengraph.svg').toString();
  const svg = svgTemplate.replace('{{ALL_TIME_TOTAL}}', allTimeTotal);
  console.log('Generated SVG file');

  const opts: ResvgRenderOptions = {
    font: {
      fontFiles: FONT_FILES,
      defaultFontFamily: 'Azeret Mono',
      loadSystemFonts: false,
    },
    logLevel: 'debug',
  };

  const t = performance.now();
  const resvg = new Resvg(svg, opts);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  fs.writeFileSync('./public/generated/output/opengraph.png', pngBuffer);

  console.log('Generated PNG file in', performance.now() - t, 'ms');
  console.log('Original SVG size:', `${resvg.width} x ${resvg.height}`)
  console.log('Output PNG size  :', `${pngData.width} x ${pngData.height}`)
}

main();
