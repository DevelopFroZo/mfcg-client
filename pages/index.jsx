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
          <Link href = "/">
            <a>
              <Buttons.Regular disabled>
                Поймай центр
              </Buttons.Regular>
            </a>
          </Link>
          <Link href = "/">
            <a>
              <Buttons.Regular disabled>
                Сравни цвета
              </Buttons.Regular>
            </a>
          </Link>
          <Link href = "/games/colors">
            <a>
              <Buttons.Regular>
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