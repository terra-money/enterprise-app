import { FormSection } from 'components/form-section';
import { fetchCW721ContractInfo } from 'queries';
import { useState } from 'react';
import { ProposalForm } from '../shared/ProposalForm';
import { useCurrentDaoWhitelistedNFTs } from './CurrentDAOWhitelistedNFTsProvider';
import { toUpdateNFTWhitelistMsg } from './helpers/toUpdateNFTWhitelistMsg';
import { WhitelistedNFTInput } from './WhitelistedNFTInput';
import styles from './WhitelistedNFTsProposalForm.module.sass';
import { useLCDClient } from '@terra-money/wallet-provider';
import { validateAddress } from 'chain/utils/validators';
import { removeAtIndex } from 'lib/shared/utils/removeAtIndex';
import { updateAtIndex } from 'lib/shared/utils/updateAtIndex';
import { AddButton } from 'lib/ui/buttons/AddButton';

interface NFTInputState {
  value: string;
  error?: string;
  loading?: boolean;
}

export const WhitelistedNFTsProposalForm = () => {
  const initialNfts = useCurrentDaoWhitelistedNFTs();

  const [nfts, setNfts] = useState<NFTInputState[]>(initialNfts.map((value) => ({ value })));

  const msg = toUpdateNFTWhitelistMsg(
    initialNfts,
    nfts.map((nft) => nft.value)
  );

  const lcd = useLCDClient();

  const areNftsValid = nfts.every(({ error, loading }) => !error && !loading);
  const isFormValid = areNftsValid && (msg.add.length > 0 || msg.remove.length > 0);

  const handleNFTChange = async (index: number, value: string) => {
    const inputState: NFTInputState = { value };
    inputState.error = validateAddress(value);

    const otherNFTs = removeAtIndex(nfts, index);
    if (otherNFTs.some((nft) => nft.value === value)) {
      inputState.error = 'NFT collection already added';
    }

    if (!inputState.error) {
      inputState.loading = true;

      fetchCW721ContractInfo(lcd, value)
        .then(() => {
          setNfts((nfts) => {
            const nft = nfts[index];
            if (nft.value === value) {
              return updateAtIndex(nfts, index, (value) => ({ ...value, loading: false }));
            }

            return nfts;
          });
        })
        .catch(() => {
          setNfts((nfts) => {
            const nft = nfts[index];
            if (nft.value === value) {
              return updateAtIndex(nfts, index, (value) => ({
                ...value,
                loading: false,
                error: 'NFT collection does not exist',
              }));
            }

            return nfts;
          });
        });
    }

    setNfts(updateAtIndex(nfts, index, () => inputState));
  };

  return (
    <ProposalForm disabled={!isFormValid} getProposalActions={() => [{ update_nft_whitelist: msg }]}>
      <FormSection name="Whitelisted NFTs">
        <div className={styles.root}>
          <div className={styles.list}>
            {nfts.map(({ value, error, loading }, index) => (
              <WhitelistedNFTInput
                value={value}
                key={index}
                error={error}
                loading={loading}
                onRemove={() => setNfts(removeAtIndex(nfts, index))}
                onChange={(value) => handleNFTChange(index, value)}
              />
            ))}
          </div>
          {areNftsValid && (
            <AddButton
              size="l"
              onClick={() => {
                setNfts([...nfts, { value: '' }]);
                handleNFTChange(nfts.length, '');
              }}
            />
          )}
        </div>
      </FormSection>
    </ProposalForm>
  );
};
