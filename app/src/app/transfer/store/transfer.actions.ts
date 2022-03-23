import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';
import { ITransfer } from 'src/app/core/models/transfer.model';


export const loadTransfers = createAction(
  '[Transfers List] Load Transfers via Service',
  props<{title: any}>()
);

export const transfersLoaded = createAction(
  '[Transfers Effect] transfers Loaded Successfully',
  props<{transfers: ITransfer[]}>()
);

export const createTransfer = createAction(
  '[Create transfer Component] Create transfer',
  props<{transfer: ITransfer}>()
);

export const deleteTransfer = createAction(
  '[Transfers List Operations] Delete Transfer',
  props<{uuid: string}>()
);

export const updateTransfer = createAction(
  '[Transfers List Operations] Update Transfer',
  props<{update: Update<ITransfer>}>()
);

export const transferActionTypes = {
  loadTransfers,
  transfersLoaded,
  createTransfer,
  deleteTransfer,
  updateTransfer
};


