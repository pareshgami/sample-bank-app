import { Component } from '@angular/core';
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
export class HomePage {
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
    console.log(this.sortBy);
    let sorter = null
    if (this.sortBy === 'amountHL') {
      sorter = (a, b) => a.amount < b.amount ? 1 : -1;
    } else if (this.sortBy === 'amountLH') {
      sorter = (a, b) => a.amount > b.amount ? 1 : -1;
    } else if (this.sortBy === 'dateNO') {
      sorter = (a, b) => new Date(a.date) > new Date(a.date) ? 1 : -1;
    } else if (this.sortBy === 'dateON') {
      sorter = (a, b) => new Date(a.date) > new Date(a.date) ? 1 : -1;
    }

    this.transfers.sort(sorter);

  }

  async load() {
    this.isLoading = true;
    await this.ionicService.showLoader();
    this.transferService.getAll()
    .subscribe(async res => {
      this.transfers = res;
      this.allVisible();
      this.isLoading = false;
      await this.ionicService.hideLoader();
    });
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
        this.transferService.create(res.data)
        .subscribe(async res => {
          await this.ionicService.hideLoader();
          this.load();
          this.ionicService.presentToast('Record added.', 'success');
        }, async err => {
          await this.ionicService.hideLoader();
          this.ionicService.showError(err);
        });
      }
    });
  }

  delete(uuid: string) {
    this.ionicService.showConfirmation()
    .then(res => {
      this.transferService.delete(uuid)
      .subscribe(res => {
        this.load();
      });
    }).catch(err => {
      console.log(err);
    });
  }

  async edit(transfer: ITransfer) {
    this.ionicService.showModal(AddEditTransferComponent, {transfer}, async res => {
      if (res.role === COMMON.UPDATE) {
        await this.ionicService.showLoader();
        this.transferService.update(transfer.uuid, transfer)
        .subscribe(async res => {
          await this.ionicService.hideLoader();
          this.ionicService.presentToast('Record updated.', 'success');
          this.load();
          this
        }, async err => {
          await this.ionicService.hideLoader();
          this.ionicService.showError(err);
        });
      }

    });
  }

  filterRecord(e) {
    const q = e.detail.value.toLowerCase();
    if (q) {
      this.transfers.forEach(transfer => {
        if (transfer.account_holder.toLowerCase().includes(q) || transfer.note.toLowerCase().includes(q)) {
          transfer['isVisible'] = true;
        } else {
          transfer['isVisible'] = false;
        }
      });
    } else {
      this.allVisible();
    }
  }
}
