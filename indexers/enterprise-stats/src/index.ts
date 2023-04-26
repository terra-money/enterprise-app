import { getDaoTVL } from "dao/getDaoTVL"
import { processDaos } from "dao/processDaos"

const collectStats = async () => {
  await processDaos({
    attributes: ['address'],
    handle: async ({ address }) => {
      console.log('Handle DAO: ', address)

      const tvl = await getDaoTVL(address)
      console.log('TVL: ', tvl)

      // TODO: get permissions to update DAOs
      // await updateDao(address, { tvl: 0 })
    }
  })
}

collectStats()