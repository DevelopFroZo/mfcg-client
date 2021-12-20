import { useStyles } from "@h";

import rawStyles from "./styles/regular.module.scss";

function Regular( {
  children,
  className,
  square = false,
  rounded = true,
  left,
  right,
  ...props
} ){
  const classRegular = useStyles( [
    rawStyles.regular,
    square && rawStyles.regular_square,
    rounded && rawStyles.regular_rounded,
    className
  ], [ className, square, rounded ] );

  return (
    <button
      className = {classRegular}
      {...props}
    >
      {left && <div className = {rawStyles.regular__left}>{left}</div>}
      {children}
      {right && <div className = {rawStyles.regular__right}>{right}</div>}
    </button>
  );
}

export { Regular };