import { isMobile } from "react-device-detect";

import { useStyles } from "@h";

import { Svg } from ".."

import GameSvg from "~/public/svg/icons/game.svg";
import styles from "./styles/game.module.scss";

function Game( {
  className,
  bad = false,
  ...props
} ){
  const classGame = useStyles( [
    styles.game,
    bad ? styles.game_bad : styles.game_good,
    className
  ], [ className, bad ] );

  return (
    <button
      className = {classGame}
      {...props}
    >
      <div className = {styles.game__test0} />
      <div className = {styles.game__test1}>
        <Svg.Regular
          Component = {GameSvg}
          scale = {isMobile ? .5 : 1}
        />
      </div>
    </button>
  );
}

export { Game };