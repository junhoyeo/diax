import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Network, NetworkAtom } from '@/state/Network';
import { ImmutableMethodResults, ImmutableXClient } from '@imtbl/imx-sdk';

type UseAssetsParams = {
  client: ImmutableXClient | null;
  address: string;
};

export type ImmutableXAsset = ImmutableMethodResults.ImmutableAsset;

export const useImmutableXAssets = ({ client, address }: UseAssetsParams) => {
  const [assets, setAssets] = useState<ImmutableXAsset[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [cursor, setCursor] = useState<string | null>(null);

  useEffect(() => {
    setAssets([]);
    setTotal(0);
    setCursor(null);
  }, [client]);

  useEffect(() => {
    if (!client || !address) {
      return;
    }

    const fetchAssets = async () => {
      const cursor = '';
      await client
        .getAssets({
          user: address,
          cursor,
        })
        .then((data) => {
          console.log(data.result.length);
          setAssets((v) => [...v, ...data.result]);
          setTotal(data.remaining + data.result.length);
          setCursor(!!data.remaining ? data.cursor : null);
        })
        .catch(console.error);
    };

    fetchAssets();
  }, [client, address]);

  const next = useCallback(async () => {
    await client
      .getAssets({
        user: address,
        cursor,
      })
      .then((data) => {
        setAssets((v) => [...v, ...data.result]);
        setTotal(data.remaining + data.result.length);
        setCursor(!!data.remaining ? data.cursor : null);
      })
      .catch(console.error);
  }, [address, client, cursor]);

  const uniqueAssets = useMemo(() => Array.from(new Set(assets)), [assets]);
  console.log(_.groupBy(assets, (v) => v.status));

  // TODO: implement pagination
  return {
    assets: uniqueAssets,
    total,
    cursor,
    next,
  };
};
