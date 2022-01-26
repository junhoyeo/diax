import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Network } from '@/state/Network';
import { ImmutableMethodResults, ImmutableXClient } from '@imtbl/imx-sdk';

import { ENDPOINTS } from './useImmutableX';

type UseAssetsParams = {
  network: Network;
  client: ImmutableXClient | null;
  tokenId: string;
  tokenAddress: string;
};

export type ImmutableXAsset = ImmutableMethodResults.ImmutableAsset;

export const useImmutableXAssetDetail = ({
  network,
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

  const API_ENDPOINT = useMemo(() => {
    return ENDPOINTS[network].PUBLIC_API;
  }, [network]);

  useEffect(() => {
    if (!client || !tokenId || !tokenAddress || isFetchedRef.current) {
      return;
    }
    axios
      .get(`${API_ENDPOINT}/assets/${tokenAddress}/${tokenId}`)
      .then(({ data }) => {
        isFetchedRef.current = true;
        setAsset(data);
      });
  }, [client, tokenId, tokenAddress, API_ENDPOINT]);

  useEffect(() => {
    if (!client || !tokenId || !tokenAddress || isFetchedMintsRef.current) {
      return;
    }
    axios
      .get(
        `${API_ENDPOINT}/mints?token_address=${tokenAddress}&token_id=${tokenId}`,
      )
      .then(({ data }) => {
        isFetchedMintsRef.current = true;
        setMints(data.result);
      });
  }, [client, tokenId, tokenAddress, API_ENDPOINT]);

  useEffect(() => {
    if (!client || !tokenId || !tokenAddress || isFetchedTransfersRef.current) {
      return;
    }
    axios
      .get(
        `${API_ENDPOINT}/transfers?token_address=${tokenAddress}&token_id=${tokenId}`,
      )
      .then(({ data }) => {
        isFetchedTransfersRef.current = true;
        setTransfers(data.result);
      });
  }, [client, tokenId, tokenAddress, API_ENDPOINT]);

  return { asset, mints, transfers };
};
