import { useState, useEffect } from "react";

import io from "socket.io-client";

import "../styles/globals.scss";
import "react-circular-progressbar/dist/styles.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SOCKET_PATH = process.env.NEXT_PUBLIC_SOCKET_PATH;

function MyApp( { Component, pageProps } ){
  const [ socket, setSocket ] = useState();
  const [ totalUsers, setTotalUsers ] = useState( 0 );

  useEffect( () => {
    const socket_ = io( API_URL, {
      path: `${SOCKET_PATH}/socket.io`
    } );

    socket_.on( "totalUsers", setTotalUsers );

    setSocket( socket_ );

    return () => socket_.disconnect();
  }, [] );

  return socket
    ? <Component
        socket = {socket}
        totalUsers = {totalUsers}
        {...pageProps}
      />
    : <></>;
}

export default MyApp;