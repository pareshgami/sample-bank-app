import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { TransferService } from '../../services/transfer.service';
import { AddEditTransferComponent } from './add-edit-transfer.component';

describe('AddEditTransferComponent', () => {
  let component: AddEditTransferComponent;
  let fixture: ComponentFixture<AddEditTransferComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditTransferComponent ],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot({})
      ],
      providers: [
        TransferService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
