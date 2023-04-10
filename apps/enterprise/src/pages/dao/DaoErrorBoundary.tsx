import { ErrorBoundary } from "errors/components/ErrorBoundary";
import { ComponentWithChildrenProps } from "lib/shared/props";
import { DaoErrorFallback } from "./DaoErrorFallback";

export const DaoErrorBoundary = ({ children }: ComponentWithChildrenProps) => {
  return (
    <ErrorBoundary
      fallback={<DaoErrorFallback />}
    >
      {children}
    </ErrorBoundary>
  )
}