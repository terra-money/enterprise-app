import { Panel } from 'lib/ui/Panel/Panel';
import { Text } from 'lib/ui/Text';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Slider, SliderProps } from '.';

import { InputWrapperWithErrorMessage } from '../InputWrapper';
import { defaultInputShapeCSS } from '../config';

interface Props extends SliderProps {
  label: ReactNode;
  formatValue: (value: number) => string;
  alignValue?: 'start' | 'end';
  error?: string;
  message?: ReactNode;
}

const Container = styled(Panel)`
  ${defaultInputShapeCSS};

  display: flex;
  align-items: center;
`;

const Content = styled.div`
  display: grid;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 80px;
  align-items: center;
  gap: 16px;
`;

export const AmountInput = ({
  value,
  step,
  min = 0,
  max,
  onChange,
  label,
  formatValue,
  color,
  size = 'l',
  alignValue = 'end',
  error,
  message,
}: Props) => {
  return (
    <InputWrapperWithErrorMessage message={message} error={error} label={label}>
      <Container>
        <Content>
          <Slider step={step} size={size} min={min} max={max} onChange={onChange} value={value} color={color} />
          <Text style={{ textAlign: alignValue }} weight="bold">
            {formatValue(value)}
          </Text>
        </Content>
      </Container>
    </InputWrapperWithErrorMessage>
  );
};
