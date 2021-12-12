import { verifyData as verifyDataHelper } from "@u/verifyData";

function verifyData( exclude ){
  return ( { body }, res, next ) => {
    const error = verifyDataHelper( body, exclude );
    let message;

    if( error ){
      if( error === 1 ){
        message = "Invalid data";
      }
      else if( error === 2 ){
        message = "Invalid sign";
      }

      res.status( 400 ).json( {
        error: {
          localCode: error,
          message
        }
      } );
    } else {
      next();
    }
  }
}

export { verifyData };