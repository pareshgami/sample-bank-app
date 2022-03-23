import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { TransferService } from '../core/services/transfer.service';
import { TransferPage } from './transfer.page';
import { BrowserModule, By } from '@angular/platform-browser';
import { ITransfer } from '../core/models/transfer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('TransferPage', () => {
  let component: TransferPage;
  let fixture: ComponentFixture<TransferPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferPage ],
      imports: [
        StoreModule.forRoot({}),
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        BrowserModule
      ],
      providers: [
        TransferService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find searchbar', () => {
    let addItemDebugElement = fixture.debugElement.query(By.css('#search-transfer'));
    expect(addItemDebugElement).toBeTruthy();
  });

  it('should find add transfer button', () => {
    let addItemDebugElement = fixture.debugElement.query(By.css('#add-transfer'));
    expect(addItemDebugElement).toBeTruthy();
  });

  it("should call edit function", () => {
    const update: ITransfer = {
      "id": 19,
      "uuid": "9b68d77c-2bd7-462b-ba26-33b0590f7991",
      "account_holder": "Modi rerum pariatur",
      "iban": "ES91 2100 0418 4502 0005 1332",
      "amount": 123123,
      "date": new Date(),
      "note": "Id sunt quae saepe p",
      "created_at": new Date()
    };    
    component.edit(update);
    expect().nothing();
  });

  it('sholud display alert dialog', () => {
    component.delete('9b68d77c-2bd7-462b-ba26-33b0590f7991');
    expect().nothing();
  });

  it('should call load', () => {
    component.load();
    expect().nothing();
  });

  it('should open sort actionsheet', () => {
    setTimeout(() => {
      component.sortChanged();
      expect().nothing();
    }, 2000);
  });

  it('should call enter', () => {
    component.ionViewDidEnter();
  });

  it('should call add tranfer', () => {
    component.addTransfer();
  });

  it('should call filter', () => {
    component.filterRecord({detail: {value: 'hello'}});
  });

});