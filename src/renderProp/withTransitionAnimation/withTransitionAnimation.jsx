import { CSSTransition } from "react-transition-group";
import { TIMEOUT } from "../../variables/globalVariables";
import fadeLeft from "./withTransitionLeftAnimation.module.scss";
import fadeRight from "./withTransitionRightAnimation.module.scss";
import fadeScale from "./withScaleAnimation.module.scss";
import fadeOpacity from "./withOpacityAnimation.module.scss";

const withTransitionAnimation = (WrappedComponent) => (props) => {
  const styles =
    (props.opacity && fadeOpacity) ||
    (props.scale && fadeScale) ||
    (props.rightTransition && fadeRight) ||
    fadeLeft;

  return (
    <CSSTransition
      in={props.in || true}
      appear={!!props.appear}
      timeout={props.timeout || TIMEOUT}
      classNames={styles}
      unmountOnExit
      {...props}
    >
      <WrappedComponent {...props}>{props.children}</WrappedComponent>
    </CSSTransition>
  );
};

export default withTransitionAnimation;
