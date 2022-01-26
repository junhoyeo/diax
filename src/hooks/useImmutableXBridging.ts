import { useCallback, useEffect, useState } from 'react';

import {
  ERC721TokenType, ImmutableMethodResults, ImmutableRollupStatus, ImmutableXClient, Link
} from '@imtbl/imx-sdk';

type UseBridgingOptions = {
  client: ImmutableXClient;
  link: Link;
  address: string;
};

type TokenInformation = {
  tokenId: string;
  tokenAddress: string;
};

export const useImmutableXBridging = ({
  client,
  link,
  address,
}: UseBridgingOptions) => {
  const [preparingWithdrawals, setPreparingWithdrawals] =
    useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);
  const [readyWithdrawals, setReadyWithdrawals] =
    useState<ImmutableMethodResults.ImmutableGetWithdrawalsResult>(Object);

  useEffect(() => {
    if (!address || !client) {
      return;
    }

    // included in batch awaiting confirmation
    client
      .getWithdrawals({
        user: address,
        rollup_status: ImmutableRollupStatus.included,
      })
      .then(setPreparingWithdrawals);

    // confirmed on-chain in a batch and ready to be withdrawn
    client
      .getWithdrawals({
        user: address,
        rollup_status: ImmutableRollupStatus.confirmed,
        withdrawn_to_wallet: false,
      })
      .then(setReadyWithdrawals);
  }, [client, address]);

  // L1 -> L2
  const deposit = useCallback(
    (token: TokenInformation) =>
      link.deposit({
        type: ERC721TokenType.ERC721,
        ...token,
      }),
    [link],
  );

  // L2 -> L1(1/2)
  const prepareWithdrawal = useCallback(
    (token: TokenInformation) =>
      link.prepareWithdrawal({
        type: ERC721TokenType.ERC721,
        ...token,
      }),
    [link],
  );

  // L2 -> L1(2/2)
  const completeWithdrawal = useCallback(
    (token: TokenInformation) =>
      link.completeWithdrawal({
        type: ERC721TokenType.ERC721,
        ...token,
      }),
    [link],
  );

  return {
    preparingWithdrawals,
    readyWithdrawals,
    deposit,
    prepareWithdrawal,
    completeWithdrawal,
  };
};
