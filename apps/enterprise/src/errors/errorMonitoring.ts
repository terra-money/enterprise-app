import { ExtraErrorData as ExtraErrorDataIntegration } from '@sentry/integrations';
import * as Sentry from '@sentry/react';
import { isProduction } from 'shared';
import { assertEnvVar } from 'shared/assertEnvVar';

export const setupErrorMonitoring = () => {
  if (!isProduction) return;

  Sentry.init({
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications.',
      '$ is not defined',
      'window.fetch is not a function',
    ],
    dsn: assertEnvVar('SENTRY_KEY'),
    integrations: [
      new ExtraErrorDataIntegration({ depth: 10 }),
      new Sentry.Replay({
        // Additional SDK configuration goes in here, for example:
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    tracesSampleRate: 1.0,

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,
  });

  Sentry.configureScope((scope) => scope.setTag('version', assertEnvVar('VERSION')));
};

export const setUserIdForErrorMonitoring = (userId: string) => {
  if (!isProduction) return;

  Sentry.configureScope((scope) => {
    scope.setUser({ id: userId });
  });
};

export const reportError = (error: any, extra: Record<string, string> = {}) => {
  console.log('reportError', error, extra);
  Sentry.withScope((scope) => {
    Object.entries(extra).forEach(([key, value]) => {
      scope.setExtra(key, value);
    });
    Sentry.captureException(error);
  });
};
