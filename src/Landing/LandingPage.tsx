import { ethers } from 'ethers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Tab } from '@/components/Tab';
import { Environment, useImmutableX } from '@/hooks/useImmutableX';
import { useImmutableXAssets } from '@/hooks/useImmutableXAssets';
import { useImmutableXBalances } from '@/hooks/useImmutableXBalances';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { shortenAddress } from '@/utils/shortenAddress';
import { ETHTokenType } from '@imtbl/imx-sdk';

const LandingPage = () => {
  const router = useRouter();
  const [environment, setEnvironment] = useLocalStorage<Environment>(
    '@environment',
    'mainnet',
  );
  const { client, link } = useImmutableX(environment);

  const [address, setAddress] = useLocalStorage<string>('@wallet_address', '');
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (router.query.address) {
      setAddress(router.query.address as string);
    }
  }, [router, setAddress]);

  const [starkPublicKey, setStarkPublicKey] = useLocalStorage<string>(
    '@stark_public_key',
    '',
  );
  const {
    balances,
    setBalances,
    refetch: refetchBalances,
  } = useImmutableXBalances({ client, address });

  const onClickSetupIMX = useCallback(async () => {
    if (!link) {
      return;
    }
    try {
      const { address, starkPublicKey } = await link.setup({});
      setAddress(address);
      setStarkPublicKey(starkPublicKey);
      refetchBalances();
    } catch (error) {
      console.error(error);
    }
  }, [link, setAddress, setStarkPublicKey, refetchBalances]);

  const onClickDisconnectIMX = useCallback(async () => {
    setAddress('');
    setStarkPublicKey('');
  }, [setAddress, setStarkPublicKey]);

  const { assets } = useImmutableXAssets({ client, address });

  const [amount, setAmount] = useState<string>('0');

  const onClickDeposit = useCallback(async () => {
    if (!link) {
      return;
    }
    const isValidAmount = parseFloat(amount) > 0;
    if (!isValidAmount) {
      return;
    }
    link.deposit({
      type: ETHTokenType.ETH,
      amount,
    });
  }, [link, amount]);

  return (
    <Container>
      {!address ? (
        <PrimaryButton onClick={onClickSetupIMX}>Setup IMX</PrimaryButton>
      ) : null}
      <br />
      <Tab
        selected={environment}
        onChange={(value) => {
          setEnvironment(value);
          setAddress('');
          setBalances([]);
        }}
        tabs={[
          { type: 'mainnet', title: 'Mainnet' },
          { type: 'ropsten', title: 'Ropsten (Testnet)' },
        ]}
      />
      <br />
      <h1>{shortenAddress(address)}</h1>
      <br />
      <span>STARK PUBLIC KEY: {starkPublicKey}</span>
      <br />
      {balances.map((balance, index) => (
        <ul key={index}>
          <li>
            {balance.symbol.toUpperCase()}:{' '}
            {balance ? ethers.utils.formatEther(balance.balance) : '-'}
          </li>
          <li>
            Preparing withdrawal:{' '}
            {balance
              ? ethers.utils.formatEther(balance.preparingWithdrawal)
              : '-'}
          </li>
          <li>
            Withdrawal:{' '}
            {balance ? ethers.utils.formatEther(balance.withdrawable) : '-'}
          </li>
        </ul>
      ))}
      <List>
        {assets.map((asset) => (
          <ListItem key={`${asset.token_address}-${asset.token_id}`}>
            <Link href={`/detail/${asset.token_address}/${asset.token_id}`}>
              <a>
                <ListItemImage src={asset.image_url} />
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default LandingPage;

const Container = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const PrimaryButton = styled.button`
  width: fit-content;
  padding: 12px 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #17aabf;
  border-radius: 10px;
  background-color: #1dc1d8;

  font-weight: bold;
  font-size: 1.65rem;
  color: white;
  line-height: 120%;
`;
const SecondaryButton = styled(PrimaryButton)`
  border: 3px solid #24d1e9;
  border-radius: 10px;
  background-color: transparent;
  color: #24d1e9;
`;

const List = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(5, 256px);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
`;
const ListItem = styled.li`
  width: 100%;

  & > a {
    display: flex;
    color: unset;
  }

  & > pre {
    margin: 0;
    margin-left: 16px;
    flex: 1;
    display: flex;
    word-break: keep-all;
    font-size: 0.8rem;
  }
`;
const ListItemImage = styled.img`
  width: 256px;
  height: 256px;
  border-radius: 10px;
  background-color: #191e2b;
`;
