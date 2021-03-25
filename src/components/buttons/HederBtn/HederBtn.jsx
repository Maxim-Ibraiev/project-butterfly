import { useCallback } from "react";
import cn from "classnames";
import s from "./HeaderBtn.module.scss";

export default function HederBtn({
  src,
  className = "",
  children,
  handleClick,
  ...props
}) {
  return (
    <button
      className={s.wrapper + " " + className}
      type={"button"}
      onClick={handleClick}
      {...props}
    >
      {children}
      {src && (
        <span
          style={{ backgroundImage: `url(${src})`, fill: "#fff" }}
          className={s.icon}
        ></span>
      )}
    </button>
  );
}
