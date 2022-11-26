import React, { ReactNode } from "react";

export interface UIElementProps {
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
  dataset?: DOMStringMap;
}
