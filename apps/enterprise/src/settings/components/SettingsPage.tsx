import { ScrollableContainer } from "@terra-money/apps/components"
import { Navigation } from "components/Navigation"
import { PageLayout } from "components/layout"
import { ResponsiveView } from "lib/ui/ResponsiveView"
import { VStack } from "lib/ui/Stack"
import { Text } from "lib/ui/Text"
import { useRef } from "react"

const title = "Settings"

export const SettingsPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  const content = (
    <p>Coming soon!</p>
  )

  return (
    <Navigation>
      <ResponsiveView
        normal={() => (
          <ScrollableContainer stickyRef={ref} >
            <PageLayout
              header={
                <Text weight="bold" size={32}>
                  {title}
                </Text>
              }
            >
              {content}
            </PageLayout>
          </ScrollableContainer>
        )}
        small={() => (
          <VStack gap={24}>
            <Text weight="bold" size={24}>
              {title}
            </Text>
            {content}
          </VStack>
        )}
      />
    </Navigation>
  );
}