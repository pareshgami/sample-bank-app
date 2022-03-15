import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../constants/api.constant';
import { ITransfer } from '../models/transfer.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(
    private api: ApiService
  ) { }

  getAll(): Observable<ITransfer[]> {
    return this.api.get(`${API.transfer.getAll}`);
  }

  create(transfer: ITransfer): Observable<ITransfer> {
    return this.api.post(`${API.transfer.create}`, transfer);
  }

  delete(uuid: string): Observable<any> {
    const url = `${API.transfer.deleteByUuid}`.replace('{:uuid}', uuid);
    return this.api.delete(url);
  }

  update(uuid: string, transfer: ITransfer): Observable<any> {
    const url = `${API.transfer.deleteByUuid}`.replace('{:uuid}', uuid);
    return this.api.put(url, transfer);
  }
}
