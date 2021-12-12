import { createHmac } from "crypto";

import { jsonPack } from "./jsonPack";

const HMAC_ALGORITHM = process.env.HMAC_ALGORITHM;
const HMAC_SECRET_KEY = process.env.HMAC_SECRET_KEY;

function verifyData( { sign: rawSign, ...data }, exclude ){
  if(
    data === null ||
    Array.isArray( data ) ||
    typeof data !== "object"
  ){
    return 1;
  }

  if( typeof rawSign !== "string" ){
    return 2;
  }

  const [ clientSign, salt ] = rawSign.split( ";" );
  const packedData = jsonPack( data, exclude );
  const serverSign = createHmac( HMAC_ALGORITHM, `${HMAC_SECRET_KEY}${salt}` ).update( packedData ).digest( "hex" );
  const isVerified = clientSign === serverSign;

  return isVerified ? 0 : 2;
}

export { verifyData };