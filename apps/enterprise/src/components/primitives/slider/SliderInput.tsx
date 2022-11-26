import { SliderProps as MuiSliderProps } from '@mui/material';
import classNames from 'classnames';
import { Slider, Text } from 'components/primitives';
import styles from './SliderInput.module.sass';

// interface SliderProps extends MuiSliderProps {
//   label: string;
//   formatValue?: (value: number) => string;
// }

// const SliderInput = (props: SliderProps) => {
//   const { className, label, formatValue = (v) => v, ...rest } = props;

//   return (
//     <InputWrapper label={label}>
//       <div className={styles.container}>
//         <Slider className={classNames(styles.root, className)} {...rest} />
//         <Text variant="heading4">{formatValue(rest.value as number)}</Text>
//       </div>
//     </InputWrapper>
//   );
// };

interface SliderProps extends MuiSliderProps {
  formatValue?: (value: number) => string;
  error?: string;
}

const SliderInput = (props: SliderProps) => {
  const { className, error, formatValue = (v) => v, ...rest } = props;

  return (
    <div className={classNames(styles.container, { [styles.error]: !!error })}>
      <Slider className={classNames(styles.root, className)} {...rest} />
      <Text variant="heading4">{formatValue(rest.value as number)}</Text>
    </div>
  );
};

export { SliderInput };
