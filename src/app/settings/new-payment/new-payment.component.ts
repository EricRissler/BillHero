import { Component, OnInit } from "@angular/core";
import { HeaderService } from "src/app/header.service";
import { PrvUserServiceService } from "src/app/prv-user-service.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-new-payment",
  templateUrl: "./new-payment.component.html",
  styleUrls: ["./new-payment.component.css"]
})
export class NewPaymentComponent implements OnInit {
  newBank: boolean = false;

  newCard: boolean = false;
  userID: string;
  paymentID: string;

  name1: string;
  bic: string;
  iban: string;
  owner1: string;

  name2: string;
  owner2: string;
  cardnr: string;
  date: string;

  nameP: string;
  data: string;

  newBankPayment() {
    this.newBank = !this.newBank;
  }

  newKreditcard() {
    this.newCard = !this.newCard;
  }

  constructor(
    private headerService: HeaderService,
    private http: HttpClient,
    private prvUserService: PrvUserServiceService
  ) {
    this.userID = prvUserService.getUID();
  }

  postPayment() {
    console.log("YAAAY");
    this.http
      .post("http://localhost:3000/api/prvusers/" + this.userID + "/payments", {
        prvID: this.userID,
        genPaymentID: this.paymentID,
        nameP: this.nameP,
        data: this.data
      })
      .subscribe(responseData => {
        console.log("success");
      });

    this.name1 = "";
    this.bic = "";
    this.iban = "";
    this.owner1 = "";

    this.name2 = "";
    this.owner2 = "";
    this.cardnr = "";
    this.date = "";

    this.nameP = "";
    this.data = "";
  }

  ngOnInit() {
    this.headerService.setHeader(true);
  }

  submitBank() {
    this.nameP = this.name1;
    this.paymentID = "1";
    this.data = this.bic + ":" + this.iban + this.owner1;
    this.postPayment();
  }

  submitCreditcard() {
    this.nameP = this.name2;
    this.paymentID = "2";
    this.data = this.owner2 + ":" + this.cardnr + this.date;
    this.postPayment();
  }
}
