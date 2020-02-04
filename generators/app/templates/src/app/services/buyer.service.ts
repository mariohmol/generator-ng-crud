import { Injectable } from '@angular/core';
import { BaseService } from '../core/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuyerService extends BaseService {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  getBuyer(id) {
    return this.doGet(`/buyer/${id}`);
  }

  saveBuyer(group) {
    if (group._id) {
      return this.doPut(`/buyer/${group._id}`, group);
    } else {
      return this.doPost(`/buyer`, group);
    }
  }

}
