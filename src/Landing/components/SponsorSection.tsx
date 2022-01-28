import React, { useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

import { useImmutableX } from '@/hooks/useImmutableX';
import { ETHTokenType } from '@imtbl/imx-sdk';

export const SponsorSection = () => {
  const { link } = useImmutableX('ropsten');
  const onClickDonate = useCallback(async () => {
    try {
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
    <Section>
      <AvatarBorders>
        <AvatarContainer>
          <Avatar src={AVATAR_URL} />
        </AvatarContainer>
      </AvatarBorders>
      <AvatarInformation>
        <AvatarName>Built by @Juno</AvatarName>
        <AvatarDescription>Software Enginner</AvatarDescription>

        <DonateButtonContainer>
          <DonateButton onClick={onClickDonate}>
            <SnakeBorder />
            <SnakeBorder />
            <SnakeBorder />
            <SnakeBorder />
            <DonateButtonTitle>Sponsor 0.1</DonateButtonTitle>
            <EthereumLogo />
          </DonateButton>
        </DonateButtonContainer>
      </AvatarInformation>
    </Section>
  );
};

const Section = styled.section`
  padding: 150px 0 200px;
  display: flex;
  justify-content: center;
`;

const AvatarBorders = styled.div`
  background-image: radial-gradient(
    101.5% 101.5% at 91.75% 11%,
    #5dc1d9 0%,
    #5fc4db 60.42%,
    #4ca4bc 100%
  );

  display: flex;
  justify-content: center;
  align-items: center;

  clip-path: polygon(
    10% 0%,
    100% 0,
    100% 0,
    100% 90%,
    90% 100%,
    0 100%,
    0 100%,
    0% 10%
  );
`;

const AvatarContainer = styled.div`
  margin: 4px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  clip-path: polygon(
    10% 0%,
    100% 0,
    100% 0,
    100% 90%,
    90% 100%,
    0 100%,
    0 100%,
    0% 10%
  );

  /* filter: drop-shadow(0px 12px 24px rgba(46, 160, 181, 0.6)); */
`;

const AVATAR_URL =
  'https://lh3.googleusercontent.com/1fQX9jABcIpiU7zjkuIv0H6XmkRZiIlFIQK_7YEzsx8L5Xw2yb0dWXUrtXfQvDuhPG1YRt2BywbstBugUUL7cZgYHg-Xb0XAcVai=w600';
const Avatar = styled.img.attrs({
  src: AVATAR_URL,
})`
  width: 186px;
  height: 186px;
  border-radius: 0;
  clip-path: polygon(
    10% 0%,
    100% 0,
    100% 0,
    100% 90%,
    90% 100%,
    0 100%,
    0 100%,
    0% 10%
  );
`;

const AvatarInformation = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 24px;
`;
const AvatarName = styled.span`
  font-size: 1.45rem;
  font-family: 'Russo One', sans-serif;
  color: white;
  text-shadow: 0 4px 12px rgba(28, 71, 77, 0.85);
  text-align: center;
`;
const AvatarDescription = styled.span`
  color: rgba(255, 255, 255, 0.9);
`;

const DonateButtonContainer = styled.div`
  margin-top: auto;
  width: fit-content;

  position: relative;
  overflow: hidden;
`;
const DonateButton = styled.button`
  padding: 8px 12px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  background-color: black;

  box-shadow: 0 20px 50px rgba(255, 255, 255, 0.05);
  overflow: hidden;

  &:before {
    position: absolute;
    top: 2px;
    left: 2px;
    bottom: 2px;
    content: '';
    width: 50%;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const SnakeBorder1 = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;
const SnakeBorder2 = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;
const SnakeBorder3 = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;
const SnakeBorder4 = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const SnakeBorder = styled.span`
  position: absolute;

  &:nth-child(1) {
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #0c002b, #24d1e9);
    animation: ${SnakeBorder1} 2s linear infinite;
  }

  position: absolute;

  &:nth-child(2) {
    top: 0;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(to bottom, #0c002b, #24d1e9);
    animation: ${SnakeBorder2} 2s linear infinite;
    animation-delay: 1s;
  }

  position: absolute;

  &:nth-child(3) {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to left, #0c002b, #24d1e9);
    animation: ${SnakeBorder3} 2s linear infinite;
  }

  position: absolute;

  &:nth-child(4) {
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(to top, #0c002b, #24d1e9);
    animation: ${SnakeBorder4} 2s linear infinite;
    animation-delay: 1s;
  }
`;
const DonateButtonTitle = styled.span`
  cursor: pointer;

  font-size: 1.05rem;
  font-family: 'Russo One', sans-serif;
  text-shadow: 0 4px 12px rgba(28, 71, 77, 0.85);
  text-align: center;
  color: white;
`;
const EthereumLogo = styled.img.attrs({
  src: '/images/ethereum.png',
})`
  margin-left: 12px;
  width: 32px;
  height: 32px;
`;
