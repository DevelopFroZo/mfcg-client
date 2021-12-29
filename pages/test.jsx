import { BeforeGame } from "@c";

function Page(){
  return (
    <div style = {{
      position: "absolute",
      left: 0,
      top: 0,
      width: "100vw",
      height: "100vh"
    }}>
      <BeforeGame
        title = "Можешь определить где находится центр фигуры?"
        task = "Внутри фигуры помещена точка. Твоя задача определить находится ли точка центре фигуры."
        motivation = "Можешь ли ты угадать 10 фигур, чтобы выиграть? Чего же ты ждешь?"
      />
    </div>
  );
}

export default Page;