'use client';

import Search from 'components/search';
import { Suspense } from 'react';

export default function Products() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Search />
    </Suspense>
  );
}
