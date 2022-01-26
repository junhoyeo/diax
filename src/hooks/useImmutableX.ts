import { useEffect, useState } from 'react';

import { Network } from '@/state/Network';
import { ImmutableXClient, Link } from '@imtbl/imx-sdk';

export const ENDPOINTS = {
  mainnet: {
    LINK: 'https://link.x.immutable.com',
    PUBLIC_API: 'https://api.x.immutable.com/v1',
  },
  ropsten: {
    LINK: 'https://link.ropsten.x.immutable.com',
    PUBLIC_API: 'https://api.ropsten.x.immutable.com/v1',
  },
};

export const getImmutableX = async (network: Network) => {
  const Endpoint =
    network === 'mainnet' ? ENDPOINTS.mainnet : ENDPOINTS.ropsten;

  const link = new Link(Endpoint.LINK);
  const client = await ImmutableXClient.build({
    publicApiUrl: Endpoint.PUBLIC_API,
  });

  return { link, client };
};

export const useImmutableX = (network: Network) => {
  const [link, setLink] = useState<Link | null>(null);
  const [client, setClient] = useState<ImmutableXClient | null>(null);

  useEffect(() => {
    getImmutableX(network)
      .then(({ link, client }) => {
        setLink(link);
        setClient(client);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [network]);

  return { link, client };
};
