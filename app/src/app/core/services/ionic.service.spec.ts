import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { IonicService } from './ionic.service';
import { IonicModule } from '@ionic/angular';
import { AddEditTransferComponent } from '../components/add-edit-transfer/add-edit-transfer.component';

describe('IonicService', () => {
  let service: IonicService;
  let uuid = '';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        IonicModule
      ]
    });
    service = TestBed.inject(IonicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call display toast success', () => {
    service.presentToast('Test Success', 'success')
  });

  it('should call display toast error', () => {
    service.presentToast('Test Error', 'error')
  });

  it('should call show error', () => {
    service.showError('');
  });

  it('shold display alert', () => {
    service.showAlert('Header', 'Sub Header', 'Test Message', '', []);
  })

  it('should call display show loader', () => {
    service.showLoader();
    service.hideLoader();
  });

  it('should call display hide loader', () => {
    service.hideLoader();
  });

  it('should open date picker', () => {
    service.openDatePicker(r => {});
  });

  it('should open modal', (done) => {
    service.showModal(AddEditTransferComponent, {}, (_) => {
      done();
    });
  });

  it('should open confirmation', (done) => {
    service.showConfirmation()
    .then(result => {
      done();
    })
  });
});
