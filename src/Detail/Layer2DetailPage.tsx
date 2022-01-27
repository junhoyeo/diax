import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';

import { useImmutableX } from '@/hooks/useImmutableX';
import { useImmutableXAssetDetail } from '@/hooks/useImmutableXAssetDetail';
import { useImmutableXBridging } from '@/hooks/useImmutableXBridging';
import { NetworkAtom } from '@/state/Network';

const DEFAULT_IMAGE = '/images/empty-asset.png';

const Layer2DetailPage = () => {
  const router = useRouter();
  const network = useRecoilValue(NetworkAtom);
  const { client, link } = useImmutableX(network);

  const { deposit, prepareWithdrawal, completeWithdrawal } =
    useImmutableXBridging({
      client,
      link,
      address: '0x4a003f0a2c52e37138eb646aB4E669C4A84C1001',
    });

  const { asset, mints, transfers } = useImmutableXAssetDetail({
    network,
    client,
    tokenAddress: router.query.token_address as string,
    tokenId: router.query.token_id as string,
  });

  const attributes = useMemo(() => {
    if (!asset) {
      return;
    }
    let values: { name: string; value: string }[] = [];
    Object.entries(asset.metadata).forEach(([key, value]) => {
      if (['name', 'image_url', 'description', 'attributes'].includes(key)) {
        return;
      }
      values.push({ name: key, value: JSON.stringify(value) });
    });
    return values;
  }, [asset]);

  if (!asset) {
    return null;
  }

  return (
    <Wrapper>
      <Container>
        <AssetImage src={asset.image_url ?? DEFAULT_IMAGE} />
        <AssetDetailContainer>
          <CollectionRow>
            <CollectionIcon
              alt={asset.collection.name}
              src={
                asset.collection.icon_url.startsWith('http')
                  ? asset.collection.icon_url
                  : DEFAULT_IMAGE
              }
            />
            <CollectionName>{asset.collection.name}</CollectionName>
          </CollectionRow>
          <AssetName>{asset.name ?? 'NAME_IS_EMPTY'}</AssetName>
          <h1>{asset.status}</h1>
          <LinkList>
            <li>
              <a
                href={`https://immutascan.io/address/${asset.token_address}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'unset' }}
              >
                <LinkLogoBadge>
                  <LinkLogo src="/logos/immutascan.png" alt="ImmutaScan" />
                  <span>ImmutaScan</span>
                </LinkLogoBadge>
              </a>
            </li>
            <li>
              <a
                href={`https://market.x.immutable.com/assets?collection=${asset.token_address}&sort[order_by]=buy_quantity&sort[direction]=asc`}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'unset' }}
              >
                <LinkLogoBadge>
                  <LinkLogo src="/logos/imx.svg" alt="Immutable Market" />
                  <span>Immutable Market</span>
                </LinkLogoBadge>
              </a>
            </li>
          </LinkList>

          {asset.status === 'imx' && (
            <PrimaryButton
              onClick={() =>
                prepareWithdrawal({
                  tokenId: asset.token_id,
                  tokenAddress: asset.token_address,
                }).catch(console.log)
              }
            >
              Withdraw
            </PrimaryButton>
          )}
          {asset.status === 'withdrawable' && (
            <PrimaryButton
              onClick={() =>
                completeWithdrawal({
                  tokenId: asset.token_id,
                  tokenAddress: asset.token_address,
                }).catch(console.log)
              }
            >
              Complete Withdraw
            </PrimaryButton>
          )}

          <p>{asset.description}</p>
          {attributes.map((attribute) => (
            <div key={attribute.name}>
              <span>{attribute.name}</span> - <span>{attribute.value}</span>
            </div>
          ))}
          <h2>Mints</h2>
          <pre>
            <code>{JSON.stringify(mints, null, 2)}</code>
          </pre>
          <h2>Transfers</h2>
          <pre>
            <code>{JSON.stringify(transfers, null, 2)}</code>
          </pre>
        </AssetDetailContainer>
      </Container>
    </Wrapper>
  );
};

export default Layer2DetailPage;

const Wrapper = styled.div`
  padding: 80px 20px;

  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  max-width: 1240px;
  display: flex;
  color: white;
`;

const AssetImage = styled.img`
  width: 512px;
  min-width: 512px;
  height: 512px;
  border-radius: 10px;
  background-color: #191e2b;
  border: 4px solid #24d2e9;
`;
const AssetDetailContainer = styled.div`
  margin-left: 32px;
  padding: 24px 0;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const CollectionRow = styled.div`
  display: flex;
  align-items: center;
`;
const CollectionIcon = styled.img`
  margin-right: 8px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid #191e2b;
  box-shadow: 0px 4px 16px rgba(0, 102, 255, 0.24);
`;
const CollectionName = styled.h3`
  margin: 0;
  font-size: 1.08rem;
  line-height: 120%;
`;

const backgroundWarpKeyframes = keyframes`
  0% {
    background-position: 0% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;
const AssetName = styled.h1`
  margin: 0;
  margin-top: 16px;
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

const LinkList = styled.ul`
  margin: 0;
  margin-top: 16px;
  padding: 0;
  list-style-type: none;
  display: flex;
`;
const LinkLogoBadge = styled.div`
  margin-right: 8px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  background-color: #202635;
  border-radius: 36px;

  will-change: transform;
  transition: all 0.125s ease 0s;

  &:hover {
    transform: scale(1.05);
  }

  & > span {
    margin-left: 8px;
    font-size: 1.02rem;
    line-height: 80%;
  }
`;
const LinkLogo = styled.img`
  width: 24px;
  height: 24px;
`;

const PrimaryButton = styled.button`
  margin-top: 16px;
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
