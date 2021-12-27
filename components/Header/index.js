import Head from "next/head";
import Link from "next/link";
import { MobileView, isBrowser, isMobile } from "react-device-detect";

import { useStyles } from "@h";

import {
  Svg,
  Buttons
} from "@c";

import LogoSvg from "~/public/svg/icons/logo.svg";
import styles from "./styles.module.scss";

const NEXT_PUBLIC_APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

function Header( {
  titleClassName,
  title,
  menu,
  splitter = true
} ){
  const classHeaderWrapper = useStyles( [
    styles.header__wrapper,
    splitter && styles.header__wrapper_splitter
  ], [ splitter ] );

  const classTitle = useStyles( [
    styles.header__title,
    titleClassName
  ], [ titleClassName ] );

  return (
    <>
      <Head>
        <title>{NEXT_PUBLIC_APP_NAME}{title && ` | ${title}`}</title>

        <meta
          name = "viewport"
          content = "width=device-width, initial-scale=1"
        />
      </Head>

      <div className = {styles.header}>
        <div className = {classHeaderWrapper}>
          <div>
            <Link href = "/">
              <a>
                <Svg.Regular
                  Component = {LogoSvg}
                  scale = {isMobile ? .5 : 1}
                />
              </a>
            </Link>
          </div>
          <div className = {classTitle}>
            {isBrowser && title && title}
          </div>
          <div className = {styles.header__menu}>
            {menu && <>
              <Buttons.Circle
                className = {styles.header__icon}
                withIcons
              >
                <Svg.Project name = "question" />
              </Buttons.Circle>
              {/* <Buttons.Circle>
                <SvgIcon
                  className = {styles.header__icon}
                  name = "gear"
                />
              </Buttons.Circle> */}
            </>}
          </div>
        </div>
        <MobileView className = {classTitle}>
          {title}
        </MobileView>
      </div>
    </>
  );
}

export { Header };