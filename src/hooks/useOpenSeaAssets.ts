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
  address: string;
};

export const useOpenSeaAssets = ({ address }: Options) => {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    axios
      .get<{ assets: OpenSeaAsset[] }>(
        `${API_ENDPOINT}/v1/assets?owner=${address}`,
      )
      .then(({ data }) => {
        setAssets(
          data.assets.map((openseaAsset) => {
            return {
              token_id: openseaAsset.token_id,
              token_address: openseaAsset.asset_contract.address,
              name: openseaAsset.name,
              description: openseaAsset.description,
              image_url: openseaAsset.image_url,
              metadata: [],
              collection: {
                name: openseaAsset.collection.name,
                icon_url: openseaAsset.collection.image_url,
              },
            };
          }),
        );
      });
  }, [address]);

  return { assets };
};
