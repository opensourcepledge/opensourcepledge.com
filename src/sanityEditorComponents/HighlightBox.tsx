---
// © Vlad Miricioiu <vlad@vlad.website>
// SPDX-License-Identifier: Apache-2.0
---

export default (props: any) => (
  <div
    style={{
      background: '#16212d',
      borderRadius: '0.5rem',
      padding: '1rem 1.25rem',
      color: 'white',
    }}
  >
    {props.children}
  </div>
);
