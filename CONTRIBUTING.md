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

## Writing Blog Posts

Blog posts are written using Sanity's studio, which can be found at [opensourcepledge.sanity.studio][sanity-studio].

After new content is published, the website must be rebuilt and republished. This can be done by running the “Build,
update members and deploy” workflow on the `main` branch. See here:
https://github.com/opensourcepledge/opensourcepledge.com/actions/workflows/deploy.yml

In Sanity, you can set a “Publish Date/Time” field. You can use this field to save a blog post to the Sanity database,
but ensure it does not actually show up on the website before a certain date/time. However, do keep in mind that the
website will still have to be rebuilt and redeployed using the above action _after_ the set date/time.

You can view a draft of your unpublished posts by visiting the appropriate URL after building, eg
`https://opensourcepledge.com/blog/my-post-slug/`.

## Workflow: New Members

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

### 5. (Technically Optional) Add logo to `src/assets/images/members`

For a member's logo to show up on the homepage, it must be added to `src/assets/images/members/<slug>/minimal.svg`. This
should be a white- or greyscale-only version of the member's logo. If in doubt, check the other existing logos. Note
that this must be an SVG file. If a vector logo is somehow not available, raster graphics can be embedded into an SVG.

Remember that a corresponding `minimal.svg.license` file must also be added.

For the logo to actually show up on the homepage, you also need to edit `MemberLogoBoard.astro` to put it in an
appropriate place. Check if giving the `maxHeight` property a specific value will make the new logo fit in better
from a visually proportional point of view.

### 6. Add member logo to Google Drive

When onboarding members, we will receive logo files for those members. Make sure to contribute these logo files, and any
modified logo files you create, back to our [“Member Logos”][member-logos] Google Drive folder. If you don't have
access, contact @selviano.

### 7. Update member information in CRM

Make sure the new member company's information is up to date in our [CRM][crm]. This is important in order to make sure
we don't use out of date data. If the company is not yet in the CRM, add it and apply the appropriate labels. If the
company is already in the CRM, make sure the appropriate labels are applied to it.

If you do not have access to the CRM, open an issue in [the website repository][website-repo] asking for this update to
be made.

## Workflow: Lapsed Members

Remove a member from the website when either (1) their report due date has passed and they have indicated they do not
plan to renew, or (2) their report due date, plus a grace period of a month, have passsed.

When removing a member, take the following steps:

* Remove the member from `src/memberRoles.json`, causing the member to no longer be displayed on the website
* Remove the member's logo from wherever it may be featured on the website, such as `MemberLogoBoard.astro`

Do not delete any of the member's files. The member's JSON file, as well as their logo assets, might be useful in the
future!

## Archiving Member Reports

We archive member reports so that, in case they become inaccessible, we can (1) refer to the reports, and (2) have a
fallback way to display the reports to visitors.

Currently, these reports must be archived manually.

Before archiving reports, make sure you install [`monolith`][monolith] from your package manager. `monolith` is used so
that we can compactly archive a report into a single file.

[monolith]: https://github.com/Y2Z/monolith

To archive all reports, run this from the repository root:

```
$ ./src/memberData/bin/archiveMembers.ts
```

This will archive reports using the following directory structure:

```
archives/
└── reports
    └── sentry
        ├── 2022
        │   ├── 2024-11-08T18:11:29.792Z.html
        │   └── latest.html -> 2024-11-08T18:11:29.792Z.html
        ├── 2023
        │   ├── 2024-11-08T18:11:27.057Z.html
        │   └── latest.html -> 2024-11-08T18:11:27.057Z.html
        └── 2024
            ├── 2024-11-08T18:11:24.601Z.html
            └── latest.html -> 2024-11-08T18:11:24.601Z.html
```

When a report is archived, the `latest.html` symlink is updated to point to the latest archived HTML file.

Archives are not currently automatically provided to users eg in case the original URL is inaccessible.

If you want to browse the archives locally, it's best to `cd archives`, `python -m http.server`, then visit
`localhost:8000`. This avoids issues with `file://` URLs.

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

[crm]: https://github.com/opensourcepledge/crm/issues
[css-nesting]: https://caniuse.com/css-nesting
[join]: https://opensourcepledge.com/join
[member-logos]: https://drive.google.com/drive/folders/1HxYaaY1wy1hZT6O0ZY58s7Y8N4aV0fcn
[sanity-studio]: https://opensourcepledge.sanity.studio/
[status]: https://updown.io/p/3c87h
[updown]: https://updown.io
[website-repo]: https://github.com/opensourcepledge/opensourcepledge.com
