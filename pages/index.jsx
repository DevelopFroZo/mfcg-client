import { useState, useEffect } from "react";

function Page(){
  const [ p, setP ] = useState( 0 );

  useEffect( () => {
    const interval = setInterval( () => {
      setP( Math.floor( Math.random() * 91 ) + 10 );
    }, 500 );

    return () => clearInterval( interval );
  }, [] );

  return (
    <div style = {{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh"
    }}>
      <div style = {{
        position: "relative",
        width: "200px",
        height: "10px",

        backgroundColor: "rgb( 220, 220, 220 )",

        borderRadius: "10px"
      }}>
        <div style = {{
          position: "absolute",
          width: `${p}%`,
          height: "100%",

          backgroundColor: "rgb( 106, 26, 151 )",

          borderRadius: "10px",

          transition: ".25s ease-in-out"
        }}></div>
      </div>
    </div>
  );
}

export default Page;