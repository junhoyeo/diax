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

  const isFetchedRef = useRef<boolean>(false);
  const [currentCursor, setCurrentCursor] = useState<string | undefined>(
    undefined,
  );
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!client || !address || isFetchedRef.current) {
      return;
    }
    client
      .getAssets({
        user: address,
        cursor: currentCursor,
      })
      .then((data) => {
        isFetchedRef.current = true;
        setAssets((prev) => [...prev, ...data.result]);
        setTotal(data.remaining + data.result.length);
        if (data.cursor) {
          setNextCursor(data.cursor);
        }
      });
  }, [client, address, currentCursor]);

  const fetchMore = useCallback(() => {
    setCurrentCursor(nextCursor);
    setNextCursor(undefined);
  }, [nextCursor]);

  return { assets, total, currentCursor, nextCursor, fetchMore };
};
