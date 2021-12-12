function throughMiddlewares( ...middlewares ){
  if( middlewares.length === 1 ){
    return middlewares[0];
  }

  const lastMiddleware = middlewares.splice( -1 )[0];

  return middlewares
    .reverse()
    .reduce( ( fn, middleware ) => ( ...args ) => middleware( ...args, () => fn( ...args ) ), lastMiddleware );
}

export { throughMiddlewares };