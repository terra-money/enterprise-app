import { Logger, createPersistence, makeTableName } from "@apps-shared/indexers/utils";
import { getProposalFromContract } from "./getProposalFromContract";
import { Entity } from "./types";
import { DAOS_PK_NAME, DAOS_SK_NAME, TableNames } from 'initializers';
import { PK, SK } from "./Indexer";

interface IndexProposalParams {
  daoAddress: string
  id: number
}

export const indexProposal = async ({ daoAddress, id }: IndexProposalParams): Promise<void> => {
  const logger = new Logger('Index proposal command');

  const proposal = await getProposalFromContract({
    daoAddress,
    id,
    logger
  })

  const persistence = createPersistence<Entity>(
    TableNames.daos(),
    PK,
    SK,
    DAOS_PK_NAME,
    DAOS_SK_NAME
  );

  persistence.save([proposal])
}

// const proposalToIndex: IndexProposalParams = {
//   daoAddress: 'terra1290d4q6av48d3r8y99s4d5fqr5k75hn7l7ytz27pu3fqvg3f4jhsqr9vju',
//   id: 14
// }

// indexProposal(proposalToIndex)