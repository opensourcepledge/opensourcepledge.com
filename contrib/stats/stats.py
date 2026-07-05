#!/usr/bin/env python

# © Functional Software, Inc. dba Sentry
# SPDX-License-Identifier: Apache-2.0
# Written by Vlad-Stefan Harbuz

"""
This script gets member statistics for a particular revision in the Open Source Pledge git repository.

To run this on multiple revisions, copy `main` to a new branch, switch to the new branch, then do something like this:

    git rebase --rebase-merges -i --exec stats.py 33a42fc

You can use 33a42fc, which is the first (useful) commit to have member data, if you want to get stats across our full
membership history.

Output goes to `/tmp/history.csv`. Make sure to clear this file between runs.
"""

from datetime import datetime
from glob import glob
from pathlib import Path
import json
import os.path

import git

def get_commit_date():
    repo = git.Repo("./")
    commit_timestamp = repo.head.commit.committed_date
    return datetime.fromtimestamp(commit_timestamp).strftime('%Y-%m-%d')


def get_member_paths():
    roots = ['src/content/members/', 'data/members/']
    root = None

    for candidate in roots:
        if os.path.isdir(candidate):
            root = candidate
            break

    return glob(f'{root}/*.json')


def get_member_totals(member):
    reports = sorted(
        member['annualReports'],
        key=lambda d: d.get('reportDate', d.get('dateYearEnding')),
        reverse=True
    )
    totals = {
        'arcAmount': 0,
        'totalAmount': 0,
        'maxDevs': 0,
    }
    for idx, report in enumerate(reports):
        amount = int(report.get('usdAmountPaid', report.get('payments')))
        devs = int(report['averageNumberOfDevs'])
        if idx == 0 and member.get('active', True):
            totals['arcAmount'] = amount
        totals['totalAmount'] += amount
        if devs > totals['maxDevs']:
            totals['maxDevs'] = devs
    return totals


def update_history(commit_date, stats):
    output_data = f'{stats["nMembers"]},{stats["arcAmount"]},{stats["totalAmount"]},{stats["maxDevs"]}'
    output_line = f'{commit_date},{output_data}'

    history_path = '/tmp/history.csv'
    if not os.path.isfile(history_path):
        Path(history_path).touch()

    existing_history = open(history_path).read()
    existing_lines = existing_history.splitlines()

    if len(existing_lines) > 0:
        first_line = existing_lines[0]
        first_comma_idx = first_line.find(',')
        first_data = first_line[first_comma_idx + 1:]
        if first_data != output_data:
            new_history = f'{output_line}\n{existing_history}'
            open(history_path, 'w').write(new_history)
    else:
        open(history_path, 'w').write(output_line)


def main():
    commit_date = get_commit_date()
    paths = get_member_paths()
    stats = {
        'nMembers': 0,
        'arcAmount': 0,
        'totalAmount': 0,
        'maxDevs': 0,
    }
    for path in paths:
        member = json.load(open(path))
        totals = get_member_totals(member)
        if member.get('active', True):
            stats['nMembers'] += 1
        stats['arcAmount'] += totals['arcAmount']
        stats['totalAmount'] += totals['totalAmount']
        if totals['maxDevs'] > stats['maxDevs']:
            stats['maxDevs'] = totals['maxDevs']
    print(stats)
    update_history(commit_date, stats)


if __name__ == '__main__':
    main()
