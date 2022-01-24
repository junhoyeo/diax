import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { Environment, useImmutableX } from '@/hooks/useImmutableX';
import { useImmutableXAssetDetail } from '@/hooks/useImmutableXAssetDetail';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const DetailPage = () => {
  const router = useRouter();
  const [environment, setEnvironment] = useLocalStorage<Environment>(
    '@environment',
    'mainnet',
  );
  const { client } = useImmutableX(environment);

  const { asset, mints, transfers } = useImmutableXAssetDetail({
    client,
    tokenAddress: router.query.token_address as string,
    tokenId: router.query.token_id as string,
  });

  if (!asset) {
    return null;
  }

  return (
    <Container>
      <h2>Asset</h2>
      <ListItem key={asset.uri}>
        <ListItemImage src={asset.image_url} />
        <pre>
          <code>{JSON.stringify(asset, null, 2)}</code>
        </pre>
      </ListItem>
      <h2>Links</h2>
      <ul>
        <li>
          <a
            href={`https://immutascan.io/address/${asset.token_address}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'unset' }}
          >
            ImmutaScan
          </a>
        </li>
        <li>
          <a
            href={`https://market.x.immutable.com/assets?collection=${asset.token_address}&sort[order_by]=buy_quantity&sort[direction]=asc`}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'unset' }}
          >
            Immutable Market
          </a>
        </li>
      </ul>
      <h2>Mints</h2>
      <pre>
        <code>{JSON.stringify(mints, null, 2)}</code>
      </pre>
      <h2>Transfers</h2>
      <pre>
        <code>{JSON.stringify(transfers, null, 2)}</code>
      </pre>
    </Container>
  );
};

export default DetailPage;

const Container = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const ListItem = styled.li`
  width: 100%;
  display: flex;

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
`;
