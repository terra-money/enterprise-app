import { UIElementProps } from "@terra-money/apps/components";
import { useDialogContext } from "./DialogProvider";

const DialogContainer = (props: UIElementProps) => {
  const { dialogs } = useDialogContext();

  return <>{dialogs}</>;
};

export { DialogContainer };
