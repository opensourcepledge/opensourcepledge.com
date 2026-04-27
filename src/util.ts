// © Vlad-Stefan Harbuz <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0

export interface Map {
  [key: string]: string | undefined
}

export function shuffle(arr: any[]) {
  return arr
    .map(value => ({ value, key: Math.random() }))
    .sort((a, b) => a.key - b.key)
    .map(({ value }) => value);
}

export function range(n: number) {
  return [...Array(n).keys()];
}

export function slugify(str: string) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function debounceLeading(func: Function, timeout = 300){
  let timer: ReturnType<typeof setTimeout> | null;
  return (...args: any[]) => {
    if (!timer) {
      func(...args);
    }
    clearTimeout(timer as ReturnType<typeof setTimeout>);
    timer = setTimeout(() => {
      timer = null;
    }, timeout);
  };
}

