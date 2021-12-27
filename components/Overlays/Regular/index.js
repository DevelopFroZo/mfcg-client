import { useStyles } from "@h";

import styles from "./index.module.scss";

function Regular( {
  children,
  className,
  hidden = true,
  ...props
} ){
  const classOverlay = useStyles( [
    styles.overlay,
    hidden && styles.overlay_hidden,
    className
  ], [ className, hidden ] );

  return (
    <div
      className = {classOverlay}
      {...props}>
      {children}
    </div>
  );
}

export { Regular };