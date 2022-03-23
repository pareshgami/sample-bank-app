import { transferActionTypes, transfersLoaded, updateTransfer } from './transfer.actions';
import { TransferService } from './../../core/services/transfer.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Injectable()
export class TransferEffects {

  constructor(
    private transferService: TransferService,
    private actions$: Actions,
    private modalCtrl: ModalController
  ) {}

  loadTransfers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transferActionTypes.loadTransfers),
      concatMap(() => this.transferService.getAll()),
      map(transfers => transferActionTypes.transfersLoaded({transfers}))
    )
  );

  createTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transferActionTypes.createTransfer),
      concatMap((action) => this.transferService.create(action.transfer)),
      tap(() => this.modalCtrl.dismiss())
    ),
    {dispatch: false}
  );

  deleteTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transferActionTypes.deleteTransfer),
      concatMap((action) => this.transferService.delete(action.uuid))
    ),
    {dispatch: false}
  );

  updateTransfer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transferActionTypes.updateTransfer),
      concatMap((action) => 
        this.transferService.update(action.update.id, action.update.changes)
      )
    ),
    {dispatch: false}
  );
}
