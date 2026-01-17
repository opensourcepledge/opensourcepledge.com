# © Vlad-Stefan Harbuz <vlad@vlad.website>
# SPDX-License-Identifier: Apache-2.0

# This file is just used by Vlad to make staging deployments.

.PHONY: site publish-staging

site:
	npx astro build

publish-staging: site
	rsync -Pvrthl --delete --exclude .git --info=progress2 dist/ yavin:/srv/www/osp-staging
