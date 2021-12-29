import { useEffect } from "react";

import { joinStyles } from "@u";

import styles from "./styles.module.scss";

function CompareColors( { data, ready, checkAnswer } ){
  useEffect( () => {
    ready();
  }, [] );

  return (
    data && <div className = {styles.container}>
      <div className = {styles.container__line}>
        <button
          className = {styles.container__rect}
          style = {{
            backgroundColor: data[0]
          }}
          onClick = {checkAnswer( 0 )}
        />
        <button
          className = {joinStyles( styles.container__rect, styles.container__rect_margined )}
          style = {{
            backgroundColor: data[1]
          }}
          onClick = {checkAnswer( 1 )}
        />
      </div>
      <div className = {joinStyles( styles.container__line, styles.container__line_margined )}>
        <button
          className = {styles.container__rect}
          style = {{
            backgroundColor: data[2]
          }}
          onClick = {checkAnswer( 2 )}
        />
        <button
          className = {joinStyles( styles.container__rect, styles.container__rect_margined )}
          style = {{
            backgroundColor: data[3]
          }}
          onClick = {checkAnswer( 3 )}
        />
      </div>
    </div>
  );
}

export { CompareColors };