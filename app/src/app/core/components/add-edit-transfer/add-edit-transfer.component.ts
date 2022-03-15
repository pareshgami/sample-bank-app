import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { COMMON } from '../../constants/common.constant';
import { IonicService } from '../../services/ionic.service';
import {ValidatorService} from 'angular-iban';

@Component({
  selector: 'app-add-edit-transfer',
  templateUrl: './add-edit-transfer.component.html',
  styleUrls: ['./add-edit-transfer.component.scss'],
})
export class AddEditTransferComponent implements OnInit {
  @Input() transfer;
  addTransferForm: FormGroup;
  constructor(
    private modalController: ModalController,
    private ionicService: IonicService
  ) {
    this.addTransferForm = new FormGroup({
      account_holder: new FormControl('', []),
      iban: new FormControl('', [
        Validators.required,
        ValidatorService.validateIban
      ]),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+((.)|(.\d{0,2})?)$/),
        Validators.minLength(2),
        Validators.maxLength(8),
        Validators.min(50),
        Validators.max(20000000)
      ]),
      date: new FormControl('', [Validators.required]),
      note: new FormControl('', [])
    });
  }

  ngOnInit() {
    if (this.transfer) {
      const { account_holder, iban, amount, date, note } = this.transfer;
      this.addTransferForm.get('account_holder').setValue(account_holder);
      this.addTransferForm.get('iban').setValue(iban);
      this.addTransferForm.get('amount').setValue(amount);
      const d = new Date(date);
      this.addTransferForm.get('date').setValue(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
      this.addTransferForm.get('note').setValue(note);
    }
  }

  close() {
    this.modalController.dismiss(null, COMMON.DIMISS);
  }

  onFormSubmit() {
    if (!this.addTransferForm.valid) {
      this.addTransferForm.markAllAsTouched();
      return;
    }
    console.log(this._v);
    this.modalController.dismiss(this._v, this.transfer ? COMMON.UPDATE : COMMON.SAVE);
  }

  get _v() {
    return this.addTransferForm.value;
  }

  getformControl(formControl) {
    return this.addTransferForm.get(formControl) as FormArray;
  }

  openDatePicker() {
    this.ionicService.openDatePicker(res => {
      console.log(res);
      this.addTransferForm.get('date').setValue(res);
    });
  }

}
