import { useState, useCallback, useEffect } from "react";

import { useTimer } from "react-timer-hook";

const GAME = "colors";

function Kek( { expiryTimestamp, onExpire } ){
  const { seconds, minutes } = useTimer( { expiryTimestamp, onExpire } );

  return (
    <>{minutes}:{seconds}</>
  );
}

function Page( { socket, totalUsers } ){
  const [ data, setData ] = useState();
  const [ rightAnswers, setRightAnswers ] = useState( 0 );
  const [ status, setStatus ] = useState( "initialize" );
  const [ expiryTimestamp, setExpiryTimestamp ] = useState( 0 );

  const checkAnswer = useCallback( answer_ => () => {
    socket.emit( "checkAnswer", answer_, state => {
      console.log( "checkAnswer", state );
      setRightAnswers( state.rightAnswers );
      setStatus( state.status );
    } );
  }, [] );

  const onExpire = useCallback( () => {
    socket.emit( "end", state => {
      console.log( "end", state );
      setStatus( state.status );
    } );
  }, [] );

  useEffect( () => {
    if( status !== "idle" ) return;

    socket.emit( "generateLevel", ( data, state ) => {
      console.log( "generateLevel", data, state );
      setData( data );
      setStatus( state.status );
    } );
  }, [ status ] );

  useEffect( () => {
    if( status !== "initialize" ) return;

    socket.emit( "initialize", GAME, state => {
      console.log( "initialize", state );
      setExpiryTimestamp( new Date( state.expiresAt * 1000 ) );
      setStatus( state.status );
    } );
  }, [ status ] );

  return data
    ? <div style = {{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

      width: "100vw",
      height: "100vh"
    }}>
      {status === "ended"
        ? <>
          Ooops! Game ended. Total right answers: {rightAnswers}
          <img src = "/img/cat.png" />
        </>
        : <>
        <Kek expiryTimestamp = {expiryTimestamp} onExpire = {onExpire} /> <br />
        ({totalUsers}) Are the colors the same?
        <div style = {{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          width: "100px",
          height: "100px",

          backgroundColor: data.color0Hex
        }}>
          <div style = {{
            width: "calc( 20% )",
            height: "calc( 20% )",

            backgroundColor: data.color3Hex
          }}></div>
        </div>
        <div style = {{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          width: "100px",
          height: "100px",

          backgroundColor: data.color1Hex
        }}>
          <div style = {{
            width: "calc( 20% )",
            height: "calc( 20% )",

            backgroundColor: data.color2Hex
          }}></div>
        </div>
        {rightAnswers}
        <button onClick = {checkAnswer( true )}>YES</button>
        <button onClick = {checkAnswer( false )}>NO</button>
      </>}
    </div>
  : <></>;
}

export default Page;