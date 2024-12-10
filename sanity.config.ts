import { defineConfig, defineField } from "sanity";
import { structureTool } from "sanity/structure";

export default defineConfig({
  projectId: '4jfayhvz',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [
      {
        name: 'author',
        title: 'Author',
        type: 'document',
        fields: [
          defineField({
            name: 'name',
            title: 'Name',
            description: 'The name of this author',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'slug',
            title: 'Slug',
            description: 'The URL part that identifies this author, such as vlad-stefan-harbuz',
            type: 'slug',
            options: {
              source: 'name',
              slugify: input => input
                .toLowerCase()
                .replace(/\s+/g, '-')
                .slice(0, 200)
            },
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'avatar',
            title: 'Avatar',
            description: "The author's avatar image",
            type: 'image',
            validation: (rule) => rule.required(),
          }),
        ],
      },
      {
        name: 'article',
        title: 'Article',
        type: 'document',
        fields: [
          defineField({
            name: 'title',
            title: 'Title',
            description: 'The title of this article',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'slug',
            title: 'Slug',
            description: 'The URL part that identifies this article, such as my-cool-article',
            type: 'slug',
            options: {
              source: 'title',
              slugify: input => input
                .toLowerCase()
                .replace(/\s+/g, '-')
                .slice(0, 200)
            },
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'author',
            title: 'Author',
            description: 'The author of this article',
            type: 'reference',
            to: [ { type: 'author' } ],
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'canonicalUrl',
            title: 'Canonical URL',
            description: 'If this article has originally been published elsewhere, and that original location should be the canonical URL, enter that original URL here',
            type: 'url',
          }),
          defineField({
            name: 'bannerImage',
            title: 'Banner Image',
            description: 'A banner to be shown at the top of the article',
            type: 'image',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'bannerImageAltText',
            title: 'Banner Image Alt Text',
            description: 'Alt text for the banner image',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'publishDateTime',
            title: 'Publish Date/Time',
            description: 'The date and time at which an article should be visible after publishing. Leave empty for the article to be visible immediately',
            type: 'date',
            options: {
              dateFormat: 'DD MMM YYYY',
            }
          }),
          defineField({
            title: 'Content',
            name: 'content',
            description: "The article's content",
            type: 'array',
            of: [ { type: 'block' } ],
            validation: (rule) => rule.required(),
          })
        ],
      }
    ],
  },
  // Sanity's scheduled publishing is a bit cumbersome to work with, so we just
  // use our own publishDateTime field.
  scheduledPublishing: {
    enabled: false,
  }
});
