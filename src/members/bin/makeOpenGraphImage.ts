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
  './public/fonts/AzeretMono-BlackItalic.ttf',
  './public/fonts/AzeretMono-Black.ttf',
  './public/fonts/AzeretMono-BoldItalic.ttf',
  './public/fonts/AzeretMono-Bold.ttf',
  './public/fonts/AzeretMono-ExtraBoldItalic.ttf',
  './public/fonts/AzeretMono-ExtraBold.ttf',
  './public/fonts/AzeretMono-ExtraLightItalic.ttf',
  './public/fonts/AzeretMono-ExtraLight.ttf',
  './public/fonts/AzeretMono-Italic.ttf',
  './public/fonts/AzeretMono-LightItalic.ttf',
  './public/fonts/AzeretMono-Light.ttf',
  './public/fonts/AzeretMono-MediumItalic.ttf',
  './public/fonts/AzeretMono-Medium.ttf',
  './public/fonts/AzeretMono-Regular.ttf',
  './public/fonts/AzeretMono-SemiBoldItalic.ttf',
  './public/fonts/AzeretMono-SemiBold.ttf',
  './public/fonts/AzeretMono-ThinItalic.ttf',
  './public/fonts/AzeretMono-Thin.ttf',
  './public/fonts/LibreFranklin-BlackItalic.ttf',
  './public/fonts/LibreFranklin-Black.ttf',
  './public/fonts/LibreFranklin-BoldItalic.ttf',
  './public/fonts/LibreFranklin-Bold.ttf',
  './public/fonts/LibreFranklin-ExtraBoldItalic.ttf',
  './public/fonts/LibreFranklin-ExtraBold.ttf',
  './public/fonts/LibreFranklin-ExtraLightItalic.ttf',
  './public/fonts/LibreFranklin-ExtraLight.ttf',
  './public/fonts/LibreFranklin-Italic.ttf',
  './public/fonts/LibreFranklin-LightItalic.ttf',
  './public/fonts/LibreFranklin-Light.ttf',
  './public/fonts/LibreFranklin-MediumItalic.ttf',
  './public/fonts/LibreFranklin-Medium.ttf',
  './public/fonts/LibreFranklin-Regular.ttf',
  './public/fonts/LibreFranklin-SemiBoldItalic.ttf',
  './public/fonts/LibreFranklin-SemiBold.ttf',
  './public/fonts/LibreFranklin-ThinItalic.ttf',
  './public/fonts/LibreFranklin-Thin.ttf',
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
