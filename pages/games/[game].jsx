import { useMemo, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

import {
  Container,
  Header,
  Buttons,
  games,
  Timer
} from "@c";

import { gamesSettings } from "@const/gamesSettings";

import styles from "@st/pages/games/game.module.scss";

function Page( { socket, totalUsers } ){
  const router = useRouter();

  const game = useMemo( () => router.query.game, [ router ] );
  const { name, question } = useMemo( () => game ? gamesSettings[ game ] : {}, [ game ] );
  const Game = useMemo( () => game && games[ game ], [ game ] );
  const [ state, setState ] = useState( {} );
  const status = useMemo( () => state.status || "created", [ state ] );
  const [ data, setData ] = useState( null );
  const [ isGameReady, setIsGameReady ] = useState( false );

  const restart = useCallback( isNew => () => {
    if( !isGameReady || status !== "created" && status !== "ended" ) return;

    socket.emit( "initialize", game, isNew, state => {
      console.log( "initialize", state );
      setState( state );
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
        <div className = {styles.score}>
          <div>Баллы</div>
          <div className = {styles.score__wrapper}>
            <div className = {styles.score__left}>
              {state.score || 0}
            </div>
            {state.totalScore && <>
              <div style = {{
                fontSize: "48px"
              }}>/</div>
              <div className = {styles.score__right}>
                {state.totalScore}
              </div>
            </>}
          </div>
        </div>
        <div className = {styles.game}>
          <div style = {{
            display: "flex",
            justifyContent: "end",
            alignItems: "center"
          }}>
            <div style = {{
              width: "196px",
              height: "196px"
            }}>
              {state.expiresAt && <Timer expiresAt = {state.expiresAt} onExpire = {end} />}
            </div>
          </div>
          <Game
            data = {data}
            ready = {() => setIsGameReady( true )}
          />
          <div className = {styles.game__control}>
            <div style = {{
              display: "flex",
              alignItems: "center"
            }}>
              <Buttons.Game onClick = {checkAnswer( true )} />
              <div style = {{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#373737",
                marginLeft: 30
              }}>
                Да
              </div>
            </div>
            <div style = {{
              display: "flex",
              alignItems: "center"
            }}>
              <Buttons.Game onClick = {checkAnswer( false )} bad />
              <div style = {{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#373737",
                marginLeft: 30
              }}>
                Нет
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className = {styles.container__totalUsers}>
        В этот момент на сайте: {totalUsers} котиков
      </div>
    </Container>
    : <></>
  );
}

export default Page;