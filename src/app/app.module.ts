import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { MiddleComponent } from "./middle/middle.component";
import { BottomComponent } from "./bottom/bottom.component";
import { FooterComponent } from "./footer/footer.component";
import { SigninComponent } from "./signin/signin.component";
import { BillDetailComponent } from './bill-detail/bill-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderLoginComponent } from './header/header-login/header-login.component';
import { HeaderDashComponent } from './header/header-dash/header-dash.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MiddleComponent,
    BottomComponent,
    FooterComponent,
    SigninComponent,
    BillDetailComponent,
    DashboardComponent,
    HeaderLoginComponent,
    HeaderDashComponent
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
