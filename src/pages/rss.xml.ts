// © 2024 Functional Software, Inc. dba Sentry
// SPDX-License-Identifier: Apache-2.0

import type { APIRoute } from 'astro';
import { getRssString } from '@astrojs/rss';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import type { SanityDocument } from "@sanity/client";
import { sanityClient } from "sanity:client";
import { toHTML } from '@portabletext/to-html'
import { urlForImage } from '../sanityUtil.ts';

const ARTICLES_QUERY = `*[_type == "article"]|order(publishDateTime desc){
  _id,
  title,
  slug,
  content,
  publishDateTime,
  author->{name, slug, avatar}
}`;

export const GET: APIRoute = async (context) => {
  const articles = (await sanityClient.fetch<SanityDocument[]>(ARTICLES_QUERY))
    .filter((a) => dayjs(a.publishDateTime).isBefore(dayjs().utc()));

  const rssString = await getRssString({
    title: 'The Open Source Pledge Blog',
    description: 'Unlocking funds from companies to Open Source maintainers.',
    site: context.site as URL,
    items: articles.map((a) => {
      return {
        title: a.title,
        pubDate: a.publishDateTime,
        author: a.author.name,
        link: `/blog/${a.slug.current}/`,
        description: toHTML(a.content, {
          components: {
            types: {
							captionedImage: ({ value }) => {
                const styleAttribute = value.maxWidth && `style="max-width: ${value.maxWidth}"`;
                const captionHTML = value.url
                  ? `<a href="${value.url}">${value.caption ?? ''}</a>`
                  : `<span>${value.caption ?? ''}</span>`

								return `
                  <figure>
                    <img
                      src="${urlForImage(value.asset)}"
                      title="${value.titleText ?? ''}"
                      alt="${value.altText ?? ''}"
                      ${styleAttribute ?? ''}
                    >
                    <figcaption><em>${captionHTML}</em></figcaption>
                  </figure>
                `;
							},
							youtubeEmbed: ({ value }) => `
                <iframe
                  width="980"
                  height="551"
                  src="https://www.youtube-nocookie.com/embed/${value.videoId}"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              `,
							horizontalRule: () => "<hr />",
							callToAction: ({ value }) => `
                <section style="text-align: center; margin-top: 4rem">
                  <h2>${value.text}</h2>
                  <a href="/join" class="margin-top: 1rem; text-transform: uppercase;">Join the Pledge</a>
                </section>
              `,
					  },
          }
        })
      };
    }),
    stylesheet: '/rss.xsl',
  });
  const res = new Response(rssString, {
    headers: {
      // `application/rss+xml` is technically the correct content type, but it
      // results in the XML file being downloaded instead of displayed in eg
      // Firefox, which defeats the purpose of our styling; and `text/xml` is
      // the most widely used content type for RSS.
      'Content-Type': 'text/xml; charset=utf-8',
    },
  });
  return res;
}
