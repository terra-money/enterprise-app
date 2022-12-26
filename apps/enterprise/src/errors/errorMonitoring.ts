// TODO: integrate with Sentry or similar
export const reportError = (error: any, extra: Record<string, string> = {}) => {
  console.info('reporting an error', error, extra);
};
