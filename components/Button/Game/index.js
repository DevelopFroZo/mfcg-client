import { useMemo } from "react";
import { isMobile } from "react-device-detect";

import { useStyles } from "@h";

import { Svg } from "../.."

import GameSvg from "~/public/svg/icons/game.svg";
import styles from "./styles.module.scss";

function Game( {
  className,
  smallClassName,
  bad = false,
  small = false,
  noAutoSmall = false,
  ...props
} ){
  const isSmall = useMemo( () => small || isMobile && !noAutoSmall, [ small, noAutoSmall ] );

  const classGame = useStyles( [
    styles.game,
    bad ? styles.game_bad : styles.game_good,
    isSmall && ( smallClassName || styles.game_small ),
    className
  ], [ className, bad, small, noAutoSmall ] );

  return (
    <button
      className = {classGame}
      {...props}
    >
      <div className = {styles.game__test0} />
      <div className = {styles.game__test1}>
        <Svg.Regular
          Component = {GameSvg}
          scale = {isSmall ? .5 : 1}
        />
      </div>
    </button>
  );
}

export { Game };