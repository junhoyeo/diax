import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { useImmutableX } from '@/hooks/useImmutableX';
import { ETHTokenType } from '@imtbl/imx-sdk';

const LandingPage = () => {
  const router = useRouter();
  const [address, setAddress] = useState<string>('');

  const { client, link } = useImmutableX('mainnet');
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
      <Container>
        <Logo src="/logos/diax.svg" alt="DiaX" />
        <Title>Wallet for Immutable X</Title>
        <Input
          placeholder="Ethereum Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              router.push(`/${address}`);
            }
          }}
        />

        <Avatar src="https://lh3.googleusercontent.com/1fQX9jABcIpiU7zjkuIv0H6XmkRZiIlFIQK_7YEzsx8L5Xw2yb0dWXUrtXfQvDuhPG1YRt2BywbstBugUUL7cZgYHg-Xb0XAcVai=w600" />
        <AvatarTitle onClick={onClickDonate}>Donate to me</AvatarTitle>
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
const Logo = styled.img`
  width: 436px;

  @media screen and (max-width: 640px) {
    width: 312px;
  }
`;

const Title = styled.h1``;

const Input = styled.input`
  margin-top: 32px;
  width: 100%;
  max-width: 450px;
  border: 3px solid #24d1e9;
  border-radius: 10px;
  background-color: transparent;
  color: #24d1e9;
  padding: 12px 24px;
  font-size: 1.65rem;
  line-height: 120%;
`;

const Avatar = styled.img`
  margin-top: 64px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;
const AvatarTitle = styled.span`
  cursor: pointer;
`;
