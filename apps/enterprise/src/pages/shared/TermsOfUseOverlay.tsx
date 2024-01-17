import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { Button } from 'lib/ui/buttons/Button';
import { Text } from 'lib/ui/Text';
import { ShyTextButton } from 'lib/ui/buttons/ShyTextButton';
import { ExternalLink } from 'lib/navigation/Link/ExternalLink';
import { Checkbox } from 'lib/ui/inputs/Checkbox/Checkbox';

export const TermsOfUseOverlay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(location.pathname === "/" ? false : true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsOpen(true);
    };
  }, [location.pathname]);

  const hasAcceptedCurrent = localStorage.getItem(
    "TermsOfUseAccepted_Oct-3-2023"
  );

  const handleAccept = () => {
    localStorage.setItem("TermsOfUseAccepted_Oct-3-2023", "true");
    setIsOpen(false);
  };

  const handleReject = () => {
    setIsOpen(false);
    navigate('/');
  };

  if (hasAcceptedCurrent === "true") return null;

  return (
    <>
      {isOpen && (
        <Modal
          title="Terms of Use"
          width={600}
          renderContent={() => (
            <VStack gap={48}>
              <Text as="div" weight="regular">
                Please check the box below to confirm your agreement to the{" "}
                <ExternalLink to="https://drive.google.com/file/d/1A4B41Cy2lR0nQnlAVLGgjNcFParcbnA_/view?usp=drive_link">
                  <ShyTextButton as="span" text="Terms of Use" />
                </ExternalLink>
                {" "}and{" "}
                <ExternalLink to="https://assets.website-files.com/611153e7af981472d8da199c/631ac874c79cf645a2f9b5ee_PrivacyPolicy.pdf">
                  <ShyTextButton as="span" text="Privacy Policy" />
                </ExternalLink>
                .
              </Text>
              <Checkbox
                label={
                  <Text as="div" weight="regular" size={12}>
                    I have read and understand, and do hereby agree to be bound by the Terms of Use and Privacy Policy, including all future amendments thereto.
                  </Text>
                }
                value={checked}
                onChange={() => setChecked(!checked)}
              />
            </VStack>
          )}
          footer={
            <VStack gap={12}>
              <Button
                isDisabled={!checked}
                onClick={handleAccept}
              >
                Accept & Continue
              </Button>
              <Button
                kind="secondary"
                onClick={handleReject}
              >
                Reject & Exit
              </Button>
            </VStack>
          }
        />
      )}
    </>
  );
};
