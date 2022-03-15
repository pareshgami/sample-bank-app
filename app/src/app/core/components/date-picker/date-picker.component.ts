import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  date = '';
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async dateSelected() {
    if (this.date) {
      await this.modalCtrl.dismiss(this.date, 'select');
    }
  }

}
