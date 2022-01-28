import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useImmutableX } from '@/hooks/useImmutableX';
import { ETHTokenType } from '@imtbl/imx-sdk';

import { FeatureItem } from './components/FeatureItem';
import { HeaderSection } from './components/HeaderSection';
import { SponsorSection } from './components/SponsorSection';

const LandingPage = () => {
  const router = useRouter();

  const { client, link } = useImmutableX('ropsten');
  const onClickDonate = useCallback(async () => {
    try {
      await link.setup({});

      const result = await link.transfer([
        {
          type: ETHTokenType.ETH,
          amount: '0.1',
          toAddress: '0x4a003f0a2c52e37138eb646aB4E669C4A84C1001',
        },
      ]);
      console.log({ result, hey: 'thanks' });
    } catch (err) {
      console.log(err);
    }
  }, [link]);

  return (
    <Wrapper>
      <HeaderSection />
      <ParallaxContainer>
        <Container>
          <FeatureList>
            <FeatureItem title="Transfer" src="/images/feature-transfer.png">
              Send ETH/ERC20/ERC721 Tokens anywhere in L2
            </FeatureItem>
            <FeatureItem title="Bridge" src="/images/feature-bridge.png">
              {`Interface to deposit & withdraw L1/L2 assets`}
            </FeatureItem>
            <FeatureItem title="Inventory" src="/images/feature-inventory.png">
              Mainnet/Ropsten Inventory with Asset History
            </FeatureItem>
          </FeatureList>

          <SponsorSection />
        </Container>
      </ParallaxContainer>
    </Wrapper>
  );
};

export default LandingPage;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  display: flex;
  flex-direction: column;

  position: relative;
`;

const ParallaxContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(18px);
  border-top: 2px solid #24d1e9;
  box-shadow: 0 -2px 16px rgba(36, 210, 233, 0.45);

  display: flex;
  justify-content: center;
  z-index: 0;

  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    width: 100%;
    height: 300px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
  }
`;
const Container = styled.div`
  max-width: 1280px;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const FeatureList = styled.ul`
  margin: 0;
  padding: 0;
  padding: 0 20px;
  list-style-type: none;

  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 940px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;
