import { ReactNode } from "react";

interface IfThenProps {
  condition: boolean;
  then: ReactNode;
  else?: ReactNode;
}

export const IfThen = (props: IfThenProps) => {
  const { condition, then: thenChildren, else: elseChildren } = props;

  return <>{condition ? thenChildren : elseChildren}</>;
};
