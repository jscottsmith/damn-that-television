import { WorkerApi } from '@react-three/cannon';
import create from 'zustand';

type ChainApi = WorkerApi[];

export interface ChainState {
  chain: ChainApi;
  addChain?: (WorkerApi) => void;
}

export const useChainStore = create<ChainState>((set) => ({
  chain: [],
  addChain: (api) => {
    return set((state) => ({
      chain: [...state.chain, api],
    }));
  },
}));
