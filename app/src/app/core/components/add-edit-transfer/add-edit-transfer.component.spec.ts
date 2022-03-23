import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { TransferService } from '../../services/transfer.service';
import { AddEditTransferComponent } from './add-edit-transfer.component';
import { By } from '@angular/platform-browser';

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

  it('should find submit button', () => {
    let addItemDebugElement = fixture.debugElement.query(By.css('#btn-submit'));
    expect(addItemDebugElement).toBeTruthy();
  });

  it('should find close button for modal', () => {
    let addItemDebugElement = fixture.debugElement.query(By.css('#close-modal'));
    expect(addItemDebugElement).toBeTruthy();
  });

  it('should', fakeAsync (() => {
    spyOn(component, 'close' as never);
  
    let button = fixture.debugElement.nativeElement.querySelector('#close-modal');
    button.click();
    tick();
    fixture.whenStable().then(() => {
      expect(component.close).toHaveBeenCalled();
    });
  }));

});
