function jsonPack( json, rawExclude ){
  const exclude = rawExclude && new Set( rawExclude );

  return JSON.stringify(
    Object
    .entries( json )
    .reduce( ( res, [ key, value ] ) => {
      if( !exclude || !exclude.has( key ) ){
        if( value !== null && !Array.isArray( value ) && typeof value === "object" ){
          value = jsonPack( value );
        }

        res.push( [ key, value ] );
      }

      return res;
    }, [] )
    .sort( ( [ key0 ], [ key1 ] ) => {
      if( key0 < key1 ) return -1;
      if( key0 > key1 ) return 1;

      return 0;
    } )
  );
}

export {
  jsonPack
};