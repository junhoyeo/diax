import React from 'react';
import styled from 'styled-components';

type FeatureItemProps = {
  title: string;
  src: string;
  children: React.ReactNode;
};
export const FeatureItem: React.FC<FeatureItemProps> = ({
  title,
  src,
  children,
}) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={src} alt={title} />
      </ImageContainer>
      <Title>{title}</Title>
      <Description>{children}</Description>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  padding: 86px 0 48px;

  @media screen and (max-width: 940px) {
    padding: 48px 0 24px;

    &:first-of-type {
      padding-top: 86px;
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;

  &,
  & > img {
    height: 108px;

    @media screen and (max-width: 1340px) {
      height: 90px;
    }

    @media screen and (max-width: 940px) {
      height: 128px;
    }

    @media screen and (max-width: 475px) {
      height: 90px;
    }
  }
`;
const Image = styled.img``;

const Title = styled.span`
  margin-top: 24px;

  font-size: 1.85rem;
  font-family: 'Russo One', sans-serif;
  color: white;
  text-shadow: 0 4px 12px rgba(28, 71, 77, 0.85);
  text-align: center;
`;
const Description = styled.span`
  margin-top: 8px;

  color: white;
  font-size: 1.15rem;
  text-align: center;

  @media screen and (max-width: 1340px) {
    max-width: 240px;
  }
`;
