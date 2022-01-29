import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { NetworkAtom } from '@/state/Network';

export const NavigationBar = () => {
  const [network, setNetwork] = useRecoilState(NetworkAtom);

  return (
    <Wrapper>
      <Container>
        {/* TODO: TBD */}
        <div />

        <SwitchNetwork
          onClick={() =>
            setNetwork(network === 'ropsten' ? 'mainnet' : 'ropsten')
          }
        >
          {network}
        </SwitchNetwork>
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
  padding: 8px 20px;
  color: white;
`;
