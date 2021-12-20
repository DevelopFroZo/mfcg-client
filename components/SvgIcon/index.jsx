import { useState, useCallback, useEffect } from "react";

import { useStyles } from "@h";

import styles from "./styles.module.scss";

function SvgIcon( { className, name } ){
  const [ Svg, setSvg ] = useState( null );

  const classIcon = useStyles( [
    styles.icon,
    className
  ], [ className ] );

  const importSvg = useCallback( async name => {
    const Svg_ = ( await import( `~/public/svg/icons/${name}.svg` ) ).default;

    setSvg( () => Svg_ );
  }, [] );

  useEffect( () => {
    importSvg( name );
  }, [ name ] );

  return Svg &&
    <div className = {classIcon}>
      <Svg />
    </div>;
}

export { SvgIcon };