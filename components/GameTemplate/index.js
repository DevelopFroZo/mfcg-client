import { useMemo, useState, useCallback, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "./styles.module.scss";

import logoSvg from "~/public/svg/logo.svg";
import gearSvg from "~/public/svg/gear.svg";

import { gamesSettings } from "@const/gamesSettings";
import { games } from "@c";

const NEXT_PUBLIC_APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

function GameTemplate( { socket, game } ){
  const { name, question } = useMemo( () => gamesSettings[ game ], [] );
  const Game = useMemo( () => games[ game ], [] );
  const [ status, setStatus ] = useState( "initialize" );
  const [ state, setState ] = useState( {} );
  const [ data, setData ] = useState( null );

  const checkAnswer = useCallback( answer_ => () => {
    socket.emit( "checkAnswer", answer_, ( status, state ) => {
      console.log( "checkAnswer", state );
      setStatus( status );
      setState( state );
    } );
  }, [] );

  // const onExpire = useCallback( () => {
  //   socket.emit( "end", state => {
  //     console.log( "end", state );
  //     setState( state );
  //   } );
  // }, [] );

  useEffect( () => {
    if( status !== "initialize" ) return;

    socket.emit( "initialize", game, true, ( status, state ) => {
      console.log( "initialize", state );
      // setExpiryTimestamp( new Date( state.expiresAt * 1000 ) );
      setStatus( status );
      setState( state );
    } );
  }, [ status ] );

  useEffect( () => {
    if( status !== "idle" ) return;

    socket.emit( "generateLevel", ( data, status, state ) => {
      console.log( "generateLevel", data, state );
      setData( data );
      setStatus( status );
      setState( state );
    } );
  }, [ status ] );

  return (
    <>
      <Head>
        <title>{NEXT_PUBLIC_APP_NAME} | {name}</title>
      </Head>

      <div className = {styles.container}>
        <div className = {styles.container__header}>
          <div className = {styles.container__logo}>
            <Link href = "/">
              <a>
                <Image src = {logoSvg} />
              </a>
            </Link>
          </div>
          <div className = {styles.container__title}>
            {name}
          </div>
          <div className = {styles.container__menu}>
            <div className = {styles.container__rulesWrapper}>
              <div className = {styles.container__rules}>
                ?
              </div>
            </div>
            <div className = {styles.container__settings}>
              <Image src = {gearSvg} />
            </div>
          </div>
        </div>
        <div className = {styles.container__info}>
          <div className = {styles.container__question}>
            {question}
          </div>
          <div className = {styles.container__score}>
            Баллы: {state.rightAnswers || 0}
          </div>
        </div>
        {data
          ? <div style = {{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
      
            width: "100%",
            marginTop: "123px"
          }}>
            <button style = {{
              marginRight: "32px",

              fontSize: "36px"
            }} onClick = {checkAnswer( true )}>
              Да
            </button>
            <Game data = {data} />
            <button style = {{
              marginLeft: "32px",

              fontSize: "36px"
            }} onClick = {checkAnswer( false )}>
              Нет
            </button>
          </div>
          : <></>}
      </div>
    </>
  );
}

export { GameTemplate };