import { useMemo, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

import {
  Container,
  Header,
  Timers,

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
  const [ state, setState ] = useState( {} );
  const status = useMemo( () => state.status || "created", [ state ] );
  const [ data, setData ] = useState( null );
  const [ isGameReady, setIsGameReady ] = useState( false );

  const restart = useCallback( isNew => () => {
    if( !isGameReady || status !== "created" && status !== "ended" ) return;

    socket.emit( "initialize", game, isNew, ( controls_, state ) => {
      console.log( "initialize", state );
      setState( state );

      if( isNew && controls_ ){
        setControls( () => controls[ controls_ ] );
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
    socket.emit( "end", state => {
      console.log( "end", state );
      setState( state );
      setData( null );
    } );
  }, [] );

  useEffect( () => {
    if( status !== "idle" ) return;

    socket.emit( "generateLevel", ( data, state ) => {
      console.log( "generateLevel", data, state );
      setData( data );
      setState( state );
    } );
  }, [ status ] );

  useEffect( () => {
    if( !isGameReady || status !== "created" ) return;

    restart( true )();
  }, [ isGameReady, status ] );

  return ( game
    ? <Container className = {styles.container}>
      <Header title = {name} menu />
      <div className = {styles.container__question}>
        {question}
      </div>
      <div className = {styles.container__gameWrapper}>
        <div className = {styles.container__scoreAndTime}>
          <div className = {styles.score}>
            <div>Баллы</div>
            <div className = {styles.score__wrapper}>
              <div className = {styles.score__left}>
                {state.score || 0}
              </div>
              {state.totalScore && <>
                <div className = {styles.score__left}>
                  /
                </div>
                <div className = {styles.score__right}>
                  {state.totalScore}
                </div>
              </>}
            </div>
          </div>
          {state.expiresAt &&
            <MobileView style = {{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontWeight: 700
            }}>
              <div>Время</div>
              <Timers.Simple
                expiresAt = {state.expiresAt}
                onExpire = {end}
              />
            </MobileView>
          }
        </div>
        <div className = {styles.game}>
          <BrowserView className = {styles.game__timerWrapper}>
            <div className = {styles.game__timer}>
              {state.expiresAt &&
                <Timers.Circle
                  expiresAt = {state.expiresAt}
                  onExpire = {end}
                />
              }
            </div>
          </BrowserView>
          <div style = {{
            display: "flex",
            justifyContent: "center"
          }}>
            <Game
              data = {data}
              ready = {() => setIsGameReady( true )}
              checkAnswer = {checkAnswer}
            />
          </div>
          {Controls && isBrowser && <Controls checkAnswer = {checkAnswer} />}
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