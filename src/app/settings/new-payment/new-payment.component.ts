import { Component, OnInit } from "@angular/core";
import { HeaderService } from "src/app/header.service";

@Component({
  selector: "app-new-payment",
  templateUrl: "./new-payment.component.html",
  styleUrls: ["./new-payment.component.css"]
})
export class NewPaymentComponent implements OnInit {
  newBank: boolean = false;

  newCard: boolean = false;
  newBankPayment() {
    this.newBank = !this.newBank;
  }

  newKreditcard() {
    this.newCard = !this.newCard;
  }

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.setHeader(true);
  }
}
