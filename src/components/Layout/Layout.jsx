import React from 'react';
import Header from '../Header';
import s from './Layout.module.scss';

export default function Layout({ children }) {
  return (
    <div className={s.container}>
      <Header></Header>

      <main>{children}</main>

      <footer></footer>
    </div>
  );
}
