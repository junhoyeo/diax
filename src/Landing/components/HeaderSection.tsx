import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

import backgroundImage from '../assets/background.jpg';

export const HeaderSection = () => {
  const router = useRouter();
  const [address, setAddress] = useState<string>('');

  return (
    <React.Fragment>
      <BackgroundImageWrapper>
        <BackgroundImageContainer>
          <BackgroundImage
            src={backgroundImage}
            priority
            placeholder="blur"
            layout="fill"
            objectFit="cover"
          />
        </BackgroundImageContainer>
      </BackgroundImageWrapper>
      <Section id="header">
        <Container>
          <Information>
            <ProductName>DiaX</ProductName>
            <Title>
              Wallet for
              <br />
              Immutable X
            </Title>
            <Description>
              <strong>L1/L2</strong> Bridged wallet for{' '}
              <strong>☠️Developers</strong> and{' '}
              <strong>💎NFT enthusiasts</strong>
            </Description>
          </Information>
          <FieldInputContainer>
            <Field>
              Search with <strong>Ethereum Address</strong>{' '}
              <span>
                or <strong>ENS</strong>
              </span>
            </Field>
            <Input
              placeholder="0x0000...0000"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  router.push(`/${address}`);
                }
              }}
            />
          </FieldInputContainer>

          <AnimatePresence>
            <LogoContainer>
              <Logo src="/images/immutable-x.png" />
            </LogoContainer>
          </AnimatePresence>
        </Container>
      </Section>
    </React.Fragment>
  );
};

const Section = styled.section`
  padding: 80px 56px;

  width: 100%;
  height: 100vh;
  max-height: 1080px;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  z-index: 0;

  @media screen and (max-width: 768px) {
    padding-left: 36px;
    padding-right: 36px;
  }

  @media screen and (max-width: 540px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const BackgroundImageWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;
const BackgroundImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;

    width: 100%;
    height: 600px;
    background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
  }
`;
const BackgroundImage = styled(Image)``;

const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  position: relative;
`;
const Information = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span`
  width: fit-content;
  font-weight: normal;
  font-size: 2.25rem;
  font-family: 'Russo One', sans-serif;

  background: linear-gradient(
    90deg,
    #5fc5ff 0.08%,
    #889dff 17.76%,
    #4c84ff 42.72%,
    #55e0ff 70.28%,
    #4aa2ff 83.8%,
    #373fff 99.93%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const Title = styled.h1`
  margin: 0;
  margin-top: 16px;
  font-size: 4.8rem;
  letter-spacing: -1.1px;
  line-height: 100%;
  font-family: 'Russo One', sans-serif;
  color: white;

  @media screen and (max-width: 768px) {
    font-size: 3.65rem;
  }

  @media screen and (max-width: 440px) {
    font-size: 3.2rem;
  }

  @media screen and (max-width: 400px) {
    font-size: 2.98rem;
  }
`;
const Description = styled.p`
  margin: 0;
  margin-top: 24px;
  font-size: 1.45rem;
  color: rgba(255, 255, 255, 0.8);

  & > strong {
    display: inline-block;
  }
`;

const FieldInputContainer = styled.div`
  margin-top: 32px;
  width: 100%;
  max-width: 540px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 540px) {
    margin-top: 24px;
  }
`;
const Field = styled.span`
  width: 100%;

  font-size: 1.25rem;
  color: #24d1e9;

  & > span {
    display: inline-block;
  }
`;
const Input = styled.input`
  margin-top: 8px;
  padding: 12px 24px;
  width: 100%;

  border: 3px solid #24d1e9;
  border-radius: 10px;

  font-size: 1.25rem;
  line-height: 120%;
  color: white;
  background-color: rgba(17, 19, 28, 0.4);
`;

const LogoContainer = styled(motion.div).attrs({
  initial: { transform: 'rotate(-120deg)' },
  animate: { transform: 'rotate(0deg)' },
  exit: { transform: 'rotate(120deg)' },
  transition: { type: 'easeInOut', delay: 0.2, duration: 1 },
})`
  position: absolute;
  top: 64px;
  right: 0;
  bottom: 0;
  z-index: -1;

  display: flex;
  align-items: center;
  justify-content: center;

  max-height: 640px;

  @media screen and (max-width: 960px) {
    top: unset;
    left: 0;
    bottom: -148px;
  }
`;
const Logo = styled.img`
  width: 448px;
  height: 448px;

  filter: drop-shadow(0px -2px 120px rgba(58, 131, 141, 0.4));

  @media screen and (max-width: 960px) {
    width: 420px;
    height: 420px;
  }
`;
