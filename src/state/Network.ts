import { atom } from 'recoil';

import { localStorageEffect } from './effects/localStorageEffect';

export type Network = 'mainnet' | 'ropsten';

const key = '@network';
export const NetworkAtom = atom<Network>({
  key,
  default: 'mainnet',
  effects_UNSTABLE: [localStorageEffect(key)],
});
