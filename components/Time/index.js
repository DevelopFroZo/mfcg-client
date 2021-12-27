import { useStyles } from "@h";

import styles from "./styles.module.scss";

function Time( { className, value } ){
  const classTime = useStyles( [
    styles.time,
    className
  ], [ className ] );

  return (
    <div className = {classTime}>
      <div className = {styles.time__text}>Время</div>
      {value}
    </div>
  );
}

export { Time };