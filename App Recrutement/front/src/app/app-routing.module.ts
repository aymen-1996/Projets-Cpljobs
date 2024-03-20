import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerAccountsComponent } from "./customer-accounts/customer-accounts.component";
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { HomeComponent } from './home/home.component';

import { BankComponent } from './bank/bank.component';
import { AuthGuard } from './auth.guard';
import { LogoutGuard } from './logout.guard';
import { UpdatecustomerComponent } from './updatecustomer/updatecustomer.component';
import { RechercheComponent } from './recherche/recherche.component';

const routes: Routes = [
  {
    path: "", canActivate: [AuthGuard], component: BankComponent, children: [

      { path: "admin", component: AdminTemplateComponent },
      { path: "customers", component: CustomersComponent },
      
      { path: "new-customer", component: NewCustomerComponent },
      { path: "customer-accounts/:id", component: CustomerAccountsComponent },
      { path: "home", component: HomeComponent },
      { path: "recherche", component: RechercheComponent },
      { path: "customer-update/:id", component: UpdatecustomerComponent },
      { path: '**', redirectTo: 'home' },
    ]
  },

  { path: "login", canActivate: [LogoutGuard], component: LoginComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
