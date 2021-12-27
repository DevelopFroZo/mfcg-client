import { Regular } from "../Regular";

import { useStyles } from "@h";

import styles from "./styles.module.scss";

function Circle( { className, ...props } ){
  const stylesCircle = useStyles( [ styles.circle, className ], [ className ] );

  return (
    <Regular
      className = {stylesCircle}
      smallClassName = {styles.circle_small}
      {...props}
    />
  )
}

export { Circle };