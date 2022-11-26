import Big from 'big.js';
import { useBlockHeightQuery, useReleasableClaimsQuery } from 'queries';
import { enterprise } from 'types/contracts';

export const useReleasableClaims = (daoAddress: string, walletAddress: string): enterprise.Claim[] => {
  const { data: blockHeight = Number.MAX_SAFE_INTEGER } = useBlockHeightQuery();

  const timestamp = Date.now();

  const { data: releasableClaims = [] } = useReleasableClaimsQuery(daoAddress, walletAddress);

  const claims = releasableClaims.filter((claim) =>
    'height' in claim.release_at
      ? Big(claim.release_at.height).lte(blockHeight)
      : Big(claim.release_at.timestamp).lte(timestamp)
  );

  return claims;
};
