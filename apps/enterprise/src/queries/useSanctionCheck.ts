import { useQuery, UseQueryResult } from "react-query"


const isWalletSanctioned = async (walletAddress: string | undefined) => { 
    // const response = await fetch(`https://something.com/check/${walletAddress}`);
    // const isSanctioned = await response.json();
    // return isSanctioned;
    return true
}

export const useSanctionCheck = (walletAddress: string | undefined): UseQueryResult<boolean> => {
    return useQuery([walletAddress] , async () => {
        const isSanctioned: boolean = await isWalletSanctioned(walletAddress);
        return isSanctioned;
    })
}