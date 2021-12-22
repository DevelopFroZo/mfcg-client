import { useStyles } from "@h";

import styles from "./style.module.scss";

function Container( { children, className, ...props } ){
  const classContainer = useStyles( [ styles.container, className ], [ className ] );

  return (
    <div
      className = {classContainer}
      {...props}
    >
      {children}
    </div>
  );
}

export { Container };