import { useLcdClient } from '@terra-money/wallet-kit';
import { CW20TokenInfoResponse, MultisigVoter, CW721ContractInfoResponse } from 'queries';
import { createContext, ReactNode, useCallback } from 'react';
import { enterprise, enterprise_factory } from 'types/contracts';
import { MultisigMember } from 'types/MultisigMember';
import { fetchExistingToken } from './fetchExistingToken';
import { fetchExistingNFT } from './fetchExistingNFT';
import { DaoGovConfigInput } from './gov-config/DaoGovConfigInput';
import { validateGovConfig } from './gov-config/helpers/validateGovConfig';
import { validateMembers } from './multisig/helpers/validateMembers';
import { validateNftMembership } from './nft/helpers/validateNftMembership';
import { validateDaoImport } from './shared/helpers/validateDaoImport';
import { validateDaoInfo } from './shared/helpers/validateDaoInfo';
import { validateSocials } from './shared/helpers/validateSocials';
import { validateInitialBalances } from './token/helpers/validateInitialBalances';
import { validateTokenInfo } from './token/helpers/validateTokenInfo';
import { fetchExistingMultisigVoters } from './fetchExistingMultisigVoters';
import { useEnv } from 'hooks';
import { validateCouncil } from './shared/helpers/validateCouncil';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { FormInput, FormState, isFormStateValid, useForm } from 'lib/shared/hooks/useForm';
import { getLast } from 'lib/shared/utils/getlast';
import { createContextHook } from 'lib/shared/utils/createContextHook';

export interface DaoSocialDataInput {
  githubUsername?: string;
  discordUsername?: string;
  twitterUsername?: string;
  telegramUsername?: string;
}

export interface DaoInfoInput {
  name: string;
  description?: string;
  logo?: string;
}

export interface CouncilMember {
  address: string;
}

export interface DaoImportInput {
  shouldImport: boolean;
  daoAddress?: string;
}

export interface CouncilInput {
  members: FormState<CouncilMember>[];
  allowedProposalTypes: enterprise_factory.ProposalActionType[];
  quorum: number;
  threshold: number;
}

export interface DaoWizardInput {
  type: enterprise.DaoType;
  daoImport: FormState<DaoImportInput>;

  info: FormState<DaoInfoInput>;
  socials: FormState<DaoSocialDataInput>;
  govConfig: FormState<DaoGovConfigInput>;

  members: FormState<MultisigMember>[];

  nftMembership: FormState<NftMembershipInfo>;

  tokenInfo: FormState<TokenInfo>;
  initialBalances: FormState<InitialBalance>[];
  initialDaoBalance: number | undefined;

  council?: FormState<CouncilInput>;

  existingTokenAddr: string;
  existingToken: CW20TokenInfoResponse | undefined;
  existingTokenLoading: boolean;
  existingTokenError: string | undefined;

  existingNFTAddr: string;
  existingNFT: CW721ContractInfoResponse | undefined;
  existingNFTLoading: boolean;
  existingNFTError: string | undefined;

  existingMultisigAddr: string;
  existingMultisigVoters: MultisigVoter[] | undefined;
  existingMultisigVotersLoading: boolean;
  existingMultisigVotersError: string | undefined;

  whitelistedAssets: enterprise.AssetInfoBaseFor_Addr[];
}

export interface NftMembershipInfo {
  minter: string;
  nftName: string;
  nftSymbol: string;
}

export interface TokenInfo {
  decimals: number;
  name: string;
  symbol: string;

  // token marketing
  description?: string;
  logo?: string;
  marketingOwner?: string;
  project?: string;
}

export interface InitialBalance {
  address: string;
  amount: number;
}

export type DaoWizardStep =
  | 'type'
  | 'daoImport'
  | 'info'
  | 'council'
  | 'socials'
  | 'govConfig'
  | 'confirm'
  | 'members'
  | 'membership'
  | 'tokenInfo'
  | 'whitelist'
  | 'initialBalances';

export const EMPTY_MEMBER = { addr: '', weight: 100, error: undefined, valid: undefined };

export const EMPTY_INITIAL_BALANCE = { address: '', amount: 0 };

export interface DaoWizardState extends DaoWizardInput {
  timeConversionFactor: number;
  steps: DaoWizardStep[];
  predictedSteps: DaoWizardStep[];
  isValid: boolean;
}

const sharedInitialSteps: DaoWizardStep[] = ['type', 'info', 'daoImport'];
const sharedLastSteps: DaoWizardStep[] = ['govConfig', 'whitelist', 'council', 'socials', 'confirm'];

const daoTypeSpecificSteps: Record<enterprise.DaoType, DaoWizardStep[]> = {
  multisig: ['members'],
  nft: ['membership'],
  token: ['tokenInfo', 'initialBalances'],
};

const getPredictedSteps = (type: enterprise.DaoType, shouldImport: boolean): DaoWizardStep[] => {
  const steps = [...sharedInitialSteps];

  if (!shouldImport) {
    steps.push(...daoTypeSpecificSteps[type]);
  }

  return [...steps, ...sharedLastSteps];
};

const defaultDaoType: enterprise.DaoType = 'multisig';
const isImportPredicted = false;

const getInitialState = (timeConversionFactor: number, walletAddr: string | undefined): DaoWizardState => ({
  timeConversionFactor,
  type: defaultDaoType,
  info: {
    name: '',
    description: '',
    logo: undefined,
  },
  isValid: true,
  steps: ['type'],
  predictedSteps: getPredictedSteps(defaultDaoType, isImportPredicted),
  socials: {
    githubUsername: undefined,
    discordUsername: undefined,
    twitterUsername: undefined,
    telegramUsername: undefined,
  },
  govConfig: {
    quorum: 0.3,
    threshold: 0.51,
    vetoThreshold: 0.51,
    unlockingPeriod: 14,
    voteDuration: 7,
    allowEarlyProposalExecution: true,
  },

  daoImport: {
    shouldImport: false,
    daoAddress: undefined,
  },

  council: {
    members: [],
    allowedProposalTypes: ['upgrade_dao'],
    quorum: 0.3,
    threshold: 0.51,
  },

  members: walletAddr ? [{ ...EMPTY_MEMBER, addr: walletAddr }, EMPTY_MEMBER] : [EMPTY_MEMBER],

  nftMembership: {
    minter: '',
    nftName: '',
    nftSymbol: '',
  },

  tokenInfo: {
    decimals: 6,
    name: '',
    symbol: '',
  },
  initialBalances: [EMPTY_INITIAL_BALANCE],
  initialDaoBalance: undefined,

  existingTokenAddr: '',
  existingToken: undefined,
  existingTokenLoading: false,
  existingTokenError: undefined,

  existingNFTAddr: '',
  existingNFT: undefined,
  existingNFTLoading: false,
  existingNFTError: undefined,

  existingMultisigAddr: '',
  existingMultisigVoters: undefined,
  existingMultisigVotersLoading: false,
  existingMultisigVotersError: undefined,
  whitelistedAssets: [],
});

interface DaoWizardFormState {
  formInput: FormInput<DaoWizardInput>;
  formState: DaoWizardState;
  back: () => void;
  forward: () => void;
  goToStep: (step: DaoWizardStep) => void;
}

interface DaoWizardFormProviderProps {
  children: ReactNode;
}

const DaoWizardFormContext = createContext<DaoWizardFormState | undefined>(undefined);

const validateCurrentStep = (state: DaoWizardState): Partial<DaoWizardState> => {
  const stepHandler: Record<DaoWizardStep, () => Partial<DaoWizardState>> = {
    type: () => {
      return {
        predictedSteps: getPredictedSteps(state.type, state.daoImport.shouldImport),
      };
    },
    daoImport: () => {
      const daoImport = validateDaoImport(state.daoImport);

      const isExistingLookupsValid =
        (state.type === 'token' && state.existingToken) ||
        (state.type === 'nft' && state.existingNFT) ||
        (state.type === 'multisig' && state.existingMultisigVoters);

      const isValid =
        isFormStateValid(daoImport) && (daoImport.shouldImport === false || Boolean(isExistingLookupsValid));

      return {
        daoImport,
        isValid,
        predictedSteps: getPredictedSteps(state.type, state.daoImport.shouldImport),
      };
    },
    info: () => {
      const info = validateDaoInfo(state.info);

      return {
        info,
        isValid: isFormStateValid(info),
      };
    },
    socials: () => {
      const socials = validateSocials(state.socials);

      return {
        socials,
        isValid: isFormStateValid(socials),
      };
    },
    govConfig: () => {
      const govConfig = validateGovConfig(state.govConfig);

      return {
        govConfig,
        isValid: isFormStateValid(govConfig),
      };
    },
    confirm: () => ({}),

    members: () => {
      const members = validateMembers(state.members);

      return {
        members,
        isValid: members.every(isFormStateValid) && members.length > 1,
      };
    },

    council: () => {
      if (!state.council) return {};

      const council = validateCouncil(state.council);

      return {
        council,
        isValid: council.members.every(isFormStateValid) && isFormStateValid(council),
      };
    },

    whitelist: () => {
      return {
        isValid: true,
      };
    },

    membership: () => {
      const nftMembership = validateNftMembership(state.nftMembership);
      return {
        nftMembership,
        isValid: isFormStateValid(nftMembership),
      };
    },

    tokenInfo: () => {
      const tokenInfo = validateTokenInfo(state.tokenInfo);
      return {
        tokenInfo,
        isValid: isFormStateValid(tokenInfo),
      };
    },
    initialBalances: () => {
      const initialBalances = validateInitialBalances(state.initialBalances);

      return {
        initialBalances,
        isValid: initialBalances.every(isFormStateValid) && initialBalances.length > 0,
      };
    },
  };

  return {
    isValid: true,
    ...stepHandler[getLast(state.steps)](),
  };
};

const objectContains = <TInput,>(input: Partial<TInput>, key: keyof TInput): boolean => {
  return key in input;
};

export const DaoWizardFormProvider = ({ children }: DaoWizardFormProviderProps) => {
  const { timeConversionFactor } = useEnv();

  const lcd = useLcdClient();

  const myAddress = useMyAddress();

  const [formInput, formState, updateFormState] = useForm<DaoWizardInput, DaoWizardState>(
    async (input, getState, dispatch) => {
      if (objectContains(input, 'existingTokenAddr')) {
        fetchExistingToken(dispatch, lcd, input.existingTokenAddr ?? '').then(() => {
          dispatch({
            ...validateCurrentStep(getState()),
          });
        });
      }

      if (objectContains(input, 'existingNFTAddr')) {
        fetchExistingNFT(dispatch, lcd, input.existingNFTAddr ?? '').then(() => {
          dispatch({
            ...validateCurrentStep(getState()),
          });
        });
      }

      if (objectContains(input, 'existingMultisigAddr')) {
        fetchExistingMultisigVoters(dispatch, lcd, input.existingMultisigAddr ?? '').then(() => {
          dispatch({
            ...validateCurrentStep(getState()),
          });
        });
      }

      const state = {
        ...getState(),
        ...input,
      };

      dispatch({
        ...state,
        ...validateCurrentStep(state),
      });
    },
    getInitialState(timeConversionFactor, myAddress)
  );

  const { predictedSteps, steps } = formState;

  const forward = useCallback(() => {
    const stepIndex = predictedSteps.indexOf(getLast(steps));
    const newState = { ...formState, steps: [...steps, predictedSteps[stepIndex + 1]] };

    updateFormState({ ...newState, ...validateCurrentStep(newState) });
  }, [formState, predictedSteps, steps, updateFormState]);

  const back = useCallback(() => {
    const newState = { ...formState, steps: steps.slice(0, -1) };
    updateFormState({ ...newState, ...validateCurrentStep(newState) });
  }, [formState, steps, updateFormState]);

  const goToStep = useCallback(
    (step: DaoWizardStep) => {
      const newState = { ...formState, steps: steps.slice(0, steps.indexOf(step) + 1) };
      updateFormState({ ...newState, ...validateCurrentStep(newState) });
    },
    [formState, steps, updateFormState]
  );

  return (
    <DaoWizardFormContext.Provider
      value={{
        formInput,
        formState,
        back,
        goToStep,
        forward,
      }}
    >
      {children}
    </DaoWizardFormContext.Provider>
  );
};

export const useDaoWizardForm = createContextHook(DaoWizardFormContext, 'DaoWizardFormContext');
