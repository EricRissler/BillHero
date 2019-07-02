import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeaderDashComponent } from "./header/header-dash/header-dash.component";
import { HeaderLoginComponent } from "./header/header-login/header-login.component";
import { LogoutComponent } from "./logout/logout.component";
import { ActivityComponent } from "./activity/activity.component";
import { MybillsComponent } from "./mybills/mybills.component";
import { MiddleComponent } from "./middle/middle.component";

const routes: Routes = [
  { path: " ", component: MiddleComponent },
  { path: "signin", component: SigninComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "headerdash", component: HeaderDashComponent },
  { path: "headerlogin", component: HeaderLoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "activity", component: ActivityComponent },
  { path: " ", component: MiddleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
