import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const DEFAULT_IMAGE = '/images/empty-asset.png';

type SelectedProps = {
  selected?: boolean;
};
type CollectionItemProps = SelectedProps & {
  name: string;
  icon_url: string;
  totalCount: number;
  onClick: () => void;
};

export const CollectionItem: React.FC<CollectionItemProps> = ({
  name,
  icon_url,
  selected,
  totalCount,
  onClick,
}) => {
  return (
    <Container selected={selected} onClick={onClick}>
      <Image
        src={icon_url?.startsWith('http') ? icon_url : DEFAULT_IMAGE}
        alt={name}
      />
      <Name>
        {name} ({totalCount.toLocaleString()})
      </Name>
    </Container>
  );
};

const Container = styled.li<SelectedProps>`
  display: flex;
  align-items: center;
  padding: 8px;
  padding-right: 16px;
  border-radius: 32px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  ${({ selected }) =>
    selected &&
    css`
      background: linear-gradient(
        to right,
        rgba(0, 102, 255, 0.25),
        rgba(0, 102, 255, 0.05)
      );
      box-shadow: -4px 0px 16px rgba(41, 112, 121, 0.2);

      & > img {
        border-color: #24d1e9;
      }

      & > span {
        color: #24d1e9;
      }
    `};
`;
const Image = styled.img`
  margin-right: 8px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid #191e2b;
  box-shadow: 0px 4px 16px rgba(0, 102, 255, 0.24);
  transition: border-color 0.2s ease;
`;
const Name = styled.span`
  font-weight: bold;
  color: #9098ab;
  transition: color 0.2s ease;
`;
