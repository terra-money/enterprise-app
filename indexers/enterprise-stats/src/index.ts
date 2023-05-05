import { getDaoTVL } from "dao/getDaoTVL"
import { processDaos } from "dao/processDaos"

const collectStats = async () => {
  await processDaos({
    attributes: ['address', 'enterpriseFactoryContract', 'membershipContractAddress', 'type'],
    handle: async (dao) => {
      try {
        const tvl = await getDaoTVL(dao)
        console.log(`${dao.address} TVL=${tvl}`)

        // TODO: get permissions to update DAOs
        // await updateDao(address, { tvl: 0 })
      } catch (err) {
        console.log(`Error getting TVL for DAO=${dao.address}`, err.toString())
      }
    }
  })
}

collectStats()