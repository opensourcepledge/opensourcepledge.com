<!--
© 2024 Vlad-Stefan Harbuz <vlad@vladh.net>
SPDX-License-Identifier: CC-BY-SA-4.0
-->

# Contributing

This document contains various bits of information that might be useful for contributors.

## Running Locally

To run locally:

```
npx astro dev
```

Make sure you run TypeScript checks after making TypeScript changes:

```
npx astro check
```

## New Member Workflows

When a new member joins, workflows are run to update `src/content/members`. The workflow can be found in
`.github/workflows/deploy.yml`, and the code that updates member data can be found in `bin/`.

## Copyright Headers

We maintain copyright headers at the top of every file to establish authorship. Once you make substantive changes to any
file, add yourself to the copyright headers.

Remember that copyright statements such as “(C) John Smith 2020” contain the year copyright _started_, i.e. 2020 is the
year the work was first created, not the current year.

## Browser Support

The least-supported clientside feature we're using is CSS Nesting. This means that our supported browser are described
by the [CSS Nesting Can I Use page](https://caniuse.com/css-nesting).
