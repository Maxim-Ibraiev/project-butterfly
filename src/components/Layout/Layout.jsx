import React from "react";
import Header from "../Header";
import s from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <div>
      <Header></Header>

      <main>{children}</main>

      <footer></footer>
    </div>
  );
}
