import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HeaderService {
  changeHeader = false;

  private _changeHeader: BehaviorSubject<boolean>;
  subscribe: any;

  constructor() {
    this._changeHeader = new BehaviorSubject<boolean>(false);
  }

  //--------------------------------------------------------------------
  setHeader(headerChange: boolean) {
    this.changeHeader = headerChange;
  }

  getHeader() {
    return this.changeHeader;
  }
}
