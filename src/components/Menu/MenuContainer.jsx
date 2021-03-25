import { useState } from "react";
import Menu from "./Menu";
import Button from "../buttons/HederBtn";
import Backdrop from "../Backdrop";
import { TIMEOUT } from "../../variables/globalVariables";

export default function MenuContainer() {
  const [menu, setMenu] = useState(false);

  return (
    <div>
      <Backdrop
        in={menu}
        timeout={TIMEOUT}
        opacity
        onClick={() => setMenu(false)}
      />
      <Menu in={menu} timeout={TIMEOUT} />

      <Button
        type="button"
        aria-label="Меню"
        src={menu ? "/icons/close.svg" : "/icons/menu.svg"}
        handleClick={() => setMenu(!menu)}
      ></Button>
    </div>
  );
}
