import styled from '@emotion/styled';
import React from 'react';

import { NavigationBar } from '@/components/NavigationBar';

import { FeatureItem } from './components/FeatureItem';
import { HeaderSection } from './components/HeaderSection';

const LandingPage = () => {
  return (
    <Wrapper>
      <NavigationBar />
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
  overflow: hidden;
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
