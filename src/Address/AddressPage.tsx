import axios from 'axios';
import { ethers } from 'ethers';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';

import { Tab } from '@/components/Tab';
import { useImmutableX } from '@/hooks/useImmutableX';
import { useImmutableXAssets } from '@/hooks/useImmutableXAssets';
import { useImmutableXBalances } from '@/hooks/useImmutableXBalances';
import { NetworkAtom } from '@/state/Network';
import { shortenAddress } from '@/utils/shortenAddress';

import { CollectionItem } from './components/CollectionItem';

const DEFAULT_IMAGE = '/images/empty-asset.png';

type Props = {
  address: string;
};
type Params = {
  address: string;
  domain: string;
};
export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  let address = params.address as string;
  try {
    const { data } = await axios.get(`https://diax.app/api/ens/${address}`);
    return { props: { ...data } };
  } catch (e) {
    return { notFound: true };
  }
};

export default function AddressPage({ address, domain }: Params) {
  const [network, setNetwork] = useRecoilState(NetworkAtom);

  const { client } = useImmutableX(network);

  const {
    balances,
    setBalances,
    refetch: refetchBalances,
  } = useImmutableXBalances({ client, address });

  const { assets: immutableXAssets } = useImmutableXAssets({ client, address });
  const [selectedCollection, setSelectedCollection] = useState<string>('');

  const assets = useMemo(
    () => immutableXAssets.map((v) => ({ ...v, type: 'l2' })),
    [immutableXAssets],
  );
  const filteredAssets = useMemo(() => {
    if (!selectedCollection) {
      return assets;
    }
    return assets.filter(
      (asset) => asset.collection.name === selectedCollection,
    );
  }, [assets, selectedCollection]);

  const collections = useMemo(() => {
    return immutableXAssets.reduce((acc, curr) => {
      if (!acc.find((v) => curr.collection.name === v.name)) {
        return [...acc, curr.collection];
      }
      return acc;
    }, []);
  }, [immutableXAssets]);

  return (
    <Wrapper>
      <Container>
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
        <PrimaryName>{domain ?? shortenAddress(address)}</PrimaryName>
        {!!domain && <SecondaryName>{shortenAddress(address)}</SecondaryName>}

        <BalanceList>
          {balances.map((balance, index) => (
            <BalanceListItem key={index}>
              <BalanceContainer>
                <BalanceIcon
                  alt={balance.symbol}
                  src={
                    balance.symbol === 'ETH'
                      ? '/images/ethereum.png'
                      : '/images/imx.png'
                  }
                />
                <BalanceTokenInformation>
                  <BalanceName>
                    {balance.symbol === 'ETH' ? 'Ethereum' : 'IMX Token'}
                  </BalanceName>
                  <BalanceAmount>
                    {balance ? ethers.utils.formatEther(balance.balance) : '-'}{' '}
                    <BalanceSymbol>{balance.symbol}</BalanceSymbol>
                  </BalanceAmount>
                </BalanceTokenInformation>
              </BalanceContainer>
              <BalanceMemo>
                Preparing withdrawal:{' '}
                {balance
                  ? ethers.utils.formatEther(balance.preparingWithdrawal)
                  : '-'}
                {' / '}
                Withdrawal:{' '}
                {balance ? ethers.utils.formatEther(balance.withdrawable) : '-'}
              </BalanceMemo>
            </BalanceListItem>
          ))}
        </BalanceList>

        <AssetSection>
          <CollectionList>
            {collections.map((collection) => (
              <CollectionItem
                key={collection.name}
                {...collection}
                selected={selectedCollection === collection.name}
                onClick={() => {
                  if (selectedCollection === collection.name) {
                    setSelectedCollection('');
                  } else {
                    setSelectedCollection(collection.name);
                  }
                }}
              />
            ))}
          </CollectionList>

          <Grid>
            {filteredAssets.map((asset) => (
              <GridItem key={`${asset.token_address}-${asset.token_id}`}>
                <Link href={`/detail/${asset.token_address}/${asset.token_id}`}>
                  <a>
                    <GridItemImage src={asset.image_url ?? DEFAULT_IMAGE} />
                  </a>
                </Link>
              </GridItem>
            ))}
          </Grid>
        </AssetSection>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 80px 20px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
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
const PrimaryName = styled.h1`
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
const SecondaryName = styled.h2`
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

const BalanceList = styled.ul`
  margin: 0;
  padding: 0;
  margin: 16px 0;
  list-style-type: none;
  width: 100%;
  max-width: 320px;
`;
const BalanceListItem = styled.li`
  padding: 16px 0;
  width: 100%;

  display: flex;
  flex-direction: column;
`;
const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
`;
const BalanceIcon = styled.img`
  width: 42px;
  height: 42px;
`;
const BalanceTokenInformation = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;
const BalanceName = styled.span`
  font-weight: bold;
  font-size: 1.25rem;
`;
const BalanceAmount = styled.span`
  font-size: 1.3rem;
`;
const BalanceSymbol = styled.span`
  color: white;
  font-size: 1.1rem;
`;
const BalanceMemo = styled.div`
  font-size: 0.8rem;
  color: #0e5f6c;
  margin-left: ${42 + 8}px;
`;

const AssetSection = styled.section`
  display: flex;
  width: 100%;
`;
const CollectionList = styled.ul`
  margin: 0;
  margin-left: 32px;
  margin-right: 8px;
  padding: 0;
  width: 250px;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Grid = styled.ul`
  flex: 1;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;

  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 256px);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
`;
const GridItem = styled.li`
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
const GridItemImage = styled.img`
  width: 256px;
  height: 256px;
  border-radius: 10px;
  background-color: #191e2b;
  user-select: none;
  -webkit-user-drag: none;
`;
