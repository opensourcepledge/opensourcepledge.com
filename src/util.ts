// © 2024 Vlad-Stefan Harbuz <vlad@vlad.website>
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

export function extractSections() {
  const sections = document.querySelectorAll("section[id]");
  return Array.from(sections).map((section) => ({
    id: section.id,
    title: section.querySelector("h2")?.textContent || section.id,
  }));
}

// this script generates the Table of Contents elements from the sections in the page
// it should be included in the page after the sections have been defined
export function generateTableOfContentItems() {
  document.addEventListener("DOMContentLoaded", () => {
    const sections = extractSections();
    const tocElement = document.querySelector("div.toc ol");
    if (tocElement) {
      tocElement.innerHTML = sections
        .map(
          (section) => `<li><a href="#${section.id}">${section.title}</a></li>`,
        )
        .join("");
    }
  });
}
