import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { TransferService } from '../../services/transfer.service';
import { AddEditTransferComponent } from './add-edit-transfer.component';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

describe('AddEditTransferComponent', () => {
  let component: AddEditTransferComponent;
  let fixture: ComponentFixture<AddEditTransferComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditTransferComponent ],
      imports: [
        IonicModule.forRoot(),
        StoreModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        TransferService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditTransferComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
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

  it('should find close button', fakeAsync (() => {
    spyOn(component, 'close' as never);
  
    let button = fixture.debugElement.nativeElement.querySelector('#close-modal');
    button.click();
    tick();
    fixture.whenStable().then(() => {
      expect(component.close).toHaveBeenCalled();
    });
  }));

  it('should set submitted to true', () => {
    component.onFormSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.addTransferForm.get('account_holder').setValue('');
    component.addTransferForm.get('iban').setValue('');
    component.addTransferForm.get('amount').setValue('');
    component.addTransferForm.get('date').setValue('');
    component.addTransferForm.get('note').setValue('');
    expect(component.addTransferForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.addTransferForm.get('account_holder').setValue('Don S. Ruth');
    component.addTransferForm.get('iban').setValue('ES9121000418450200051332');
    component.addTransferForm.get('amount').setValue('1999');
    component.addTransferForm.get('date').setValue('2022-03-21');
    component.addTransferForm.get('note').setValue('Payment settlements');
    expect(component.addTransferForm.valid).toBeTruthy();
  });

});
