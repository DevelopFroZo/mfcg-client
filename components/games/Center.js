import { useRef, useState, useCallback, useEffect } from "react";

function Center( { data, ready } ){
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
    if( !paper ) return;

    paper.circle( sizes[0] / 2, sizes[1] / 2, Math.min( ...sizes ) / 2 - 10 );

    paper.path( [
      [ "M", sizes[0] / 2, 10 ],
      [ "L", sizes[0] / 2, sizes[1] - 10 ]
    ] );

    paper.path( [
      [ "M", 10, sizes[1] / 2 ],
      [ "L", sizes[0] - 10, sizes[1] / 2 ]
    ] );
  }, [ paper ] );

  useEffect( () => {
    if( !data ) return;

    if( point ){
      point.remove();
    }

    const { xOffset, yOffset } = data;
    const x = Math.floor( sizes[0] / 2 + sizes[0] / 100 * xOffset );
    const y = Math.floor( sizes[1] / 2 + sizes[1] / 100 * yOffset );

    const point_ = paper.circle( x, y, 3 ).attr( {
      stroke: "#000",
      fill: "#000"
    } );

    setPoint( point_ );
  }, [ data ] );

  return (
    <div ref = {paperRef} style = {{
      width: "500px",
      height: "500px",
      border: "#000 2px solid"
    }}></div>
  );
}

export { Center };