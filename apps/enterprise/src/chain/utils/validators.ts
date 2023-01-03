import { terraAddressRegex } from '@terra-money/apps/utils';
import * as z from 'zod';

export const zodAddressValidator = z.string().regex(terraAddressRegex, { message: 'Invalid Terra address' });
