import Link from "next/link";

import { Buttons, Container, Header } from "@c"

import styles from "@st/pages/index.module.scss";

function Page(){
  return (
    <Container className = {styles.container}>
      <Header splitter = {false} />
      <div className = {styles.container__center}>
        <div className = {styles.container__title}>
          Меню
        </div>
        <div className = {styles.container__menu}>
          <Link href = "/games/center">
            <a>
              <Buttons.Regular
                className = {styles.container__button}
                theme = "secondary"
                noAutoSmall
                disabled
              >
                Поймай центр
              </Buttons.Regular>
            </a>
          </Link>
          <Link href = "/games/compare_colors">
            <a>
              <Buttons.Regular
                className = {styles.container__button}
                theme = "secondary"
                noAutoSmall
              >
                Сравни цвета
              </Buttons.Regular>
            </a>
          </Link>
          <Link href = "/games/colors">
            <a>
              <Buttons.Regular
                className = {styles.container__button}
                theme = "secondary"
                noAutoSmall
              >
                Тот же самый
              </Buttons.Regular>
            </a>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Page;