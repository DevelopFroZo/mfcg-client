import { useRef, useState, useEffect } from "react";

import { joinStyles } from "@u";

import styles from "./styles.module.scss";

function Regular( {
  className,
  Component,
  width,
  height,
  unit = "px",
  widthUnit,
  heightUnit,
  scale = 1,
  scaleWidth,
  scaleHeight,
  accuracy,
  accuracyWidth,
  accuracyHeight,
  wrapperProps = {},
  ...props
} ){
  const svgRef = useRef( null );
  const [ defaultSizes, setDefaultSizes ] = useState( null );
  const [ svg, setSvg ] = useState( null );

  useEffect( () => {
    if( svg ) return;

    const svg_ = svgRef.current.querySelector( "svg" );
    const width = Number( svg_.getAttribute( "width" ) );
    const height = Number( svg_.getAttribute( "height" ) );
    const viewBox = svg_.getAttribute( "viewBox" );

    if( !viewBox ){
      svg_.setAttribute( "viewBox", `0 0 ${width} ${height}` );
    }

    setDefaultSizes( [ width, height ] );
    setSvg( svg_ );
  }, [ Component ] );

  useEffect( () => {
    if( !svg ) return;

    const [ defaultWidth, defaultHeight ] = defaultSizes;
    const accuracyWidth_ = accuracyWidth || accuracy;
    const accuracyHeight_ = accuracyHeight || accuracy;
    let width_ = ( width || defaultWidth ) * ( scaleWidth || scale );
    let height_ = ( height || defaultHeight ) * ( scaleHeight || scale );

    if( accuracyWidth_ ){
      const coeff = Math.pow( 10, accuracyWidth_ );

      width_ = Math.floor( width_ * coeff ) / coeff;
    }

    if( accuracyHeight_ ){
      const coeff = Math.pow( 10, accuracyHeight_ );

      height_ = Math.floor( height_ * coeff ) / coeff;
    }

    width_ = `${width_}${widthUnit || unit}`;
    height_ = `${height_}${heightUnit || unit}`;

    svg.setAttribute( "width", width_ );
    svg.setAttribute( "height", height_ );
  }, [ svg, width, height, unit, widthUnit, heightUnit, scale, scaleWidth, scaleHeight, accuracy, accuracyWidth, accuracyHeight ] );

  return (
    <div
      className = {joinStyles( styles.svgWrapper, className )}
      ref = {svgRef}
      {...wrapperProps}
    >
      <Component {...props} />
    </div>
  );
}

export { Regular };