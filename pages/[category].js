import React from 'react';
import { useRouter } from 'next/router';
export default function Category() {
  const { query } = useRouter();

  return (
    <div>
      <h1>{query.category} page</h1>
    </div>
  );
}
