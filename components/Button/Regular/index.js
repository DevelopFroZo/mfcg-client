import { isMobile } from "react-device-detect";

import { useStyles } from "@h";

import rawStyles from "./styles.module.scss";

function Regular( {
  children,
  className,
  smallClassName,
  theme = "primary",
  square = false,
  rounded = true,
  withIcons = false,
  small = false,
  noAutoSmall = false,
  left,
  right,
  ...props
} ){
  const classRegular = useStyles( [
    rawStyles.regular,
    theme === "primary" && rawStyles.regular_themePrimary,
    theme === "secondary" && rawStyles.regular_themeSecondary,
    square && rawStyles.regular_square,
    rounded && rawStyles.regular_rounded,
    withIcons && rawStyles.regular_withIcons,
    ( small || isMobile && !noAutoSmall ) && ( smallClassName || rawStyles.regular_small ),
    className
  ], [ className, smallClassName, theme, square, rounded, withIcons, small, noAutoSmall ] );

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