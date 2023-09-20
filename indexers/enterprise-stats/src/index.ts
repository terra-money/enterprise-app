import { getDaoTVL } from 'dao/getDaoTVL';
import { processDaos } from 'dao/processDaos';
import { updateDao } from 'dao/updateDao';

const collectStats = async () => {
  await processDaos({
    attributes: ['address', 'enterpriseFactoryContract', 'membershipContractAddress', 'type', 'name'],
    handle: async (dao) => {
      try {
        const tvl = await getDaoTVL(dao);

        console.log(`${dao.address}: ${dao.name} TVL = ${tvl}`);

        try {
          await updateDao(dao.address, { tvl });
        } catch (err) {
          console.log(`Error updating DAO=${dao.address}`, err?.toString());
        }
      } catch (err) {
        console.log(`Error getting TVL for DAO=${dao.address}`, err.toString());
      }
    },
  });
};

collectStats();
