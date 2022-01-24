import { useEffect, useState } from 'react';

import { ImmutableXClient, Link } from '@imtbl/imx-sdk';

const ENDPOINTS = {
  mainnet: {
    LINK: 'https://link.x.immutable.com',
    PUBLIC_API: 'https://api.x.immutable.com/v1',
  },
  ropsten: {
    LINK: 'https://link.ropsten.x.immutable.com',
    PUBLIC_API: 'https://api.ropsten.x.immutable.com/v1',
  },
};

export type Environment = 'mainnet' | 'ropsten';

export const getImmutableX = async (environment: Environment) => {
  const Endpoint =
    environment === 'mainnet' ? ENDPOINTS.mainnet : ENDPOINTS.ropsten;

  const link = new Link(Endpoint.LINK);
  const client = await ImmutableXClient.build({
    publicApiUrl: Endpoint.PUBLIC_API,
  });

  return { link, client };
};

export const useImmutableX = (environment: Environment) => {
  const [link, setLink] = useState<Link | null>(null);
  const [client, setClient] = useState<ImmutableXClient | null>(null);

  useEffect(() => {
    getImmutableX(environment)
      .then(({ link, client }) => {
        setLink(link);
        setClient(client);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [environment]);

  return { link, client };
};
