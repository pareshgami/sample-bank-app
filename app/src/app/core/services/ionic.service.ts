import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { DatePickerComponent } from '../components/date-picker/date-picker.component';

@Injectable({
  providedIn: 'root'
})
export class IonicService {
  private loadingCtrl;

  constructor(private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) { }

  async showLoader() {
    if (this.loadingCtrl === undefined) {
      this.loadingCtrl = await this.loadingController.create({
        spinner: 'circular',
        cssClass: 'mm-loader'
      });
      await this.loadingCtrl.present();
    }
  }

  async hideLoader() {
    if (this.loadingCtrl) {
      await this.loadingCtrl.dismiss();
      this.loadingCtrl = undefined;
    } else {
      return Promise.resolve();
    }
  }

  async presentToast(message, type) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      cssClass: type,
      mode: 'md',
      buttons: [
        {
          role: 'cancel',
          icon: 'close-outline',
          handler: () => {
          }
        }
      ],
    });
    toast.present();
  }

  async showAlert(header, subHeader, message, cssClass, buttons, backdropDismiss = true) {
    const alert = await this.alertController.create({
      cssClass,
      header,
      subHeader,
      message,
      buttons,
      backdropDismiss
    });
    await alert.present();
    return alert;
  }

  async showModal(component, componentProps, callback?) {
    const modal = await this.modalCtrl.create({
      component,
      componentProps
    });
    modal.onDidDismiss()
    .then(res => {
      if (callback)
        callback(res);
    })
    modal.present();
  }
 
  showError(error) {
    try {
      if (error.hasOwnProperty('error') && error.error.hasOwnProperty('message')) {
        this.presentToast(error.error.message, 'error');
      } else {
        this.presentToast('Something went wrong!', 'error');
      }
    } catch (e) {
      this.presentToast('Something went wrong!', 'error');
    }
  }

  async showConfirmation() {
    return new Promise<string>(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: 'Hands Up.! 🙌',
        message: 'Are you sure you want to delete this record?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            id: 'btn-cancel',
            cssClass: 'secondary',
            handler: () => {
              reject();
            }
          }, {
            text: 'Okay',
            id: 'confirm-button',
            handler: () => {
              resolve(null);
            }
          }
        ]
      });
      await alert.present();
    });
  }

  async openDatePicker(callback) {
    const modal = await this.modalCtrl.create({
      component: DatePickerComponent,
      cssClass: 'centerModal',
      componentProps: {
      },
    });
    await modal.present();

    modal.onDidDismiss().then((_ => {
      if (_.role === 'select') {
        callback(_.data.split('T')[0]);
      }
    }));
  }

}
