import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ImmutableMethodResults, ImmutableXClient } from '@imtbl/imx-sdk';

type UseAssetsParams = {
  client: ImmutableXClient | null;
  tokenId: string;
  tokenAddress: string;
};

export type ImmutableXAsset = ImmutableMethodResults.ImmutableAsset;

export const useImmutableXAssetDetail = ({
  client,
  tokenId,
  tokenAddress,
}: UseAssetsParams) => {
  const [asset, setAsset] = useState<ImmutableXAsset | null>(null);
  const [mints, setMints] = useState<
    ImmutableMethodResults.ImmutableOffchainMintResults[]
  >([]);
  const [transfers, setTransfers] = useState<
    ImmutableMethodResults.ImmutableTransferResult[]
  >([]);

  const isFetchedRef = useRef<boolean>(false);
  const isFetchedMintsRef = useRef<boolean>(false);
  const isFetchedTransfersRef = useRef<boolean>(false);

  useEffect(() => {
    if (!client || !tokenId || !tokenAddress || isFetchedRef.current) {
      return;
    }
    axios
      .get(`https://api.x.immutable.com/v1/assets/${tokenAddress}/${tokenId}`)
      .then(({ data }) => {
        isFetchedRef.current = true;
        setAsset(data);
      });
  }, [client, tokenId, tokenAddress]);

  useEffect(() => {
    if (!client || !tokenId || !tokenAddress || isFetchedMintsRef.current) {
      return;
    }
    axios
      .get(
        `https://api.x.immutable.com/v1/mints?token_address=${tokenAddress}&token_id=${tokenId}`,
      )
      .then(({ data }) => {
        isFetchedMintsRef.current = true;
        setMints(data.result);
      });
  }, [client, tokenId, tokenAddress]);

  useEffect(() => {
    if (!client || !tokenId || !tokenAddress || isFetchedTransfersRef.current) {
      return;
    }
    axios
      .get(
        `https://api.x.immutable.com/v1/transfers?token_address=${tokenAddress}&token_id=${tokenId}`,
      )
      .then(({ data }) => {
        isFetchedTransfersRef.current = true;
        setTransfers(data.result);
      });
  }, [client, tokenId, tokenAddress]);

  return { asset, mints, transfers };
};
