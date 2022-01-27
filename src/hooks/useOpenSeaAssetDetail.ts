import axios from 'axios';
import { useEffect, useState } from 'react';

import { OpenSeaAsset } from './OpenSeaAsset';

export type Asset = {
  token_id: string;
  token_address: string;
  name: string;
  description: string;
  image_url: string;
  metadata: {}[];
  collection: {
    name: string;
    icon_url: string;
  };
};

const API_ENDPOINT = 'https://api.opensea.io/api';

type Options = {
  tokenId: string;
  tokenAddress: string;
};

export const useOpenSeaAssetDetail = ({ tokenId, tokenAddress }: Options) => {
  const [asset, setAsset] = useState<Asset | null>(null);

  useEffect(() => {
    axios
      .get<OpenSeaAsset>(`${API_ENDPOINT}/v1/asset/${tokenAddress}/${tokenId}`)
      .then(({ data: asset }) => {
        setAsset({
          token_id: asset.token_id,
          token_address: asset.asset_contract.address,
          name: asset.name,
          description: asset.description,
          image_url: asset.image_url,
          metadata: [],
          collection: {
            name: asset.collection.name,
            icon_url: asset.collection.image_url,
          },
        });
      });
  }, [tokenId, tokenAddress]);

  return { asset };
};
