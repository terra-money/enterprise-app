import { FallbackRender } from "@sentry/react"
import { Panel } from "lib/ui/Panel/Panel";
import { VStack } from "lib/ui/Stack";
import { Text } from "lib/ui/Text";
import styled from "styled-components";

type ErrorDataProps = Parameters<FallbackRender>[0];

const StackTrace = styled(Panel)`
  
  max-height: 240px;
  overflow-y: auto;
`

export const ErrorData = ({ error, resetError, componentStack }: ErrorDataProps) => {
  return (
    <VStack gap={8}>
      <Text color="alert">{error?.toString()}</Text>
      <StackTrace>
        {componentStack}
      </StackTrace>
    </VStack>
  )
}