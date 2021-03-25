import s from "./Backdrop.module.scss";
import withTransitionAnimation from "../../renderProp/withTransitionAnimation";

function Backdrop({ children, onClick }) {
  return (
    <div className={s.container} onClick={onClick}>
      {children}
    </div>
  );
}

export default withTransitionAnimation(Backdrop);
