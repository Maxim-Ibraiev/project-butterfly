/* eslint-disable import/named */
/* eslint-disable react/jsx-props-no-spreading */
import { CSSTransition } from 'react-transition-group'
import { TIMEOUT } from '../../variables/globalVariables'
import fadeLeft from './withTransitionLeftAnimation.module.scss'
import fadeRight from './withTransitionRightAnimation.module.scss'
import fadeScale from './withScaleAnimation.module.scss'
import fadeOpacity from './withOpacityAnimation.module.scss'

const withTransitionAnimation =
  WrappedComponent =>
  ({ opacity, scale, appear, timeout, children, rightTransition, in: propIn, ...props }) => {
    const styles =
      (opacity && fadeOpacity) || (scale && fadeScale) || (rightTransition && fadeRight) || fadeLeft

    return (
      <CSSTransition
        in={propIn || true}
        appear={!!appear}
        timeout={timeout || TIMEOUT}
        classNames={styles}
        unmountOnExit
        {...props}
      >
        <WrappedComponent {...props}>{children}</WrappedComponent>
      </CSSTransition>
    )
  }

export default withTransitionAnimation
