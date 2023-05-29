import { LabeledValue } from 'lib/ui/LabeledValue';
import { useDaoWizardForm } from '../DaoWizardFormProvider';
import { Address } from 'chain/components/Address';

export const TokenInfoReview = () => {
  const {
    formState: { tokenInfo },
  } = useDaoWizardForm();

  return (
    <>
      <LabeledValue name="Decimals">{tokenInfo.decimals || '-'}</LabeledValue>
      <LabeledValue name="Name">{tokenInfo.name || '-'}</LabeledValue>
      <LabeledValue name="Symbol">{tokenInfo.symbol || '-'}</LabeledValue>

      <LabeledValue name="Description">{tokenInfo.description || '-'}</LabeledValue>
      <LabeledValue name="Logo">{tokenInfo.logo || '-'}</LabeledValue>
      <LabeledValue name="Marketing owner">
        {tokenInfo.marketingOwner ? <Address value={tokenInfo.marketingOwner} /> : '-'}
      </LabeledValue>
      <LabeledValue name="Project">{tokenInfo.project || '-'}</LabeledValue>
    </>
  );
};
