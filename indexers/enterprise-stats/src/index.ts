import { getDaoTVL } from "dao/getDaoTVL"
import { processDaos } from "dao/processDaos"

const collectStats = async () => {
  await processDaos({
    attributes: ['address', 'enterpriseFactoryContract'],
    handle: async (dao) => {
      console.log('Handle DAO: ', dao.address)

      const tvl = await getDaoTVL(dao)
      console.log('TVL: ', tvl)

      // TODO: get permissions to update DAOs
      // await updateDao(address, { tvl: 0 })
    }
  })
}

collectStats()