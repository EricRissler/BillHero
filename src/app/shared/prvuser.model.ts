export class Prvuser {
  public userID: string;
  public firstname: string;
  public lastname: string;
  public birthdate: string;
  public nationality: string;
  public email: string;

  constructor(
    userID: string,
    firstname: string,
    lastname: string,
    birthdate: string,
    nationality: string,
    email: string
  ) {
    (this.userID = userID),
      (this.firstname = firstname),
      (this.lastname = lastname),
      (this.birthdate = birthdate),
      (this.nationality = nationality),
      (this.email = email);
  }
}
