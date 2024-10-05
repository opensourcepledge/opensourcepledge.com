// © 2024 Vlad-Stefan Harbuz <vlad@vladh.net>
// SPDX-License-Identifier: Apache-2.0

export function shuffle(arr: any[]) {
  return arr
    .map(value => ({ value, key: Math.random() }))
    .sort((a, b) => a.key - b.key)
    .map(({ value }) => value);
}

export function range(n: number) {
  return [...Array(n).keys()];
}
