---
title: 'The Open Source Sustainability Crisis'
excerpt: "What is Open Source sustainability? Fair pay, no hoops. Why is it in crisis? Burnout."
author: 'Chad Whitacre'
authorImageSrc: '/images/authors/chad.webp'
canonicalUrl: 'https://openpath.quest/2024/the-open-source-sustainability-crisis/'
isDraft: false
publishDate: '2024-01-19'
---

<!--
© 2024 Chad Whitacre <chadwhitacre@sentry.io>
SPDX-License-Identifier: LicenseRef-Restricted
-->

<div class="highlight-box">
  This post originally appeared
  <a
    href="https://openpath.quest/2024/the-open-source-sustainability-crisis/"
  >on openpath.quest</a>.
</div>

Let's get [the XKCD reference](https://xkcd.com/2347/) out of the way, shall we?

<figure>
  <img
    src="https://imgs.xkcd.com/comics/dependency.png"
    alt="This xkcd comic shows a Jenga-like tower of blocks, illustrating “all modern digital infrastructure”. The structure precariously rests on a small load-bearing block, titled “a project some random person in Nebraska has been thanklessly maintaining since 2003”."
    title="Someday ImageMagick will finally break for good and we'll have a long period of scrambling as we try to reassemble civilization from the rubble."
  >
  <figcaption><a href="https://xkcd.com/2347/">xkcd #2347 — Dependency</a></figcaption>
</figure>

Okay, now let's talk about the Open Source sustainability crisis. The purpose
of this post is to define terms. What is Open Source sustainability? Why do I
say it is in crisis? My answers are that sustainability is when people are
getting paid _without jumping through hoops_, and we're in a crisis because
people aren't _and they're burning out_.

## What is Open Source Sustainability?

Open Source sustainability is when any smart, motivated person can produce
widely adopted Open Source software and get paid fairly without jumping through
hoops.

Consider these four examples:

1. [**Jordan Harband**](https://twitter.com/ljharb) is a smart, motivated
   person who produces [widely adopted Open Source
   software](https://github.com/ljharb) and [can't get paid fairly without jumping
   through
   hoops](https://thenewstack.io/open-source-needs-maintainers-but-how-can-they-get-paid/).

1. [**Josh Goldberg**](https://www.joshuakgoldberg.com/) is a smart, motivated
   person who produces [widely adopted Open Source
   software](https://github.com/JoshuaKGoldberg) and [can't get paid fairly
   without jumping through
   hoops](https://twitter.com/JoshuaKGoldberg/status/1737229604442517902).

   <blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">My yearly income milestones as an independent open source person:<br>* 2022: minimum wage for NYC (~$35k/year)<br>* 2023: livable wage for NYC (~$60k/year)<br>* 2024 goal: entry level software developer salary (~$100k/year)<br><br>goals.</p>&mdash; Josh Goldberg 💖 (@JoshuaKGoldberg) <a href="https://twitter.com/JoshuaKGoldberg/status/1737229604442517902?ref_src=twsrc%5Etfw">December 19, 2023</a></blockquote>

1. [**Filippo Valsorda**](https://filippo.io/) is a smart, motivated person who
   produces [widely adopted Open Source
   software](https://github.com/FiloSottile) and can't get paid fairly without
   [jumping through hoops](https://words.filippo.io/full-time-maintainer/).

1. [**Caleb Porzio**](https://calebporzio.com/) is a smart, motivated person
   who produces [widely adopted Open Source
   software](https://github.com/calebporzio) and can't get [paid
   fairly](https://calebporzio.com/i-just-hit-dollar-100000yr-on-github-sponsors-heres-how-i-did-it)
   without [jumping through hoops](https://calebporzio.com/sponsorware).

Those are four people at the top of the Open Source game, clearly illustrating
that we have not reached Open Source sustainability yet. We've hardly begun.
For, sustainability means the opportunity to produce Open Source software and
get paid fairly without jumping through hoops is widely available to many, many
people.

How many? There are [30
million](https://www.statista.com/statistics/627312/worldwide-developer-population/)
developers in the world. The largest tech companies each employ on the order of
magnitude of 10,000 to 100,000 of us. The sustainable Open Source community
taken as a whole will be roughly the same size. Open Source is [a sleeping tech
giant](https://gratipay.news/your-company-should-probably-pay-2000-per-person-for-open-source-9205443e209d).

- 1 person sustained - a glimpse
- 10 people - a glimmer
- 100 - a milestone
- 1,000 - progress
- 10,000 - arrival
- 100,000 - success

Today we are at zero.

## What's Wrong With Hoops?

Hoops are boring. We've had scarcity-based economic relations for millenia.
Open Source is designed for a different world. It presents the first real
opportunity in our society to begin to develop a post-scarcity economic model
at scale. That likely wants unpacking in [a future
post](https://github.com/chadwhitacre/openpath/issues/15). For now, I assert
that our creative use of [well-trodden
paths](https://twitter.com/eigenjoy/status/862412458517962752) is Open Source
_subsidization_, not _sustainability_.

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">If you&#39;re interested in monetizing your open-source project, I made this handy chart for you: <a href="https://t.co/2yAjCRt78T">pic.twitter.com/2yAjCRt78T</a></p>&mdash; Nate (@eigenjoy) <a href="https://twitter.com/eigenjoy/status/862412458517962752?ref_src=twsrc%5Etfw">May 10, 2017</a></blockquote>

As I define it, Open Source sustainability means no hoops, no "New Role" in
Nate's chart. Self-determined individuals freely produce Open Source software,
and get paid in proportion to their productivity without having to also become
tech influencers, or sell contracts, or any other shenanigans. Those can who
want to. I envision a world where we don't have to.

## What is the Sustainability Crisis?

High-profile security kerfuffles such as Heartbleed and Log4Shell often come to
mind when we think about Open Source in crisis. But, while they draw attention
to the sustainability crisis, the crisis is not about security. Microsoft pays
[100,000](https://devblogs.microsoft.com/engineering-at-microsoft/welcome-to-the-engineering-at-microsoft-blog/)
developers and still has [plenty of security
issues](https://msrc.microsoft.com/update-guide/vulnerability). Yes, companies
and governments should [care about Open Source security](https://openssf.org/),
and those efforts can contribute to what I'm calling sustainability, but
security is a proxy concern. Let's call that the Open Source security crisis.

Just as the security crisis is adjacent to the sustainability crisis, so is the
[Open Source
diversity](https://en.wikipedia.org/wiki/Diversity_in_open-source_software)
crisis: Open Source is markedly less demographically diverse than software
engineering in general. We have not just inequality of outcome but inequality of
opportunity.
[35%](https://www.statista.com/statistics/617136/digital-population-worldwide/)
of people don't even have Internet access yet, let alone free time to hack on
Open Source projects. Structural inequalities can be thought of as the largest
of hoops to jump through in order to get paid fairly for producing widely
adopted Open Source software. We should [directly address this wider diversity
crisis](https://www.outreachy.org/), and, we should work on resolving the
sustainability crisis.

Open Source has created an economic value vacuum. Our society depends
utterly on the common pool resource of Open Source software, and this commons
is severely underprovisioned. How do we know? The real indicator of the Open
Source sustainability crisis as I define it is **maintainer burnout**.

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Log4j maintainers have been working sleeplessly on mitigation measures; fixes, docs, CVE, replies to inquiries, etc. Yet nothing is stopping people to bash us, for work we aren&#39;t paid for, for a feature we all dislike yet needed to keep due to backward compatibility concerns. <a href="https://t.co/W2u6AcBUM8">https://t.co/W2u6AcBUM8</a></p>&mdash; Volkan Yazıcı (@yazicivo) <a href="https://twitter.com/yazicivo/status/1469349956880408583?ref_src=twsrc%5Etfw">December 10, 2021</a></blockquote>

We have a long-standing pattern of chewing people up and spitting them out, as
youthful idealism and enthusiasm give way to resentment and depression. We see
it most clearly when a high-profile vulnerability shines a spotlight, but it
plays out much more widely in less visible circumstances. For example, here is
how **Marc Grabanski** tells [his
story](https://blog.opencollective.com/frontend-masters/):

> I created an open source component that literally every website or piece of
> software at the time used, and often still do. Go to the WordPress control
> panel and there's my date picker. But in 15 years, the only money I ever got
> for that was $400 from a guy who needed me to add a specific feature. I think I
> got a handful of change thrown at me through PayPal, like $50 bucks. There was
> no economic sustainability whatsoever.
>
> There was a long time where I was doing open source almost more time than my
> full time job, and getting paid nothing. I just burnt out. I stopped writing
> and contributing to open source. I never built up my GitHub profile when that
> came around. I just gave up, because what's the point when all you get is
> constant issues? You give and give and give, and people just take and take and
> take.
>
> My open source success went from a major blessing to a great curse. It was
> one of the darkest times in my life. Something that started out with such hope
> and light ended up just being about getting thousands of emails.

There was no viral moment when we collectively realized that we were taking
advantage of Marc. We quietly crushed him without ever noticing. [There are
many such cases](https://blog.tidelift.com/maintainer-burnout-is-real).

<div class="highlight-box">
  <em>
    Update
    <a href="https://twitter.com/1Marc/status/1748422612114362706">from Marc</a>:
  </em>
  <blockquote>The thing I'd add to that, is I was able to create a network
  that eventually led to Frontend Masters. My story is not all doom and gloom
  like it is portrayed in the article. But it def wasn't a given I'd be able to
  capitalize on the networking opportunities that OSS gave me."</blockquote>
</div>

## The Path Lies Through Platforms

Funding platforms are critical to achieving Open Source sustainability. Maybe
you want to classify "join a platform" under "jump through hoops." It's not the
same, though.

<blockquote class="twitter-tweet" data-dnt="true">
  <p lang="en" dir="ltr">
    If you are an open-source maintainer, I would recommend creating an account
    on
    <a href="https://twitter.com/thanks_dev?ref_src=twsrc%5Etfw">@thanks_dev</a
    >. I&#39;ve received $268 in 2 months, and the only thing I did was create
    an account and click on &quot;withdraw&quot;. 👍🏻
    <a href="https://t.co/WHyAA75oRZ">pic.twitter.com/WHyAA75oRZ</a>
  </p>
  &mdash; Nuno Maduro (@enunomaduro)
  <a
    href="https://twitter.com/enunomaduro/status/1740686110978687267?ref_src=twsrc%5Etfw"
    >December 29, 2023</a
  >
</blockquote>

Building platforms and recruiting devs to receive free money is easy. The main
options today are [GitHub Sponsors](https://github.com/sponsors), [Open
Collective](https://opencollective.com/), and
[Tidelift](https://tidelift.com/). I'm also rooting for
[Thanks.dev](https://thanks.dev/home) (they are helping me a lot at Sentry) and
[Liberapay](https://liberapay.com/) (they are a fork of Gittip/Gratipay).

What's hard is opening the corporate floodgates. Companies receive outsized
value from Open Source, and companies control nearly all the funds. How do we
open the floodgates? _tl;dr_ Taxes and social pressure. More on that in [a
future post](https://github.com/chadwhitacre/openpath/issues/14).
