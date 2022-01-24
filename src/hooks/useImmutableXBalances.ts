import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import { ImmutableXClient } from '@imtbl/imx-sdk';

type UseBalanceParams = {
  client: ImmutableXClient | null;
  address: string;
};

type ImmutableXBalance = {
  symbol: 'ETH' | 'IMX';
  balance: ethers.BigNumber;
  preparingWithdrawal: ethers.BigNumber;
  withdrawable: ethers.BigNumber;
};

export const useImmutableXBalances = ({
  client,
  address,
}: UseBalanceParams) => {
  const [balances, setBalances] = useState<ImmutableXBalance[]>([]);
  const [fetchCount, setFetchCount] = useState<number>(1);

  useEffect(() => {
    if (!client || !address || !fetchCount) {
      return;
    }
    client
      .listBalances({
        user: address as any, // unbranding from `EthAddressBrand`
      })
      .then(({ result }) => {
        const balances = result.map((data) => ({
          symbol: data.symbol as 'ETH' | 'IMX',
          balance: data.balance,
          preparingWithdrawal: data.preparing_withdrawal,
          withdrawable: data.withdrawable,
        }));
        setBalances(balances);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [client, address, fetchCount]);

  const refetch = useCallback(() => {
    setFetchCount((count) => count + 1);
  }, []);

  return { balances, setBalances, refetch };
};
