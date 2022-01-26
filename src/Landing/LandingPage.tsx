import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { useImmutableX } from '@/hooks/useImmutableX';
import { ETHTokenType } from '@imtbl/imx-sdk';

const AVATAR_URL =
  'https://lh3.googleusercontent.com/1fQX9jABcIpiU7zjkuIv0H6XmkRZiIlFIQK_7YEzsx8L5Xw2yb0dWXUrtXfQvDuhPG1YRt2BywbstBugUUL7cZgYHg-Xb0XAcVai=w600';

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
        <HeaderSection>
          <Logo src="/logos/diax.svg" alt="DiaX" />
          <Title>DiaX, Wallet for Immutable X</Title>
          <FieldInputContainer>
            <Field>
              Search with <strong>Ethereum Address</strong> or{' '}
              <strong>ENS</strong>
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
        </HeaderSection>
        <AvatarContainer>
          <Avatar src={AVATAR_URL} />
        </AvatarContainer>
        <AlphaDAOImage src="https://avatars.githubusercontent.com/u/92674615?s=200&v=4" />
        <AvatarName>@Juno</AvatarName>
        <AvatarTitle onClick={onClickDonate}>Donate 0.1Ξ</AvatarTitle>
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
  color: white;
`;

const HeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Logo = styled.img`
  width: 436px;

  @media screen and (max-width: 640px) {
    width: 312px;
  }
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 16px;

  font-weight: normal;
  font-size: 1.25rem;
`;

const FieldInputContainer = styled.div`
  margin-top: 32px;
  width: 100%;
  max-width: 540px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Field = styled.span`
  width: 100%;

  font-size: 1.25rem;
  color: #24d1e9;
`;
const Input = styled.input`
  margin-top: 8px;
  padding: 12px 24px;
  width: 100%;

  border: 3px solid #24d1e9;
  border-radius: 10px;
  background-color: transparent;
  font-size: 1.25rem;
  line-height: 120%;
  color: white;
`;

const AvatarContainer = styled.div`
  margin-top: 64px;
  filter: drop-shadow(0px 12px 24px rgba(46, 160, 181, 0.45));
`;
const Avatar = styled.img`
  width: 156px;
  height: 156px;
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
const AlphaDAOImage = styled.img`
  width: 32px;
  height: 32px;
`;
const AvatarName = styled.span`
  font-weight: bold;
`;
const AvatarTitle = styled.span`
  cursor: pointer;
`;
