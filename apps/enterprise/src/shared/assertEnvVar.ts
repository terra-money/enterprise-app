type VariableName = 'SENTRY_KEY' | 'VERSION';

export const assertEnvVar = (name: VariableName): string => {
  const envVarName = `REACT_APP_${name}`;
  const value = process.env[envVarName];
  if (!value) {
    throw new Error(`Missing ${envVarName} environment variable`);
  }

  return value;
};
