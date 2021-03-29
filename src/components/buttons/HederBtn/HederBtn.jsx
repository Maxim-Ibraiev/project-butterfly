import s from './HeaderBtn.module.scss';

export default function HederBtn({
  src,
  className = '',
  fill = '#fff',
  children,
  handleClick,
  ...props
}) {
  return (
    <button
      className={s.wrapper + ' ' + className}
      type={'button'}
      onClick={handleClick}
      {...props}
    >
      {children}
      {src && (
        <span
          style={{ backgroundImage: src && `url(${src})`, fill }}
          className={s.icon}
        ></span>
      )}
    </button>
  );
}
