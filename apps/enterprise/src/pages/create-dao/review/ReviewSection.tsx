import { ComponentWithChildrenProps } from "lib/shared/props";
import { VStack } from "lib/ui/Stack";
import { Text } from "lib/ui/Text";
import { defaultTransitionCSS } from "lib/ui/animations/transitions";
import { EditIcon } from "lib/ui/icons/EditIcon";
import styled, { css } from "styled-components";

interface ReviewSectionProps extends ComponentWithChildrenProps {
  onEdit?: () => void;
  name: string
}

const Header = styled(Text) <{ isEditable: boolean }>`
  font-weight: 600;
  font-size: 18;
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};

  ${defaultTransitionCSS};

  ${({ isEditable }) => isEditable && css`
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.colors.text.toCssValue()};
    }
  `}


  svg {
    display:inline;
    margin-left: 8px;
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }
`

export const ReviewSection = ({ onEdit, name }: ReviewSectionProps) => {
  return (
    <VStack gap={4}>
      <Header onClick={onEdit} isEditable={!!onEdit}>
        {name}
        {!!onEdit && (
          <EditIcon />
        )}
      </Header>
    </VStack>
  )
}