import { randomBytes, createHmac } from "crypto";

import { jsonPack } from "@u/jsonPack";

import { easyWrap } from "./easyWrap";

const HMAC_ALGORITHM = process.env.HMAC_ALGORITHM;
const HMAC_SECRET_KEY = process.env.HMAC_SECRET_KEY;
const HMAC_SALT_LENGTH = Number( process.env.HMAC_SALT_LENGTH );

const signedWrapper = easyWrap( ( {}, res ) => {
  Reflect.set( res, "signed", ( payload, exclude ) => {
    const packedPayload = jsonPack( payload, exclude );
    const salt = randomBytes( HMAC_SALT_LENGTH ).toString( "hex" );
    const sign = createHmac( HMAC_ALGORITHM, `${HMAC_SECRET_KEY}${salt}` ).update( packedPayload ).digest( "hex" ) + `;${salt}`;

    res.json( { payload, sign } );
  } );
} );

export { signedWrapper };