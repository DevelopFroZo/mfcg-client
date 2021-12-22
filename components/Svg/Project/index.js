import { useState, useCallback, useEffect } from "react";

import { Regular } from "../Regular";

function Project( {
  name,
  width = 1,
  height = 1,
  unit = "em",
  ...props
} ){
  const [ Svg, setSvg ] = useState( null );

  const loadSvg = useCallback( async name_ => {
    const Svg_ = ( await import( `~/public/svg/icons/${name_}.svg` ) ).default;
    
    setSvg( () => Svg_ );
  }, [] );

  useEffect( () => {
    loadSvg( name );
  }, [ name ] );

  return ( Svg &&
    <Regular
      Component = {Svg}
      width = {width}
      height = {height}
      unit = {unit}
      {...props}
    />
  );
}

export { Project };