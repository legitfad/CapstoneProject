import { Component } from '@angular/core';
import { Personal } from '../shared/models/personal';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  personal: Personal[] = [];
  constructor() {
    this.personal = [
        new Personal('Jason Chan', 750, ''),
      ];
  }

}
