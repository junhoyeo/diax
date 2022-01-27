import { ethers } from 'ethers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';

import { Tab } from '@/components/Tab';
import { useImmutableX } from '@/hooks/useImmutableX';
import { useImmutableXAssets } from '@/hooks/useImmutableXAssets';
import { useImmutableXBalances } from '@/hooks/useImmutableXBalances';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useOpenSeaAssets } from '@/hooks/useOpenSeaAssets';
import { NetworkAtom } from '@/state/Network';
import { shortenAddress } from '@/utils/shortenAddress';
import { ETHTokenType } from '@imtbl/imx-sdk';

const DEFAULT_IMAGE = '/images/empty-asset.png';

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-mainnet.alchemyapi.io/v2/S1LUkRnEm4yXq8ofnYa9yrLgr1PoglsV',
);

const LandingPage = () => {
  const router = useRouter();
  const [network, setNetwork] = useRecoilState(NetworkAtom);

  const { client, link } = useImmutableX(network);

  const [address, setAddress] = useLocalStorage<string>('@wallet_address', '');
  const [ensDomain, setEnsDomain] = useLocalStorage<string>('@ens', '');
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let address = '';
    if (router.query.address) {
      address = router.query.address as string;
      setAddress(address);
    }
    if (address) {
      provider.lookupAddress(address).then(setEnsDomain);
    }
  }, [router, setAddress, setEnsDomain]);

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

  const { assets: immutableXAssets } = useImmutableXAssets({ client, address });
  const { assets: openSeaAssets } = useOpenSeaAssets({ address });
  const assets = useMemo(() => {
    if (network === 'mainnet') {
      return [
        ...immutableXAssets.map((v) => ({ ...v, type: 'l2' })),
        ...openSeaAssets.map((v) => ({ ...v, type: 'l1' })),
      ];
    }
    return immutableXAssets.map((v) => ({ ...v, type: 'l2' }));
  }, [network, immutableXAssets, openSeaAssets]);

  return (
    <Wrapper>
      <Container>
        {!address ? (
          <PrimaryButton onClick={onClickSetupIMX}>Setup IMX</PrimaryButton>
        ) : null}
        <Tab
          selected={network}
          onChange={(value) => {
            setNetwork(value);
          }}
          tabs={[
            { type: 'mainnet', title: 'Mainnet' },
            { type: 'ropsten', title: 'Ropsten (Testnet)' },
          ]}
        />
        <EnsDomain>{ensDomain}</EnsDomain>
        <EthereumAddress>{shortenAddress(address)}</EthereumAddress>
        <span>STARK PUBLIC KEY: {starkPublicKey}</span>
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
              <Link
                href={`/detail/${asset.type}/${asset.token_address}/${asset.token_id}`}
              >
                <a>
                  <ListItemImage src={asset.image_url ?? DEFAULT_IMAGE} />
                </a>
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>
    </Wrapper>
  );
};

export default LandingPage;

const Wrapper = styled.div`
  padding: 80px 20px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 1240px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const backgroundWarpKeyframes = keyframes`
  0% {
    background-position: 0% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;
const EnsDomain = styled.h1`
  margin: 0;
  font-size: 3.1rem;
  width: fit-content;
  background: linear-gradient(
    to right,
    #48eaff,
    #75acff,
    #62efff,
    #36c4d6,
    #75acff,
    #23e5ff,
    #32aff2,
    #5b95ff,
    #32e5f2,
    #3bd1ff,
    #48eaff
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  background-size: 200%;
  animation: ${backgroundWarpKeyframes} 4s ease infinite;
`;
const EthereumAddress = styled.h2`
  margin: 0;
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
