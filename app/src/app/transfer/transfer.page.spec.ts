import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { TransferService } from '../core/services/transfer.service';
import { TransferPage } from './transfer.page';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ITransfer } from '../core/models/transfer.model';

describe('TransferPage', () => {
  let component: TransferPage;
  let fixture: ComponentFixture<TransferPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferPage ],
      imports: [
        StoreModule.forRoot({}),
        IonicModule.forRoot()
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

  it("should click edit function", function() {
    const update: ITransfer = {
      "id": 19,
      "uuid": "73708386-15d7-4f83-a65c-426460cfe608",
      "account_holder": "Modi rerum pariatur",
      "iban": "ES91 2100 0418 4502 0005 1332",
      "amount": 123123,
      "date": new Date(),
      "note": "Id sunt quae saepe p",
      "created_at": new Date()
    };    
    expect(spyOn(component, 'edit')).toHaveBeenCalledTimes(0);
  });

});
