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
import { transferActionTypes } from './store/transfer.actions';

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

  addTransfer() {
    this.ionicService.showModal(AddEditTransferComponent, {});
  }

  delete(uuid: string) {
    this.ionicService.showConfirmation()
    .then(() => {
      this.store.dispatch(transferActionTypes.deleteTransfer({uuid}));
    }).catch(err => {
    });
  }

  async edit(transfer: ITransfer) {
    this.ionicService.showModal(AddEditTransferComponent, {transfer});
  }

  filterRecord(elem) {
    const elemVal = elem.detail.value.toLowerCase();
    if (elemVal) {
      // this.transfers.forEach(transfer => {
      //   if (transfer.account_holder.toLowerCase().includes(elemVal) || transfer.note.toLowerCase().includes(elemVal)) {
      //     transfer['isVisible'] = true;
      //   } else {
      //     transfer['isVisible'] = false;
      //   }
      // });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
