import { UIElementProps } from '@terra-money/apps/components';

export const Form = (props: UIElementProps) => {
  const { children, className } = props;

  return (
    <div
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};
