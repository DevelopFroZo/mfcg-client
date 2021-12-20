import { useMemo, useEffect } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";

import { useTimer } from "react-timer-hook";

import styles from "./styles.module.scss";

function Timer( { expiresAt, onExpire } ){
  const delta = useMemo( () => expiresAt - Math.floor( Date.now() / 1000 ), [ expiresAt ] );
  const expiresIn = useMemo( () => new Date( expiresAt * 1000 ), [ expiresAt ] );
  const { seconds, minutes, restart } = useTimer( { autoStart: false, onExpire } );
  const percentage = useMemo( () => ( minutes * 60 + seconds ) / delta * 100, [ seconds ] );

  const progressStyles = useMemo( () => buildStyles( {
    pathColor: "#5F7F68",
    trailColor: "#EFEFEF"
  } ), [] );

  useEffect( () => {
    restart( expiresIn );
  }, [ expiresIn ] );

  return (
    <CircularProgressbarWithChildren
      styles = {progressStyles}
      value = {percentage}
    >
      <div className = {styles.text}>
        {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
      </div>
    </CircularProgressbarWithChildren>
  );
}

export { Timer };