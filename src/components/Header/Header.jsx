import { useState } from "react";
import Modal from "react-modal";
import SearchForm from "../inputs/SearchForm";
import Menu from "../Menu";
import Button from "../buttons/HederBtn";
import CloseIcon from "../icons/Close";
import s from "./Header.module.scss";

Modal.setAppElement("#__next");

export default function Header() {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <header className={s.header}>
      <div className={s.nav}>
        <Menu />
        <Button type="button" aria-label="Логотип" style={{ color: "#fff" }}>
          <b>LOGO</b>
        </Button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        className={s.contentModal}
      >
        <Button
          onClick={() => setIsOpen(false)}
          type="button"
          aria-label="Закрыть окно"
          style={{ height: "38px", width: "38px" }}
          className={s.modalClose}
        >
          <CloseIcon fill="#000" height="20px" width="20px" />
        </Button>
        <SearchForm name="searchQuery" />
      </Modal>
      <SearchForm name="searchQuery" className={s.searchDesktop} />

      <ul className={s.list}>
        <li className={s.searchMobBtn}>
          <Button
            type="button"
            aria-label="Поиск"
            src={"/icons/search.svg"}
            onClick={() => setIsOpen(true)}
          ></Button>
        </li>
        <li>
          <Button
            type="button"
            aria-label="Личный кабинет"
            src={"/icons/user.svg"}
          ></Button>
        </li>
        <li>
          <Button
            type="button"
            aria-label="Отложено"
            src={"/icons/heart.svg"}
          ></Button>
        </li>
        <li>
          <Button
            type="button"
            aria-label="Корзина товаров"
            src={"/icons/bag.svg"}
          ></Button>
        </li>
      </ul>
    </header>
  );
}
