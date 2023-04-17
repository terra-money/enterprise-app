import { UIElementProps } from '@terra-money/apps/components';
import { Modal } from 'lib/ui/Modal';
import { Text } from 'lib/ui/Text';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { HStack } from './Stack';
import { useLocation, useNavigate } from 'react-router';
import { useWallet } from '@terra-money/wallet-provider';


export const SanctionModal = (props: UIElementProps) => {
    const { children } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const { disconnect } = useWallet();
   


    return (
        <>
            {children}
            {(
                <Modal
                    title="Sanctioned address"
                    footer={<HStack fullWidth gap={16} justifyContent={'end'}><PrimaryButton onClick={() => navigate(location.pathname)}>Refresh</PrimaryButton><PrimaryButton onClick={() => disconnect()}>Disconnect</PrimaryButton></HStack>}
                    renderContent={() => (
                        <Text color="supporting">
                            Wallets that are or have interacted with sanctioned contracts are not permitted to use the Enterprise protocol webapp
                        </Text>
                    )}
                />
            )}
        </>
    );
};
