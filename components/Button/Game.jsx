import { useStyles } from "@h";

import { SvgIcon } from "../SvgIcon"

import styles from "./styles/game.module.scss";

function Game( {
  className,
  small = false,
  bad = false,
  ...props
} ){
  const classGame = useStyles( [
    styles.game,
    small ? styles.game_small : styles.game_default,
    bad ? styles.game_bad : styles.game_good,
    className
  ], [ className, small, bad ] );

  return (
    <button
      className = {classGame}
      {...props}
    >
      <div className = {styles.game__test0} />
      <div className = {styles.game__test1}>
        <SvgIcon name = {small ? "gameSmall" : "gameDefault"} />
      </div>
    </button>
  );
}

export { Game };