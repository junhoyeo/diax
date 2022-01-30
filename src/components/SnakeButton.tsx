import React from 'react';
import styled, { keyframes } from 'styled-components';

type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export const SnakeButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <ButtonContainer>
      <Button {...props}>
        <SnakeBorder />
        <SnakeBorder />
        <SnakeBorder />
        <SnakeBorder />
        <ButtonTitle>{children}</ButtonTitle>
      </Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  margin-top: auto;
  width: fit-content;

  position: relative;
  overflow: hidden;
  background-color: black;
  transition: all 0.2s linear;

  &:hover {
    box-shadow: 0 0 10px rgba(36, 210, 233, 0.35),
      0 0 24px rgba(36, 210, 233, 0.35), 0 0 48px rgba(36, 210, 233, 0.35);
    background-color: #042933;
    transform: scale(1.08);
  }

  @media screen and (max-width: 540px) {
    margin-top: 24px;
  }
`;
const Button = styled.button`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  background-color: transparent;

  box-shadow: 0 20px 50px rgba(255, 255, 255, 0.05);
  overflow: hidden;
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

const SnakeBorder = styled.span.attrs({
  className: 'snake',
})`
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
const ButtonTitle = styled.span`
  cursor: pointer;

  font-size: 1.05rem;
  font-family: 'Russo One', sans-serif;
  text-shadow: 0 4px 12px rgba(28, 71, 77, 0.85);
  text-align: center;
  color: white;
`;
