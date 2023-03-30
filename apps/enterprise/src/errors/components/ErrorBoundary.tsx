import { reportError } from 'errors/errorMonitoring';
import { ComponentWithChildrenProps } from 'lib/shared/props';
import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps extends ComponentWithChildrenProps {
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    reportError(error)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || null
    }

    return this.props.children
  }
}

