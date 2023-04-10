import { useParams } from 'react-router'

export const useCurrentDaoAddress = () => {
  const { address } = useParams<{ address: string }>();

  return address
}