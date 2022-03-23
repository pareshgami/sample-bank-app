import { TransferState } from './transfer.reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll, selectIds } from './transfer.reducers';

export const transferFeatureSelector = createFeatureSelector<TransferState>('transfers');

export const getAllTransfers = createSelector(
  transferFeatureSelector,
  selectAll
);

export const areTransfersLoaded = createSelector(
  transferFeatureSelector,
  state => state.transfersLoaded
);



