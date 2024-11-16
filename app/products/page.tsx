'use client';

import { Suspense } from 'react';

import Search from 'components/search';

export default function Products() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Search />
    </Suspense>
  );
}
