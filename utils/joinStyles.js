function joinStyles( ...styles ){
  return styles.filter( style => style ).join( " " );
}

export { joinStyles };