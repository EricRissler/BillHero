import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeaderDashComponent } from "./header/header-dash/header-dash.component";
import { HeaderLoginComponent } from "./header/header-login/header-login.component";
import { LogoutComponent } from "./logout/logout.component";
import { ActivityComponent } from "./activity/activity.component";
import { MybillsComponent } from "./mybills/mybills.component";

const routes: Routes = [
  { path: "signin", component: SigninComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "headerdash", component: HeaderDashComponent },
  { path: "headerlogin", component: HeaderLoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "activity", component: ActivityComponent },
  { path: "mybills", component: MybillsComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
