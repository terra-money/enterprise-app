type VariableName = "LCD_ENDPOINT" | "CHAIN_ID" | "NETWORK"

export const assertEnvVar = (name: VariableName): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name} environment variable`)
  }

  return value
}
