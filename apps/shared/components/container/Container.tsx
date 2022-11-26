import classNames from "classnames";
import { DOMAttributes, forwardRef, Ref } from "react";
import { UIElementProps } from "../UIElementProps";
import styles from "./Container.module.sass";

type ComponentName =
  | "header"
  | "main"
  | "footer"
  | "section"
  | "div"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export interface ContainerProps
  extends UIElementProps,
    Pick<DOMAttributes<any>, "onClick"> {
  component?: ComponentName;
  direction?: "row" | "column";
  gap?: number;
}

const Container = forwardRef((props: ContainerProps, ref: Ref<any>) => {
  const {
    className,
    children,
    component = "section",
    direction = "row",
    gap = 0,
    ...other
  } = props;

  const Component = component;

  const style = { gap };

  return (
    <Component
      ref={ref}
      className={classNames(styles.root, className, styles[direction])}
      style={style}
      {...other}
    >
      {children}
    </Component>
  );
});

export { Container };
