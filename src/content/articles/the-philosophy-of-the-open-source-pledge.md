---
title: 'The Philosophy of the Open Source Pledge'
excerpt: "We launched the Open Source Pledge today to make companies pay their fair share to Open Source maintainers they depend on. I wrote this post about why doing so is fair and smart."
author: 'Vlad-Stefan Harbuz'
authorImageSrc: '/images/authors/vlad.webp'
canonicalUrl: 'https://vlad.website/the-philosophy-of-the-open-source-pledge/'
isDraft: false
publishDate: '2024-10-08'
---

<!--
© 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
SPDX-License-Identifier: CC-BY-NC-SA-4.0
-->

<div class="highlight-box">
  This post originally appeared
  <a
    href="https://vlad.website/the-philosophy-of-the-open-source-pledge/"
  >on vlad.website</a>.
</div>

Today, we launched the [Open Source Pledge][osp]. Virtually all companies use Open Source software [^oss-value], making
the Open Source ecosystem crucial to virtually all of the technology we use. That Open Source software is created and
supported by maintainers. But the companies that use Open Source software almost never pay the maintainers anything.
This means that the maintainers end up doing a huge amount of work for free, often as a second shift after their dayjob
so that they can pay the bills, leaving them burned out and overworked, and leaving the projects they maintain at risk
of serious security issues.

The Open Source Pledge aims to change that, by getting companies to pay the maintainers of the software they rely
on. We launched the Pledge today with the support of [25 wonderful companies](https://opensourcepledge.com/members/) and
[6 large foundations](https://opensourcepledge.com/endorsements/).

I'd like to talk about why the way the Open Source ecosystem is organised harms both maintainers and companies. I'll
explain how companies can not only do the right thing, but also make sustainable and impactful investments in the Open
Source ecosystem. And I'll talk about why this means that companies that do not pay their share act uncaringly and
shortsightedly.

![The screen on the Nasdaq tower in Times Square saying “Nasdaq congratulates the companies launching the Open Source Pledge”, followed by many company logos, and a link to https://opensourcepledge.com.](https://vlad.website/static/osp/nasdaq@1000px.jpg "Open Source Pledge on the Nasdaq tower in Times Square, NYC")

## The Problem

The device you're using to read this post runs Open Source software. There are some high-profile projects that any
computer is basically guaranteed to be using — [curl][curl], [OpenSSH][openssh], [Python][python], and so on. These
high-profile projects are often, but not always, able to secure funding for their development.

But there are tens of thousands of projects, making up the vast majority of widely-used Open Source packages, that never
get more than a few dollars of funding, despite being relied on by companies such as Adobe [^adobe], Amazon [^aws],
Apple [^apple], Facebook [^facebook], Google [^google], Mastercard [^mastercard], Microsoft [^microsoft], Netflix
[^netflix], Sony [^sony], eBay [^ebay], and many many others. These companies do not pay back their fair share — in many
cases, they pay back _nothing_ — to the Open Source software developers whose work they continue to monetise and depend
on year after year.

For example, without [FFmpeg][ffmpeg], YouTube wouldn't work, yet the people who make FFmpeg don't meaningfully get paid
by Google or by anyone else.

<figure>
  <img
    src="https://vlad.website/static/osp/ffmpeg-tweet.png"
    alt="@mok says “ffmpeg has created more enterprise value than we can fathon”. @FFmpeg says “Yet we receive essentially no support from these enterprises relative to the value we provide”."
    width="600"
  >
  <figcaption><a href="https://x.com/FFmpeg/status/1847872777748951311">FFmpeg's tweet on 20 Oct 2024</a></figcaption>
</figure>

There's more. Though the maintainers of Open Source software are often not paid for developing this software,
creators of widely-used internet infrastructure such as [Elasticsearch][elastic] can set up hosted versions of their
software that they can sell as a service, in order to be able to afford to fund further development. But even this is
made difficult by monopolistic free riders such as Amazon. Elasticsearch was previously Open Source, but had to [change
their license to a non–Open Source one][elastic-license] when Amazon took Elasticsearch and started selling it
themselves, using their massive scale to take revenue from the original creators of the software. These kinds of moves
leave the people who maintain our internet infrastructure unable to earn an income, while enriching profiteering and
mooching corporations who don't give back, such as Amazon.

Basically, the people who make the software we all rely on don't get paid. This xkcd comic sums it up nicely:

<figure>
  <img
    src="https://vlad.website/static/osp/dependency.png"
    alt="This xkcd comic shows a Jenga-like tower of blocks, illustrating “all modern digital infrastructure”. The structure precariously rests on a small load-bearing block, titled “a project some random person in Nebraska has been thanklessly maintaining since 2003”."
    title="Someday ImageMagick will finally break for good and we'll have a long period of scrambling as we try to reassemble civilization from the rubble."
  >
  <figcaption><a href="https://xkcd.com/2347/">xkcd #2347 — Dependency</a></figcaption>
</figure>

This has bad consequences for all of us. Putting maintainers in a position where they're overworked and vulnerable to
burnout renders the Open Source software we rely on vulnerable. There have been multiple serious worldwide
security issues because of bugs that are demonstrably a result of overworked and underpaid maintainers. The [XZ
backdoor][xz], which affected billions of devices worldwide, happened because [Lasse Collin][lasse], the maintainer of
XZ, was overworked and underpaid, and ended up being forced to accept “help” from someone who turned out to be a
malicious contributor who would go on to add a backdoor to XZ. And there are other examples, such as the [Log4Shell
vulnerability][log4shell], where underpaid maintainers doing their best to fix a major security issue were rewarded with
death threats.

## Analysing the Problem

So why, specifically, is the status quo of Open Source funding bad? Two reasons.

**#1: It's unfair and uncaring.** People like [Jordan Harband][ljharb], [Josh Goldberg][josh], [Filippo
Valsorda][filippo], [Caleb Porzio][caleb], and thousands of others, build software billions of people rely on, but [have
to jump through a million hoops][chad-sustainability] to pay the bills. This is unfair because these developers
contribute massively to our tech infrastructure, and companies don't support them. Why is it uncaring? To care about
someone means approximately [to be motivated to act when they might be harmed, even when you personally stand to gain
nothing][care]. Companies happily profit off of Open Source maintainers' work, but do not care when these maintainers
struggle to pay the bills.

**#2: It harms our tech infrastructure.** If we do not support the maintainers of the software our phones, games and
airplanes run, we will continue to drive away maintainers, leaving our tech infrastructure neglected, un-innovative, and
vulnerable to serious worldwide security issues.

## The Solution

There are many possible solutions. Governments could support Open Source developers with tax money, which is what
Germany is doing with the [Sovereign Tech Fund][stf]. We could add tooling to the Open Source ecosystem that makes it
easier for maintainers to sell their work, which is what [Polar][polar] is working towards.

But there's a really obvious solution that we can implement _today_. That's for **companies to pay the maintainers of
the software they rely on**. “Pay”, not “donate”, because payment is already overdue, and it has been for a long time.

This is what the [Open Source Pledge][osp] is — a cultural movement asking companies to pay $2000 per employed developer
per year to the Open Source maintainers they depend on.

Some companies might say that they already contribute in other ways. They might contribute by allocating time for their
employees to contribute back to Open Source projects, or by offering Open Source maintainers cost-free use of cloud
services. These contributions are great and should be celebrated. But they fall short in one important way — they do not
help underpaid maintainers pay the rent.

Here's one obvious question, though. Why would companies make these payments? There are three big reasons.

**#1: It's fair and manifests care.** Companies might care about the fact that the developers whose work they rely on
are suffering, and they might therefore be motivated to correct this. This sounds good, but it's relying on a lot of
goodwill. This is fine though, because there are two other big reasons.

**#2: Signalling thought leadership.** Companies that join the Pledge can signal their thought leadership by being one
of the innovators driving a paradigm change in the funding of the Open Source ecosystem. This benefits the company's
brand and reputation, which appeals to potential customers.

**#3: Ensuring companies can base their products on a healthy foundation.** If the Open Source ecosystem that companies
rely on starts crumbling, this is bad for those companies, because they will have now built their software on top of a
poorly maintained foundation. Paying money to ensure the software they use is innovative, secure and well-maintained
just makes sense.

What's interesting here is that reasons #2 and #3 involve companies making payments for something that they expect to
gain future value out of. This is what we call an _investment_, and paying Open Source maintainers is a particularly
good investment. Venture capital firm [Accel][accel] agrees, which is why they [support the Pledge][endorsement-accel].

The corollary of the above is that companies that do not pay the Open Source maintainers they rely on act uncaringly and
short-sightedly. Unfortunate!

## How We Can Implement the Solution

I think many companies want to do the right thing. And paying maintainers is something that companies can do today, by
[joining the Pledge][join]. The Open Source Pledge does not handle any funds — we simply facilitate money being paid
directly to maintainers. [Sentry][member-sentry] has joined the Pledge, and will be giving more than $500,000 this year
directly to the maintainers it depends on, continuing a tradition it has kept up for the past 3 years.
[Antithesis][member-antithesis] has given $186,000. We have members ranging in size from 135 developers, to 1 developer.
And many other companies will follow. If our current members can do it, other companies can too.

Some companies might worry that it is too logistically complicated to figure out which maintainers' work they depend on,
then figure out how to pay those maintainers. But this process is made simple by services such as [thanks.dev][thanksd],
which I am also a contributor to. The Open Source Pledge [“About” page][about] addresses many questions companies might
have.

If you're an employee, tell your company to pay the maintainers of the software it relies on. And if you're a key
decision maker such as a CEO, CFO or CTO? Do the right thing — it will benefit you, your brand, and the ecosystem you
live and work in.

<div class="flex-center">
  <a class="button" href="https://opensourcepledge.com/join/">Join the Open Source Pledge</a>
</div>

[about]: https://opensourcepledge.com/about/
[accel]: https://www.accel.com/
[caleb]: https://calebporzio.com/
[care]: http://www.barrymaguire.com/uploads/2/3/2/7/23270406/efficient_markets_and_alienation_-_published.pdf
[chad-sustainability]: https://openpath.quest/2024/the-open-source-sustainability-crisis/
[chad]: https://openpath.quest/
[cramer]: https://cra.mr/
[curl]: https://en.wikipedia.org/wiki/CURL
[elastic-license]: https://www.elastic.co/blog/why-license-change-aws
[elastic]: https://www.elastic.co
[endorsement-accel]: https://www.accel.com/noteworthy/why-accel-is-supporting-the-open-source-pledge
[ffmpeg]: https://en.wikipedia.org/wiki/FFmpeg
[filippo]: https://filippo.io/
[join]: https://opensourcepledge.com/join/
[josh]: https://www.joshuakgoldberg.com/
[lasse]: https://tukaani.org/xz-backdoor/
[ljharb]: https://x.com/ljharb
[log4shell]: https://en.wikipedia.org/wiki/Log4Shell
[member-antithesis]: https://opensourcepledge.com/members/antithesis/
[member-sentry]: https://opensourcepledge.com/members/sentry/
[openssh]: https://en.wikipedia.org/wiki/OpenSSH
[osp]: https://opensourcepledge.com
[polar]: https://polar.sh/
[python]: https://en.wikipedia.org/wiki/Python_(programming_language)
[selviano]: https://github.com/selviano
[sentry]: https://sentry.io/
[stf]: https://www.sovereigntechfund.de/
[thanksd]: https://thanks.dev/home
[xz]: https://en.wikipedia.org/wiki/XZ_Utils_backdoor

[^oss-value]: https://gratipay.news/open-source-captures-almost-none-of-the-value-it-creates-9015eb7e293e

[^adobe]: https://thanks.dev/d/gh/adobe/dependencies
[^apple]: https://thanks.dev/d/gh/apple/dependencies
[^aws]: https://thanks.dev/d/gh/aws/dependencies
[^ebay]: https://thanks.dev/d/gh/ebay/dependencies
[^facebook]: https://thanks.dev/d/gh/facebook/dependencies
[^google]: https://thanks.dev/d/gh/google/dependencies
[^mastercard]: https://thanks.dev/d/gh/mastercard/dependencies
[^microsoft]: https://thanks.dev/d/gh/microsoft/dependencies
[^netflix]: https://thanks.dev/d/gh/netflix/dependencies
[^sony]: https://thanks.dev/d/gh/sony/dependencies

[^endorsement-django]: https://www.djangoproject.com/weblog/2024/oct/08/why-django-supports-the-open-source-pledge/
[^endorsement-osc]: https://blog.opencollective.com/why-the-open-source-pledge-is-both-relevant-and-timely/
[^endorsement-osi]: https://opensource.org/blog/the-open-source-initiative-supports-the-open-source-pledge
[^endorsement-perl]: https://news.perlfoundation.org/post/-open-source-pledge
[^endorsement-php]: https://thephp.foundation/blog/2024/10/08/open-source-pledge/
[^endorsement-play]: https://www.playframework.com/blog/open-source-pledge-launched
