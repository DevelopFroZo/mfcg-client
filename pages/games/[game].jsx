import { useMemo, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { BrowserView, isMobile } from "react-device-detect";

import {
  Container,
  Header,
  Timers,
  Score,
  Time,
  Overlays,
  AfterGame,

  games,
  controls
} from "@c";

import { gamesSettings } from "@const/gamesSettings";

import styles from "@st/pages/games/game.module.scss";

function Page( { socket, totalUsers } ){
  const router = useRouter();

  const game = useMemo( () => router.query.game, [ router ] );
  const { name, question } = useMemo( () => game ? gamesSettings[ game ] : {}, [ game ] );
  const Game = useMemo( () => game && games[ game ], [ game ] );
  const [ Controls, setControls ] = useState( null );
  const [ initialState, setInitialState ] = useState( {} );
  const [ state, setState ] = useState( {} );
  const status = useMemo( () => state.status || "created", [ state ] );
  const [ data, setData ] = useState( null );
  const [ totalSeconds, setTotalSeconds ] = useState( 0 );
  const [ isGameReady, setIsGameReady ] = useState( false );

  const restart = useCallback( isNew => () => {
    if( !isGameReady || status !== "created" && status !== "ended" ) return;

    socket.emit( "initialize", game, isNew, ( initialState, state ) => {
      console.log( "initialize", initialState, state );
      setInitialState( initialState );
      setState( state );

      if( isNew && initialState.controls ){
        setControls( () => controls[ initialState.controls ] );
      }
    } );
  }, [ isGameReady, status ] );

  const checkAnswer = useCallback( answer => () => {
    socket.emit( "checkAnswer", answer, state => {
      console.log( "checkAnswer", state );
      setState( state );
    } );
  }, [] );

  const end = useCallback( () => {
    socket.emit( "end", ( totalSeconds, state ) => {
      console.log( "end", totalSeconds, state );
      setTotalSeconds( totalSeconds );
      setState( state );
    } );
  }, [] );

  useEffect( () => {
    if( status === "idle" ){
      socket.emit( "generateLevel", ( data, state ) => {
        console.log( "generateLevel", data, state );
        setData( data );
        setState( state );
      } );
    }
    else if( status === "failed" ){
      end();
    }
    else if( status === "ended" ){
      setData( null );
    }
  }, [ status ] );

  useEffect( () => {
    if( !isGameReady || status !== "created" ) return;

    restart( true )();
  }, [ isGameReady, status ] );

  return ( game
    ? <Container className = {styles.container}>
      <Overlays.Regular hidden = {status !== "ended"}>
        <AfterGame
          title = {name}
          score = {state.score || 0}
          totalScore = {initialState.totalScore}
          time = {totalSeconds}
          onRestart = {restart( false )}
        />
      </Overlays.Regular>
      <Header title = {name} menu />
      <div className = {styles.container__question}>
        {question}
      </div>
      <div className = {styles.container__gameWrapper}>
        <div className = {styles.container__scoreAndTime}>
          <Score
            score = {state.score || 0}
            total = {initialState.totalScore}
          />
          {initialState.expiresAt && isMobile &&
            <Time value = {
              <Timers.Simple
                expiresAt = {initialState.expiresAt}
                onExpire = {end}
              />
            } />
          }
        </div>
        <div className = {styles.game}>
          <BrowserView className = {styles.game__timerWrapper}>
          {initialState.expiresAt &&
            <div className = {styles.game__timer}>  
              <Timers.Circle
                expiresAt = {initialState.expiresAt}
                onExpire = {end}
              />
            </div>
          }
          </BrowserView>
          <div className = {styles.game__wrapper}>
            <Game
              data = {data}
              ready = {() => setIsGameReady( true )}
              checkAnswer = {checkAnswer}
            />
          </div>
          <BrowserView>
            {Controls && <Controls checkAnswer = {checkAnswer} />}
          </BrowserView>
        </div>
        {Controls && isMobile && <Controls checkAnswer = {checkAnswer} />}
      </div>
      <div className = {styles.container__totalUsers}>
        В этот момент на сайте: {totalUsers} котиков
      </div>
    </Container>
    : <></>
  );
}

export default Page;