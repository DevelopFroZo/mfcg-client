import { useMemo, useEffect } from "react";

import { useTimer } from "react-timer-hook";

import styles from "./styles.module.scss";

function Simple( { expiresAt, onExpire } ){
  const expiresIn = useMemo( () => new Date( expiresAt * 1000 ), [ expiresAt ] );
  const { seconds, minutes, restart } = useTimer( { autoStart: false, onExpire } );

  useEffect( () => {
    restart( expiresIn );
  }, [ expiresIn ] );

  return (
    <div className = {styles.text}>
      {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
    </div>
  );
}

export { Simple };