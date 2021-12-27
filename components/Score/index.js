import { useStyles } from "@h";

import styles from "./styles.module.scss";

function Score( {
  className,
  score,
  total
} ){
  const classScore = useStyles( [
    styles.score,
    className
  ], [ className ] );

  return (
    <div className = {classScore}>
      <div className = {styles.score__title}>Баллы</div>
      <div className = {styles.score__wrapper}>
        <div className = {styles.score__left}>
          {score}
        </div>
        {total && <>
          <div className = {styles.score__left}>
            /
          </div>
          <div className = {styles.score__right}>
            {total}
          </div>
        </>}
      </div>
    </div>
  );
}

export { Score };