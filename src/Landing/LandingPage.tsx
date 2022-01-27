import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useImmutableX } from '@/hooks/useImmutableX';
import { ETHTokenType } from '@imtbl/imx-sdk';

import { HeaderSection } from './HeaderSection';

const AVATAR_URL =
  'https://lh3.googleusercontent.com/1fQX9jABcIpiU7zjkuIv0H6XmkRZiIlFIQK_7YEzsx8L5Xw2yb0dWXUrtXfQvDuhPG1YRt2BywbstBugUUL7cZgYHg-Xb0XAcVai=w600';

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
      <Container>
        <HeaderSection />

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
