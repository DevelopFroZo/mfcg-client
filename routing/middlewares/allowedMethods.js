function allowedMethods( ...rawMethods ){
  const methods = rawMethods.reduce( ( res, method ) => {
    res.add( method.toUpperCase() );

    return res;
  }, new Set() );

  return ( { method }, res, next ) => methods.has( method ) ? next() : res.status( 405 ).send();
}

export { allowedMethods };