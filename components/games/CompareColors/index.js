import { useEffect } from "react";

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
          className = {styles.container__rect}
          style = {{
            backgroundColor: data[1]
          }}
          onClick = {checkAnswer( 1 )}
        />
      </div>
      <div className = {styles.container__line}>
        <button
          className = {styles.container__rect}
          style = {{
            backgroundColor: data[2]
          }}
          onClick = {checkAnswer( 2 )}
        />
        <button
          className = {styles.container__rect}
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