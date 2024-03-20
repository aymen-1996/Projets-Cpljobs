import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';

import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { RegisterComponent } from './Components/register/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { NgxPaginationModule } from 'ngx-pagination';
import { RecherchePipe } from './pipes/recherche.pipe';
import { ListinfoComponent } from './Components/Info/listInfo/listinfo.component';
import { AdddocComponent } from './Components/Document/adddoc/adddoc.component';
import { ListdocComponent } from './Components/Document/listdoc/listdoc.component';
import { AddinfoComponent } from './Components/Info/saveInf/addinfo.component';
import { AffdocsComponent } from './Components/Document/affichageDocument/affdocs.component';
import { AddcanComponent } from './Components/Candidats/AddCandidat/addcan.component';
import { ListcanComponent } from './Components/Candidats/listCandidat/listcan.component';
import { AdddemComponent } from './Components/demande/add_demande/adddem.component';
import { ListdemComponent } from './Components/demande/listdem/listdem.component';


import { AddcustComponent } from './Components/customer/addcustomer/addcust.component';
import { ListcustComponent } from './Components/customer/listCust/listcust.component';
import { CustomerAccountsComponent } from './Components/customer/customer-accounts/customer-accounts.component';
import { AddsubordonneComponent } from './Components/Subordonne/AddSubordonne/addsubordonne.component';
import { ListsubordonneComponent } from './Components/Subordonne/listSubordonne/listsubordonne.component';
import { ListcongeeComponent } from './Components/Conge/listCongee/listcongee.component';
import { AddcongeeComponent } from './Components/Conge/addCongee/addcongee.component';
import { UpdateinfoComponent } from './Components/Info/updateInfo/updateinfo.component';
import { UpdateDocsComponent } from './Components/Document/update-docs/update-docs.component';
import { UpdateCandidatComponent } from './Components/Candidats/updateCandidat/update-candidat.component';
import { UpdateSubComponent } from './Components/Subordonne/updateSub/update-sub.component';
import { CalendrierComponent } from './Components/calendrier/calendrier.component';
import { PaieComponent } from './Components/paie/paie.component';
import { ListpaieComponent } from './Components/listpaie/listpaie.component';










@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    LayoutComponent,
    RegisterComponent,
    RecherchePipe,
         ListinfoComponent,
         AdddocComponent,
         ListdocComponent,
         AddinfoComponent,
         AffdocsComponent,
         AddcanComponent,
         ListcanComponent,
         AdddemComponent,
         ListdemComponent,
         AddcustComponent,
         ListcustComponent,
         CustomerAccountsComponent,
         AddsubordonneComponent,
         ListsubordonneComponent,
         ListcongeeComponent,
         AddcongeeComponent,
         UpdateinfoComponent,
         UpdateDocsComponent,
         UpdateCandidatComponent,
         UpdateSubComponent,
         CalendrierComponent,
         PaieComponent,
         ListpaieComponent

   
   
    
   
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
     HttpClientModule,
     NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
