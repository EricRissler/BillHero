import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { MiddleComponent } from "./middle/middle.component";
import { BottomComponent } from "./middle/bottom/bottom.component";
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
import { PaymentComponent } from "./payment/payment.component";
import { PaypalComponent } from "./payment/paypal/paypal.component";
import { PayedComponent } from "./payment/payed/payed.component";
import { HeaderService } from "./header.service";
import { NewPaymentComponent } from "./settings/new-payment/new-payment.component";
import { BusinessComponent } from "./business/business.component";
import { BusinessRegisterComponent } from "./business/business-register/business-register.component";
import { BusinessLoginComponent } from "./business/business-login/business-login.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { BusinessDashboardComponent } from "./business/business-dashboard/business-dashboard.component";

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
    PaymentComponent,
    PaypalComponent,
    PayedComponent,
    NewPaymentComponent,
    BusinessComponent,
    BusinessRegisterComponent,
    BusinessLoginComponent,
    DropdownDirective,
    BusinessDashboardComponent
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
      { path: "payment", component: PaymentComponent },
      { path: "paypal", component: PaypalComponent },
      { path: "payed", component: PayedComponent },
      { path: "newPayment", component: NewPaymentComponent },
      { path: "business", component: BusinessComponent },
      { path: "businessLogin", component: BusinessLoginComponent },
      { path: "businessRegister", component: BusinessRegisterComponent },
      { path: "businessDashboard", component: BusinessDashboardComponent }
    ])
  ],
  providers: [SigninComponent, HeaderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
