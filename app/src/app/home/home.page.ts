import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddEditTransferComponent } from '../core/components/add-edit-transfer/add-edit-transfer.component';
import { COMMON } from '../core/constants/common.constant';
import { ITransfer } from '../core/models/transfer.model';
import { IonicService } from '../core/services/ionic.service';
import { TransferService } from '../core/services/transfer.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  subscriptions = new Subscription();
  transfers: ITransfer[] = [];
  isLoading = true;
  sortBy = '';
  constructor(
    private transferService: TransferService,
    private ionicService: IonicService
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

    this.transfers.sort(sorter);
  }

  async load() {
    this.isLoading = true;
    await this.ionicService.showLoader();
    this.subscriptions.add(this.transferService.getAll()
      .subscribe(async res => {
        this.transfers = res;
        this.allVisible();
        this.isLoading = false;
        await this.ionicService.hideLoader();
      })
    );
  }

  allVisible() {
    this.transfers.forEach(transfer => {
      transfer['isVisible'] = true;
    });
  }

  addTransfer() {
    this.ionicService.showModal(AddEditTransferComponent, {}, async res => {
      if (res.role === COMMON.SAVE) {
        await this.ionicService.showLoader();
        this.subscriptions.add(this.transferService.create(res.data)
          .subscribe(() => {
            this.ionicService.hideLoader();
            this.load();
            this.ionicService.presentToast('Record added.', 'success');
          }, async err => {
            await this.ionicService.hideLoader();
            this.ionicService.showError(err);
          })
        );
      }
    });
  }

  delete(uuid: string) {
    this.ionicService.showConfirmation()
    .then(() => {
      this.subscriptions.add(this.transferService.delete(uuid)
        .subscribe(() => {
          this.load();
        })
      );
    }).catch(err => {
      console.log(err);
    });
  }

  async edit(transfer: ITransfer) {
    this.ionicService.showModal(AddEditTransferComponent, {transfer}, async res => {
      if (res.role === COMMON.UPDATE) {
        await this.ionicService.showLoader();
        this.subscriptions.add(this.transferService.update(transfer.uuid, transfer)
          .subscribe(() => {
            this.ionicService.hideLoader();
            this.ionicService.presentToast('Record updated.', 'success');
            this.load();
            this
          }, async err => {
            await this.ionicService.hideLoader();
            this.ionicService.showError(err);
          })
        );
      }

    });
  }

  filterRecord(elem) {
    const elemVal = elem.detail.value.toLowerCase();
    if (elemVal) {
      this.transfers.forEach(transfer => {
        if (transfer.account_holder.toLowerCase().includes(elemVal) || transfer.note.toLowerCase().includes(elemVal)) {
          transfer['isVisible'] = true;
        } else {
          transfer['isVisible'] = false;
        }
      });
    } else {
      this.allVisible();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
