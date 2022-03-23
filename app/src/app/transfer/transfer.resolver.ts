import { AppState } from './../store/reducers/index';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import { areTransfersLoaded } from './store/transfer.selectors';
import { loadTransfers } from './store/transfer.actions';

@Injectable()
export class TransferResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
    .pipe(
        select(areTransfersLoaded),
        tap((transfersLoaded) => {
          if (!transfersLoaded) {
            this.store.dispatch(loadTransfers({title: ''}));
          }
        }),
        filter(transfersLoaded => transfersLoaded),
        first()
    );
  }
}
