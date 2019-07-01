import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';

@Component({
  selector: 'app-payed',
  templateUrl: './payed.component.html',
  styleUrls: ['./payed.component.css']
})
export class PayedComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setHeader(true);
  }

}
