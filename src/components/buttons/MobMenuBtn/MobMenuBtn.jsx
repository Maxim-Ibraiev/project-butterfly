import s from "./MobMenuBtn.module.css";

export default function Button({
  text,
  width = "100%",
  height = "96px",
  image,
}) {
  return (
    <button
      className={s.button}
      style={{
        width,
        height,
        backgroundImage: `url(${image})`,
        backgroundPosition: "right",
      }}
    >
      <span>{text}</span>
    </button>
  );
}
