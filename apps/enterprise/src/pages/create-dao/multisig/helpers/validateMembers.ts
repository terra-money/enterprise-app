import { validateAddress } from 'chain/utils/validators';
import { FormState } from 'lib/shared/hooks/useForm';
import { MultisigMember } from 'types/MultisigMember';

export const validateMembers = (members: MultisigMember[]): FormState<MultisigMember>[] => {
  return members.map(({ addr, weight }, index) => {
    const formState: FormState<MultisigMember> = { addr, weight };

    if (!addr) {
      formState.addrError = 'Enter a Terra address';
    } else if (validateAddress(addr)) {
      formState.addrError = 'Invalid Terra address';
    } else {
      const previousAddresses = members.slice(0, index).map(({ addr }) => addr);
      const isDuplicate = previousAddresses.includes(addr);
      if (isDuplicate) {
        formState.addrError = 'This address has already been added';
      }
    }

    return formState;
  });
};
