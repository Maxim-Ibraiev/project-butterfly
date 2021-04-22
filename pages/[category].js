import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../src/components/Layout';
import Header from '../src/components/Header';

export default function Category() {
  const { query } = useRouter();

  return (
    <Layout>
      <div>
        <h1>{query.category} page</h1>
      </div>
    </Layout>
  );
}
