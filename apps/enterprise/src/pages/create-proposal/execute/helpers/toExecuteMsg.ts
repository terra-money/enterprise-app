interface WasmMessage {
  execute?: {
    msg: any;
  };
  instantiate?: {
    msg: any;
  };
  migrate?: {
    msg: any;
  };
}

export interface ExecuteMsgInput {
  wasm?: WasmMessage;
}

export const encodedWasmFields: Array<keyof WasmMessage> = ['execute', 'instantiate', 'migrate'];

// export const base64encode = (input: string): string => {
//   return Buffer.from(JSON.stringify(JSON.parse(JSON.stringify(input)))).toString('base64');
// };

export const toExecuteMsg = (value: string): string => {
  const result: ExecuteMsgInput = JSON.parse(value);

  if (result.wasm) {
    encodedWasmFields.forEach((fieldName) => {
      const field = result.wasm?.[fieldName];
      if (field) {
        // eslint-disable-next-line no-self-assign
        field.msg = field.msg;
      }
    });
  }

  return JSON.stringify(result);
};
