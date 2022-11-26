import { Slider as MuiSlider, SliderProps as MuiSliderProps } from '@mui/material';
import classNames from 'classnames';
import styles from './Slider.module.sass';

interface SliderProps extends MuiSliderProps {}

const Slider = (props: SliderProps) => {
  const { className, ...rest } = props;
  return <MuiSlider className={classNames(styles.root, className)} {...rest} />;
};

export { Slider };
