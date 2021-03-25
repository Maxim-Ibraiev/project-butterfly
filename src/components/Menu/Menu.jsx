import { useState } from "react";
import cn from "classnames";
import s from "./Menu.module.scss";
import Button from "../buttons/MobMenuBtn/MobMenuBtn";
import withTransitionAnimation from "../../renderProp/withTransitionAnimation";

function Menu() {
  const imageSrc = (name) => `/btnImg/top-level-${name}.jpg`;
  const [toggleBtn, setToggleBtn] = useState(true);

  return (
    <div className={s.menu}>
      <button
        type="button"
        aria-label="Женское"
        className={cn(s.button, s.separator, { [s.actual]: toggleBtn })}
        onClick={() => setToggleBtn(true)}
      >
        Женское
      </button>
      <button
        type="button"
        aria-label="Мужское"
        className={cn(s.button, { [s.actual]: !toggleBtn })}
        onClick={() => setToggleBtn(false)}
      >
        Мужское
      </button>

      <nav>
        <ul className={s.listContainer}>
          <li>
            <Button
              text={"ВЕРНУТЬСЯ НА ГЛАВНУЮ"}
              type="button"
              height={"48px"}
              image={imageSrc("home")}
            />
          </li>
          <li>
            <Button
              text={"Распродажа"}
              type="button"
              image={imageSrc("sale")}
            />
          </li>
          <li>
            <Button text={"Новинки"} type="button" image={imageSrc("newin")} />
          </li>
          <li>
            <Button
              text={"Одежда"}
              type="button"
              image={imageSrc("clothing")}
            />
          </li>
          <li>
            <Button text={"Обувь"} type="button" image={imageSrc("shoes")} />
          </li>
          <li>
            <Button
              text={"Аксессуары"}
              type="button"
              image={imageSrc("accessories")}
            />
          </li>
          <li>
            <Button
              text={"Спортивная одежда"}
              type="button"
              image={imageSrc("brands")}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default withTransitionAnimation(Menu);
