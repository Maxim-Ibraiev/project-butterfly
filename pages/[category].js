import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../src/components/Layout';
import CategoryPage from '../src/pages/CategoryPage';

export default function Category() {
  const { query } = useRouter();

  return (
    <Layout>
      <CategoryPage />
    </Layout>
  );
}
