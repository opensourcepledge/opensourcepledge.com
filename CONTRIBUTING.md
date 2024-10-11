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

If you'd like to update all members manually, for example to fetch new data from a JSON file, run
`./bin/update-all-members`.

By default, all new members have the “Member” role. If you'd like to set a custom role for a certain member, create a
corresponding entry in `src/memberCustomRoles.json`.

If you'd like to make custom temporary changes to a member's JSON file, edit that file in `src/content/members`. To
prevent workflows from overwriting this data, you should then create a corresponding `.lock` file. For example, if
you're updating `src/content/members/foocorp.json`, you should also create a file called
`src/content/members/foocorp.json.lock`. This will result in the JSON file not being automatically updated until the
`.lock` file is deleted. Remember to delete the `.lock` file when you'd like the member to be updated again.

## Copyright Headers

We maintain copyright headers at the top of every file to establish authorship. Once you make substantive changes to any
file, add yourself to the copyright headers.

Remember that copyright statements such as “(C) John Smith 2020” contain the year copyright _started_, i.e. 2020 is the
year the work was first created, not the current year.

## Uptime

We track uptime using [updown.io][updown]: [Open Source Pledge Status Page][status].

## Browser Support

The least-supported clientside feature we're using is CSS Nesting. This means that our supported browser are described
by the [CSS Nesting Can I Use page][css-nesting].

[css-nesting]: https://caniuse.com/css-nesting
[status]: https://updown.io/p/3c87h
[updown]: https://updown.io
