export class PaymentBank {
  constructor(
    public name: string,
    public BIC: string,
    public IBAN: number,
    public owner: string
  ) {}
}

export class PaymentCreditcard {
  constructor(
    public type: string,
    public name: string,
    public owner: string,
    public cardNumber: number,
    public date: string
  ) {}
}
