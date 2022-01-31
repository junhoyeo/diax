import { atom } from 'recoil';

import { localStorageEffect } from './effects/localStorageEffect';

export type Account = {
  address: string;
  starkPublicKey: string;
} | null;

const key = '@account';
export const AccountAtom = atom<Account>({
  key,
  default: null,
  effects_UNSTABLE: [localStorageEffect(key)],
});
