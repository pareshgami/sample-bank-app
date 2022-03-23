import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddEditTransferComponent } from '../core/components/add-edit-transfer/add-edit-transfer.component';
import { COMMON } from '../core/constants/common.constant';
import { ITransfer } from '../core/models/transfer.model';
import { IonicService } from '../core/services/ionic.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/reducers';
import { getAllTransfers } from './store/transfer.selectors';
import { loadTransfers, transferActionTypes } from './store/transfer.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-transfer',
  templateUrl: 'transfer.page.html',
  styleUrls: ['transfer.page.scss'],
})
export class TransferPage implements OnDestroy {

  subscriptions = new Subscription();
  transfers$: Observable<ITransfer[]>;
  isLoading = true;
  sortBy = '';
  constructor(
    private ionicService: IonicService,
    private store: Store<AppState>
  ) {}

  ionViewDidEnter() {
    this.load();
  }

  sortChanged() {
    let sorter = null
    if (this.sortBy === 'amountHL') {
      sorter = (a, b) => a.amount < b.amount ? 1 : -1;
    } else if (this.sortBy === 'amountLH') {
      sorter = (a, b) => a.amount > b.amount ? 1 : -1;
    } else if (this.sortBy === 'dateNO') {
      sorter = (a) => new Date(a.date) > new Date(a.date) ? 1 : -1;
    } else if (this.sortBy === 'dateON') {
      sorter = (a) => new Date(a.date) > new Date(a.date) ? 1 : -1;
    }

    // this.transfers.sort(sorter);
  }

  async load() {
    this.isLoading = true;
    await this.ionicService.showLoader();
    this.transfers$ = this.store.select(getAllTransfers);
    await this.ionicService.hideLoader();
  }

  delete(uuid: string) {
    this.ionicService.showConfirmation()
    .then(() => {
      this.store.dispatch(transferActionTypes.deleteTransfer({uuid}));
      this.store.dispatch(loadTransfers({title: ''}));
    }).catch(err => {
    });
  }

  addTransfer() {
    this.ionicService.showModal(AddEditTransferComponent, {}, (_) => {
      this.store.dispatch(loadTransfers({title: ''}));
    });
  }

  async edit(transfer: ITransfer) {
    this.ionicService.showModal(AddEditTransferComponent, {transfer}, (_) => {
      this.store.dispatch(loadTransfers({title: ''}));
    });
  }

  filterRecord(elem) {
    const query = elem.detail.value.toLowerCase();
    this.store.dispatch(loadTransfers({title: query}));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
