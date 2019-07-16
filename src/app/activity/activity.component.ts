import { Component, OnInit } from '@angular/core';
import { Bill } from '../shared/bill.model';
import { HeaderService } from '../header.service';
import { PrvUserServiceService } from '../prv-user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  bill: Bill[] ;
  constructor(private headerService: HeaderService,private prvUserService: PrvUserServiceService,
    private router: Router) { }

  ngOnInit() {
    if(!this.prvUserService.getUser()){
      this.router.navigate(["/signin"]);
    }

    this.headerService.setHeader(true);
    this.bill= [
      new Bill("Media Markt", "05.08.2019", "900", true),
      new Bill("Schreiner", "14.06.2019", "750", true),
      new Bill("Zahnarzt", "24.12.2019", "750", true),
      
     ];
  }

}
