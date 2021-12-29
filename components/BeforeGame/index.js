import Link from "next/link";

import {
  Svg,
  Buttons
} from "..";

import { useStyles } from "@h";

import LogoSvg from "~/public/svg/icons/logo.svg";

import styles from "./styles.module.scss";

function BeforeGame( {
  hidden,
  title,
  task,
  motivation,
  onStart
} ){
  const classContainer = useStyles( [
    styles.container,
    hidden && styles.container_hidden
  ], [ hidden ] );

  return (
    <div className = {classContainer}>
      <div className = {styles.container__wrapper}>
        <Svg.Regular Component = {LogoSvg} />
        <div className = {styles.container__title}>
          {title}
        </div>
        <div className = {styles.container__task}>
          {task}
        </div>
        <div className = {styles.container__motivation}>
          {motivation}
        </div>
        <div className = {styles.container__buttons}>
          <Link href = "/">
            <a>
              <Buttons.Regular
                theme = "secondary"
                noAutoSmall
              >
                Меню
              </Buttons.Regular>
            </a>
          </Link>
          <Buttons.Regular
            theme = "secondary"
            onClick = {onStart}
            noAutoSmall
          >
            Играть
          </Buttons.Regular>
        </div>
      </div>
    </div>
  );
}

export { BeforeGame };