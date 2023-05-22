import { ExtraErrorData as ExtraErrorDataIntegration } from '@sentry/integrations'
import * as Sentry from '@sentry/react'
import { isProduction } from 'shared'
import { assertEnvVar } from 'shared/assertEnvVar'

export const setupErrorMonitoring = () => {
  if (!isProduction) return

  Sentry.init({
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications.',
      '$ is not defined',
      'window.fetch is not a function',
    ],
    dsn: assertEnvVar('SENTRY_KEY'),
    integrations: [new ExtraErrorDataIntegration({ depth: 10 })],
    tracesSampleRate: 1.0,
  })

  Sentry.configureScope((scope) =>
    scope.setTag('version', assertEnvVar('VERSION'))
  )
}

export const setUserIdForErrorMonitoring = (userId: string) => {
  if (!isProduction) return

  Sentry.configureScope((scope) => {
    scope.setUser({ id: userId })
  })
}

export const reportError = (error: any, extra: Record<string, string> = {}) => {
  console.log('reportError', error, extra)
  Sentry.withScope((scope) => {
    Object.entries(extra).forEach(([key, value]) => {
      scope.setExtra(key, value)
    })
    Sentry.captureException(error)
  })
}

