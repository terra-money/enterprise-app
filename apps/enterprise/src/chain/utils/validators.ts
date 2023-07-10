import * as z from 'zod';

export const terraAddressRegex =
  /(terra([a-z0-9]{39}|[a-z0-9]{59})\b)|(terravaloper[a-z0-9]{39}\b)|([a-z0-9-]+\.ust\b)/;

export const isValidAddress = (address: string) => {
  return terraAddressRegex.test(address);
};

export const validateAddress = (input: string) => {
  if (!isValidAddress(input)) {
    return 'Enter a valid Terra Address';
  }
};

export const zodAddressValidator = z.string().regex(terraAddressRegex, { message: 'Invalid Terra address' });
