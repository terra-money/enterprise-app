import Big from 'big.js';
import { useBlockHeightQuery, useClaimsQuery } from 'queries';
import { enterprise } from 'types/contracts';

export const usePendingClaims = (daoAddress: string, walletAddress: string): enterprise.Claim[] => {
  const { data: blockHeight = Number.MAX_SAFE_INTEGER } = useBlockHeightQuery();

  const timestamp = Date.now();

  const { data: claims = [] } = useClaimsQuery(daoAddress, walletAddress);

  return claims.filter((claim) =>
    'height' in claim.release_at
      ? Big(claim.release_at.height).gt(blockHeight)
      : Big(claim.release_at.timestamp).gt(timestamp * 1000000)
  );
};
