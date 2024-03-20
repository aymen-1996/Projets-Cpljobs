import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersComponent } from './customers/customers.component';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { HomeComponent } from './home/home.component';
import { PacksComponent } from './packs/packs.component';
import { BankComponent } from './bank/bank.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdatecustomerComponent } from './updatecustomer/updatecustomer.component';
import { SearchPipe } from './search.pipe';
import { RechercheComponent } from './recherche/recherche.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    NewCustomerComponent,
    CustomerAccountsComponent,
    FooterComponent,
    LoginComponent,
    AdminTemplateComponent,
    HomeComponent,
    PacksComponent,
    BankComponent,
    UpdatecustomerComponent,
    SearchPipe,
    RechercheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
