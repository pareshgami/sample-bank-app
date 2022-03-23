import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TransferService } from './transfer.service';
import { ITransfer } from '../models/transfer.model';
import { HttpClientModule } from '@angular/common/http';

describe('TransferService', () => {
  let service: TransferService;
  let uuid = '';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(TransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all give response', async () => { 
    service.getAll().subscribe(data => {
      if (data.length) {
        uuid = data[0].uuid;
      }
      expect(data).toBeTruthy();
    });
  });

  it('should create a tranfer in db', async () => { 
    const input: ITransfer = {
      "account_holder": "Don S. Ruth",
      "iban": "ES9121000418450200051332",
      "amount": 991,
      "date": new Date(),
      "note": "Payment settlements"
    };

    service.create(input).subscribe(data => {
      expect(data).toBeTruthy();
    });
  });

  it('should update a tranfer in db', async () => {
    const data = {
      "account_holder": "Don S. Ruth",
      "iban": "ES9121000418450200051332",
      "amount": "991",
      "date": "2022-03-21",
      "note": "Payment settlements"
    };
    console.log(`uuid: ${uuid}`)
    service.update(uuid, data).subscribe(data => {
      expect(data).toBeTruthy();
    });
  });

  it('should delete a tranfer from db', async () => { 
    service.delete(uuid).subscribe(data => {
      expect(data).toBeTruthy();
    });
  });

});
