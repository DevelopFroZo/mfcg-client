import { useEffect } from "react";

import styles from "./styles.module.scss";

function Colors( { data, ready } ){
  useEffect( () => {
    ready();
  }, [] );

  return ( data
    ? <div className = {styles.container}>
      <div
        className = {styles.container__outerRect}
        style = {{
          backgroundColor: data.color0Hex
        }}>
        <div
          className = {styles.container__innerRect}
          style = {{
            backgroundColor: data.color3Hex
          }}></div>
      </div>
      <div
        className = {styles.container__outerRect}
        style = {{
          backgroundColor: data.color1Hex
        }}>
        <div
          className = {styles.container__innerRect}
          style = {{
            backgroundColor: data.color2Hex
          }}></div>
      </div>
    </div>
    : <></>
  );
}

export { Colors };