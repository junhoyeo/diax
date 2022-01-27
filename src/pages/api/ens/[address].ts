import { ethers } from 'ethers';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { allowCORS } from '../_lib/allowCORS';

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-mainnet.alchemyapi.io/v2/S1LUkRnEm4yXq8ofnYa9yrLgr1PoglsV',
);

const ENSResolver: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  let address = req.query.address as string;
  let domain: string | null = null;

  if (!address) {
    res.status(404).send('Invalid address');
    return;
  }

  const isDomain = address.endsWith('.eth');
  if (isDomain) {
    domain = address;
    try {
      address = await provider.resolveName(domain);
    } catch (error) {
      res.status(404).send('Invalid address');
      return;
    }
  }

  const isEthereumAddress = address.startsWith('0x') && address.length === 42;
  if (!isEthereumAddress) {
    res.status(404).send('Invalid address');
    return;
  } else {
    domain = await provider.lookupAddress(address);
  }

  res.setHeader('Cache-Control', 's-maxage=86400');
  res
    .status(200) //
    .send({
      address,
      domain,
    });
};

export default allowCORS(ENSResolver);
