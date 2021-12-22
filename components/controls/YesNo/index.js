import { Buttons } from "@c";

import styles from "./styles.module.scss";

function YesNo( { checkAnswer } ){
  return (
    <div className = {styles.control}>
      <div className = {styles.control__button}>
        <Buttons.Game onClick = {checkAnswer( true )} />
        <div className = {styles.control__text}>
          Да
        </div>
      </div>
      <div className = {styles.control__button}>
        <Buttons.Game onClick = {checkAnswer( false )} bad />
        <div className = {styles.control__text}>
          Нет
        </div>
      </div>
    </div>
  );
}

export { YesNo };