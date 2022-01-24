import React from 'react';
import styled from 'styled-components';

export type TabItem<T> = {
  type: T;
  title: string;
  value?: number;
};

export type TabProps<T extends string> = Omit<
  React.HTMLAttributes<HTMLUListElement>,
  'onChange'
> & {
  selected?: T;
  tabs: TabItem<T>[];
  onChange?: (value: T) => void;
};

export const Tab = <T extends string>({
  selected,
  tabs,
  onChange,
  ...containerProps
}: TabProps<T>) => {
  return (
    <TabList {...containerProps}>
      {tabs.map((tab) => (
        <TabItemTitle
          key={tab.type}
          selected={selected === tab.type}
          onClick={() => onChange?.(tab.type)}
        >
          {tab.title}
        </TabItemTitle>
      ))}
    </TabList>
  );
};

const TabList = styled.ul`
  padding: 0;

  display: flex;
  list-style-type: none;
`;

type SelectedProps = {
  selected?: boolean;
};

const TabItemTitle = styled.li<SelectedProps>`
  padding: 0 8px;
  cursor: pointer;
  user-select: none;

  font-size: 1.1rem;
  font-weight: bold;
  line-height: 140%;
  text-align: center;
  letter-spacing: -0.02em;

  transition: color 0.2s ease-in-out;
  color: ${({ selected }) => (!selected ? '#6c7585' : '#17b5cb')};
`;
