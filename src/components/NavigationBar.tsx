import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { useImmutableX } from '@/hooks/useImmutableX';
import { AccountAtom } from '@/state/Account';
import { NetworkAtom } from '@/state/Network';
import { shortenAddress } from '@/utils/shortenAddress';

import { SnakeButton } from './SnakeButton';

export const NavigationBar = () => {
  const router = useRouter();
  const [network, setNetwork] = useRecoilState(NetworkAtom);
  const [account, setAccount] = useRecoilState(AccountAtom);

  const { link } = useImmutableX(network);
  const onClickConnectWallet = useCallback(async () => {
    try {
      const _account = await link.setup({});
      setAccount(_account);
    } catch (e) {
      // TODO: handle error
      console.error(e);
    }
  }, [link, setAccount]);

  return (
    <Wrapper>
      <Container>
        {/* TODO: TBD */}
        <div />

        <Information>
          <SwitchNetwork
            onClick={() =>
              setNetwork(network === 'ropsten' ? 'mainnet' : 'ropsten')
            }
          >
            {network}
          </SwitchNetwork>
          {!account && (
            <SnakeButton onClick={onClickConnectWallet}>
              Connect Wallet
            </SnakeButton>
          )}
          {!!account && (
            <SnakeButton onClick={() => router.push(`/${account.address}`)}>
              {shortenAddress(account.address)}
            </SnakeButton>
          )}
        </Information>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 56px;
  height: 64px;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-image: linear-gradient(
    rgb(15, 15, 15) 0%,
    rgba(15, 15, 15, 0) 100%
  );

  @media screen and (max-width: 768px) {
    padding: 0 36px;
  }

  @media screen and (max-width: 540px) {
    padding: 0 20px;
  }
`;
const Container = styled.div`
  max-width: 1280px;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SwitchNetwork = styled.button`
  min-width: 98px;
  margin-right: 12px;
  padding: 8px 12px;

  font-size: 1.05rem;
  font-family: 'Russo One', sans-serif;
  box-shadow: 0 0 10px rgba(36, 210, 233, 0.1), 0 0 24px rgba(36, 210, 233, 0.1),
    0 0 48px rgba(36, 210, 233, 0.1);
  background: linear-gradient(to right, #0c002b, #226f91);
  color: white;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(36, 210, 233, 0.2),
      0 0 24px rgba(36, 210, 233, 0.2), 0 0 48px rgba(36, 210, 233, 0.2);
    transform: scale(1.08);
    color: rgba(255, 255, 255, 0.85);
  }
`;

const Information = styled.div`
  display: flex;
`;
