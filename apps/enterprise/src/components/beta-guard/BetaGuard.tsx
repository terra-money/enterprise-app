import { UIElementProps } from '@terra-money/apps/components';
import { PersistentStorageKey, usePersistentStorageValue } from 'state/persistentStorage';
import { Modal } from 'lib/ui/Modal';
import { Text } from 'lib/ui/Text';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';

export const BetaGuard = (props: UIElementProps) => {
  const { children } = props;

  const [hasAccepted, setHasAccepted] = usePersistentStorageValue<boolean>(PersistentStorageKey.BetaAccept, false);

  return (
    <>
      {children}
      {!hasAccepted && (
        <Modal
          onClose={() => setHasAccepted(true)}
          title="Before you proceed"
          footer={<PrimaryButton onClick={() => setHasAccepted(true)}>Proceed</PrimaryButton>}
          renderContent={() => (
            <Text color="supporting">
              This is the beta release of the Enterprise app. Although Enterprise has been evaluated internally, it is
              still undergoing an external security audit.
            </Text>
          )}
        />
      )}
    </>
  );
};
