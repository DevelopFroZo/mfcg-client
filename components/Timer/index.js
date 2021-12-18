import { useMemo } from "react";

import { useTimer } from "react-timer-hook";
import { useEffect } from "react/cjs/react.development";

function Timer( { expiresAt, onExpire } ){
  const expiryTimestamp = useMemo( () => new Date( expiresAt * 1000 ), [ expiresAt ] );
  const { seconds, minutes } = useTimer( { expiryTimestamp, onExpire } );

  useEffect( () => {
    console.log( expiresAt );
  }, [ expiresAt ] );

  return (
    <>{minutes}:{seconds}</>
  );
}

export { Timer };