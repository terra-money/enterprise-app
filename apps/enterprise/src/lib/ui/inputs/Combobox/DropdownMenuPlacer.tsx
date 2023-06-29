import { useFloating, offset, flip, shift, size, autoUpdate, useDismiss } from '@floating-ui/react'
import { getCSSUnit } from 'lib/ui/utils/getCSSUnit'
import { zIndex } from 'lib/ui/zIndex'
import React, { useRef } from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactNode
  menu?: React.ReactNode
  isMenuOpen: boolean
  onIsMenuOpenChange: (isOpen: boolean) => void
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const DropdownMenu = styled.div`
  z-index: ${zIndex.menu};
`

export const DropdownMenuPlacer = ({
  children,
  menu,
  isMenuOpen,
  onIsMenuOpenChange
}: Props) => {
  const wrapperElement = useRef<HTMLDivElement>(null)
  const { refs, strategy, x, y, context } = useFloating({
    placement: 'bottom-start',
    strategy: 'fixed',
    open: isMenuOpen,
    onOpenChange: onIsMenuOpenChange,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: getCSSUnit(rects.reference.width),
          })
        },
      }),
    ],
  })

  useDismiss(context)

  return (
    <Container ref={wrapperElement}>
      <Container ref={refs.setReference}>{children}</Container>
      <DropdownMenu
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
        }}
        ref={refs.setFloating}
      >
        {isMenuOpen && menu}
      </DropdownMenu>
    </Container>
  )
}
