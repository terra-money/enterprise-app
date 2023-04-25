import { getDaos } from "dao/getDaos"

const collectStats = () => {
  const daos = getDaos()
  console.log('Daos: ', daos)
}

collectStats()