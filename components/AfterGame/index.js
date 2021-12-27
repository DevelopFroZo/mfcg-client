import { useMemo } from "react";
import Link from "next/link";

import {
  Header,
  Svg,
  Score,
  Time,
  Buttons
} from "..";

import styles from "./styles.module.scss";

function AfterGame( {
  title,
  score,
  totalScore,
  time,
  onRestart
} ){
  return (
    <div className = {styles.container}>
      <Header
        titleClassName = {styles.container__title}
        title = {title}
        splitter = {false}
        menu
      />
      <div className = {styles.container__body}>
        <div className = {styles.container__card}>
          <div className = {styles.container__cardTitle}>
            {<Svg.Project name = "cat0" />}
            Хорошая работа, Олег
            {<Svg.Project name = "cat1" />}
          </div>
          <div className = {styles.container__result}>
            <Score
              className = {styles.container__score}
              score = {score}
              total = {totalScore}
            />
            <Time
              className = {styles.container__time}
              value = {
                <div className = {styles.container__timeWrapper}>
                  <div>
                    {time}
                  </div>
                  <div className = {styles.container__timeSek}>&nbsp;сек.</div>
                </div>
              }
            />
          </div>
          <div className = {styles.container__buttons}>
            <Link href = "/">
              <a>
                <Buttons.Regular noAutoSmall>
                  В меню
                </Buttons.Regular>
              </a>
            </Link>
            <Buttons.Regular
              left = {<Svg.Project name = "reload" />}
              onClick = {onRestart}
              noAutoSmall
              withIcons
            >
              Ещё раз
            </Buttons.Regular>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AfterGame };