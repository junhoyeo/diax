import { useCallback, useEffect, useRef, useState } from 'react';

import { ImmutableMethodResults, ImmutableXClient } from '@imtbl/imx-sdk';

type UseAssetsParams = {
  client: ImmutableXClient | null;
  address: string;
};

export type ImmutableXAsset = ImmutableMethodResults.ImmutableAsset;

export const useImmutableXAssets = ({ client, address }: UseAssetsParams) => {
  const [assets, setAssets] = useState<ImmutableXAsset[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (!client || !address) {
      return;
    }

    const fetchAssets = async () => {
      let cursor: string | null | '' = '';
      while (cursor !== null) {
        await client
          .getAssets({
            user: address,
            cursor,
          })
          .then((data) => {
            setAssets((v) => [...v, ...data.result]);
            setTotal(data.remaining + data.result.length);
            if (data.remaining) {
              cursor = data.cursor;
            } else {
              cursor = null;
            }
          });
      }
    };

    fetchAssets();
  }, [client, address]);

  // TODO: implement pagination
  return { assets, total };
};
