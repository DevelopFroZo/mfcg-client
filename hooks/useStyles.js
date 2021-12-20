import { useMemo } from "react";

import { joinStyles } from "@u";

function useStyles( rawStyles, deps = [] ){
  const styles = useMemo( () => joinStyles( ...rawStyles ), deps );

  return styles;
}

export { useStyles };