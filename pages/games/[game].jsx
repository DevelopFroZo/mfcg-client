import { useRouter } from "next/router";

import { GameTemplate } from "@c";

function Page( { socket } ){
  const router = useRouter();

  return router.query.game
    ? <GameTemplate
      game = {router.query.game}
      socket = {socket}
    />
    : <></>;
}

export default Page;