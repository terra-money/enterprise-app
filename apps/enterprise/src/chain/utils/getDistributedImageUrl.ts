const ipfsPrefix = 'ipfs://';
export const getDistributedImageUrl = (image: string) => {
  if (image.startsWith(ipfsPrefix)) {
    return image.replace(ipfsPrefix, 'https://ipfs.io/ipfs/');
  }

  return image;
};
