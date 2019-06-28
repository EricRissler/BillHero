import { Component, OnInit } from '@angular/core';
import { Bill } from '../shared/bill.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  bill: Bill[] ;
  constructor() { }

  ngOnInit() {
    this.bill= [
      new Bill("Media Markt", "05.08.2019", 900, true),
      new Bill("Schreiner", "14.06.2019", 750, true),
      new Bill("Zahnarzt", "24.12.2019", 750, true),
      new Bill("MEWA", "01.01.2020", 750, true),
      new Bill("Media Markt", "05.08.2019", 900, true),
      new Bill("Schreiner", "14.06.2019", 750, true),
      new Bill("Zahnarzt", "24.12.2019", 750, true),
      new Bill("MEWA", "01.01.2020", 750, true),
      new Bill("Media Markt", "05.08.2019", 900, true),
      new Bill("Schreiner", "14.06.2019", 750, true),
      new Bill("Zahnarzt", "24.12.2019", 750, true),
      new Bill("MEWA", "01.01.2020", 750, true),
      new Bill("Lidl", "27.03.2020", 750, true)
     ];
  }

}
