function easyWrap( wrapper ){
  return handler => ( req, res ) => {
    wrapper( req, res );
    handler( req, res );
  };
}

export { easyWrap };