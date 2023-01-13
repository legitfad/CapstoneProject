import { Injectable } from '@angular/core';
import { Personal } from '../models/personal';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  personal: Personal[] = [];

  constructor() { 
    this.personal = [
      new Personal('Jason Chan', 750, '13-Jan-2023', 'MyId'),
    ];
  }

  getPersonal(): Personal[] {
    return this.personal;
  }

  set(p: Personal) {
    const index = this.personal.findIndex(item => item.id == p.id);
    const pers = this.personal[0];
    pers.budget = p.budget;
    pers.resetDate = p.resetDate;
    }
}
