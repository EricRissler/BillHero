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
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./home/home.component";
import { LogoutComponent } from "./logout/logout.component";
import { MybillsComponent } from "./mybills/mybills.component";
import { ActivityComponent } from "./activity/activity.component";

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
    ActivityComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [SigninComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
