<!--
© 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
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

Here's what the workflow for a new member looks like:

### 1. Prospective member creates issue

For a new member to join, they must create an issue asking to join and providing the information requested in our
[Join][join] page.

### 2. Create `src/content/members/<member-slug>.json`

After verifying that the prospective member's submitted data is correct, create a JSON file in
`src/content/members/<member-slug>.json` with this data. The member slug should contain no spaces.

### 3. Add logo to `public/images/members`

The member logo to be shown on the website must be added as `public/images/members/<slug>/logo.webp`. These files should
be square, kept at or below 800x800px, and compressed as much as possible without giving up fidelity.

Here are some tips. For logos that are shape-based illustrations:

```sh
magick logo.jpg -resize '>800x' -quality 20 -define webp:lossless=true -define webp:exact=true logo.webp
```

For logos that have fine details:

```sh
magick logo.jpg -resize '>800x' -quality 99 -define webp:lossless=false -define webp:exact=true logo.webp
```

Remember that a corresponding `logo.webp.license` file must also be added.

### 4. Add role to `src/memberRoles.json`

The step which actually causes a member to show up on the website is adding them to `src/memberRoles.json`. For an
entry's key, use the same member slug you used in the JSON filename. Members should have a “Member” role by default,
though members can also have custom roles.

At this point, the member will show up on the website.

### 5. (Technically Optional) Logo added to `src/assets/images/members`

For a member's logo to show up on the homepage, it must be added to `src/assets/images/members/<slug>/minimal.svg`. This
should be a white- or greyscale-only version of the member's logo. If in doubt, check the other existing logos. Note
that this must be an SVG file. If a vector logo is somehow not available, raster graphics can be embedded into an SVG.

Remember that a corresponding `minimal.svg.license` file must also be added.

### Additional Information

When onboarding members, we will receive logo files for those members. Make sure to contribute these logo files, and any
modified logo files you create, back to our [“Member Logos”][member-logos] Google Drive folder. If you don't have
access, contact @selviano.

[member-logos]: https://drive.google.com/drive/folders/1HxYaaY1wy1hZT6O0ZY58s7Y8N4aV0fcn

## Authorship Information

We maintain copyright headers at the top of every file to establish authorship. Once you make substantive changes to any
file, add yourself to the copyright headers.

Remember that copyright statements such as “(C) John Smith 2020” contain the year copyright _started_, i.e. 2020 is the
year the work was first created, not the current year.

Authorship information should also be recorded for assets such as images and fonts, listing the license under which we
obtained the asset, and the authorship information. This example from `REUSE.toml` is helpful:

```toml
[[annotations]]
path = [
    "public/fonts/azaret-mono*",
]
SPDX-FileCopyrightText = "Copyright 2021 The Azeret Project Authors (https://github.com/displaay/azeret)"
SPDX-License-Identifier = "OFL-1.1"
```

Ideally, we would be REUSE-compliant. This can be verified by running `reuse lint` in the root of the repository. At the
time of writing, the repository is REUSE-compliant, but `reuse lint` is quite fiddly, so we may reach a point where this
is impractical.

Non-copyrightable files (e.g. machine-generated files), and files for which it is impractical to specify authorship
information along with the file, are listed in `REUSE.toml`.

## Uptime

We track uptime using [updown.io][updown]: [Open Source Pledge Status Page][status].

## Browser Support

The least-supported clientside feature we're using is CSS Nesting. This means that our supported browser are described
by the [CSS Nesting Can I Use page][css-nesting].

[css-nesting]: https://caniuse.com/css-nesting
[join]: https://opensourcepledge.com/join
[status]: https://updown.io/p/3c87h
[updown]: https://updown.io
