import { Slider as MuiSlider, SliderProps as MuiSliderProps, Stack } from '@mui/material';
import classNames from 'classnames';
import styles from './Slider.module.sass';
import { Text } from 'components/primitives';

interface SliderProps extends MuiSliderProps {
  label: string;
  formatValue?: (value: number) => string;
}

const IntegratedSliderInput = (props: SliderProps) => {
  const { className, label, formatValue = (v) => v, ...rest } = props;

  return (
    <Stack width="100%" spacing={2} direction="row">
      <Text variant="label">{label}</Text>
      <MuiSlider className={classNames(styles.root, className)} {...rest} />
      <div className={styles.sliderValue}>{formatValue(rest.value as number)}</div>
    </Stack>
  );
};

export { IntegratedSliderInput };
