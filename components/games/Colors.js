function Colors( { data } ){
  return (
    <>
      <div style = {{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        width: "448px",
        height: "448px",

        transition: ".25s",
        backgroundColor: data.color0Hex
      }}>
        <div style = {{
          width: "132px",
          height: "132px",

          transition: ".25s",
          backgroundColor: data.color3Hex
        }}></div>
      </div>
      <div style = {{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        width: "448px",
        height: "448px",

        transition: ".25s",
        backgroundColor: data.color1Hex
      }}>
        <div style = {{
          width: "132px",
          height: "132px",

          transition: ".25s",
          backgroundColor: data.color2Hex
        }}></div>
      </div>
    </>
  );
}

export { Colors };