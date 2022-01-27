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
`;
const ImageContainer = styled.div`
  height: 108px;

  display: flex;
`;
const Image = styled.img`
  height: 108px;
`;
const Title = styled.span`
  margin-top: 24px;

  font-size: 1.85rem;
  font-family: 'Russo One', sans-serif;
  color: white;
  text-shadow: 0 4px 12px rgba(28, 71, 77, 0.85);
`;
const Description = styled.span`
  margin-top: 8px;
  color: white;
  font-size: 1.15rem;
`;
