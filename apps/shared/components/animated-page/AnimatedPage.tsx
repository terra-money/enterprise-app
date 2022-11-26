import { UIElementProps } from "@terra-money/apps/components";
import classNames from "classnames";
import { useNavigationType } from "react-router";
import { CSSTransition } from "react-transition-group";
import styles from "./AnimatedPage.module.sass";

type Gutters = "none" | "normal";

interface AnimatedPageProps extends UIElementProps {
  gutters?: Gutters;
}

export const AnimatedPage = (props: AnimatedPageProps) => {
  const { className, children, gutters = "normal" } = props;

  const type = useNavigationType();

  return (
    <CSSTransition
      classNames={{
        appear: styles.appear,
        appearActive: styles.appearActive,
      }}
      in={true}
      appear={true}
      timeout={720}
    >
      <div
        className={classNames(className, styles.root, {
          [styles.gutters]: gutters === "normal",
        })}
        data-navigation={type}
      >
        {children}
      </div>
    </CSSTransition>
  );
};
