import { useRef, useState, useCallback, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function Center( { data, ready } ){
  const imageRef = useRef( null );
  const paperRef = useRef( null );

  const [ Raphael, setRaphael ] = useState( null );
  const [ paper, setPaper ] = useState( null );
  const [ sizes, setSizes ] = useState( null );
  const [ point, setPoint ] = useState( null );

  const importRaphael = useCallback( async () => {
    const Raphael_ = ( await import( "@l/raphael.min" ) ).default;

    setRaphael( () => Raphael_ );
  }, [] );

  useEffect( () => {
    importRaphael();
  }, [] );

  useEffect( () => {
    if( !Raphael ) return;

    const paperDiv = paperRef.current;
    const width = paperDiv.offsetWidth;
    const height = paperDiv.offsetWidth;

    const paper_ = Raphael( paperDiv, width, height );

    setSizes( [ width, height ] );
    setPaper( paper_ );
    ready();
  }, [ Raphael ] );

  useEffect( () => {
    if( point ){
      point.remove();
    }

    if( !paper || !data ) return;

    const [ width, height ] = sizes;
    const x = width * data.scale.x;
    const y = height * data.scale.y;

    const point_ = paper
      .circle( x, y, 3 )
      .attr( {
        stroke: "#000",
        fill: "#000"
      } );

    // paper.path( [
    //   [ "M", 65, 192 ],
    //   [ "L", 312, 313 ]
    // ] );

    // paper.path( [
    //   [ "M", 118, 313 ],
    //   [ "L", 366, 192 ]
    // ] );

    // paper.circle( 310, 313, 3 );

    setPoint( point_ );
  }, [ paper, data ] );

  return (
    <div style = {{
      position: "relative",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      width: "400px",
      height: "400px"
    }}>
      <img
        ref = {imageRef}
        src = {data && `${API_URL}${data.imagePath}`}
      />
      <div
        ref = {paperRef}
        style = {{
          position: "absolute",
          left: 0,
          top: 0,

          width: "100%",
          height: "100%"
        }}
      />
    </div>
  );
}

export { Center };