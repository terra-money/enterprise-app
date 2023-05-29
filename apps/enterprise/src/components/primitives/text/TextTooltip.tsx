import { ReactNode } from 'react';
import { ReactComponent as HelpIcon } from 'components/assets/Help.svg';
import styles from './Text.module.sass';
import { Tooltip } from '../tooltip/Tooltip';

interface TextTooltipProps {
  content: NonNullable<ReactNode>;
}

export const TextTooltip = ({ content }: TextTooltipProps) => (
  <Tooltip variant="normal" title={content} arrow={true} placement="top">
    <HelpIcon className={styles.tooltipIcon} />
  </Tooltip>
);
