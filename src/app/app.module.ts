import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { MiddleComponent } from "./middle/middle.component";
import { BottomComponent } from "./bottom/bottom.component";
import { FooterComponent } from "./footer/footer.component";
import { SigninComponent } from "./signin/signin.component";
import { BillDetailComponent } from "./bill-detail/bill-detail.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeaderLoginComponent } from "./header/header-login/header-login.component";
import { HeaderDashComponent } from "./header/header-dash/header-dash.component";
import { HomeComponent } from "./home/home.component";
import { LogoutComponent } from "./logout/logout.component";
import { MybillsComponent } from "./mybills/mybills.component";
import { ActivityComponent } from "./activity/activity.component";
import { RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { SettingsComponent } from "./settings/settings.component";
import { HttpClient } from "@angular/common/http";
import { PaymentComponent } from './payment/payment.component';

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
    HeaderDashComponent,
    HomeComponent,
    LogoutComponent,
    MybillsComponent,
    ActivityComponent,
    RegisterComponent,
    SettingsComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: MiddleComponent },
      { path: "signin", component: SigninComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "headerdash", component: HeaderDashComponent },
      { path: "headerlogin", component: HeaderLoginComponent },
      { path: "logout", component: LogoutComponent },
      { path: "activity", component: ActivityComponent },
      { path: "mybills", component: MybillsComponent },
      { path: "header", component: HeaderComponent },
      { path: "register", component: RegisterComponent },
      { path: "settings", component: SettingsComponent },
      { path: "payment", component: PaymentComponent }
    ])
  ],
  providers: [SigninComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
