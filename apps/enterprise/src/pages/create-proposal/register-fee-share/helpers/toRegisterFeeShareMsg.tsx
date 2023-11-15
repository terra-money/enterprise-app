import { StargateMsg } from 'chain/CosmWasm';
import { MsgRegisterFeeShare } from '@terra-money/feather.js';


interface RegisterFeeShareParams {
  contractAddress: string
  deployerAddress: string,
  withdrawerAddress: string;
}

export const toRegisterFeeShareMsg = ({ contractAddress, deployerAddress, withdrawerAddress }: RegisterFeeShareParams) => {

  const registerMsg = new MsgRegisterFeeShare(contractAddress, deployerAddress, withdrawerAddress);
  const packed = registerMsg.packAny();


  const msg: StargateMsg = {
    stargate: {
      type_url: packed.typeUrl,
      value: Buffer.from(packed.value).toString("base64")
    }
  };
  
  return JSON.stringify(msg);
};
