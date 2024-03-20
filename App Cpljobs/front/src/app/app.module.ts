import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';

import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { EmployeursComponent } from './Components/navbar/employeurs/employeurs.component';
import { AproposComponent } from './Components/navbar/apropos/apropos.component';


import { CarouselModule } from 'ngx-bootstrap/carousel';
import { EspaceCandidatsComponent } from './Components/navbar/espaceCandidats/espace-candidats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CandidatComponent } from './Components/candidat/candidat.component';

import { CustomerComponent } from './Components/customer/customer.component';

import { AnnonceComponent } from './Components/annonce/annonce.component';
import { ListannonceComponent } from './Components/listannonce/listannonce.component';
import { ContactComponent } from './Components/contact/contact.component';
import { ViewComponent } from './Components/view/view.component';
import { RechercheComponent } from './Components/recherche/recherche.component';
import { AnnoncecandidatComponent } from './Components/annoncecandidat/annoncecandidat.component';
import { ProfilComponent } from './Components/profil/profil.component';
import { InfoproComponent } from './Components/infopro/infopro.component';
import { FormationComponent } from './Components/formation/formation.component';
import { ExperienceComponent } from './Components/experience/experience.component';
import { LangueComponent } from './Components/langue/langue.component';
import { SkillsComponent } from './Components/skills/skills.component';
import { PointFortComponent } from './Components/point-fort/point-fort.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MotivationComponent } from './Components/motivation/motivation.component';
import { DocumentComponent } from './Components/document/document.component';
import { MonespaceComponent } from './Components/monespace/monespace.component';
import { MoncvComponent } from './Components/moncv/moncv.component';
import { ProfilrecComponent } from './Components/profilrec/profilrec.component';
import { SearchComponent } from './Components/search/search.component';
import { ResultatComponent } from './Components/resultat/resultat.component';
import { ProfilentrepriseComponent } from './Components/profilentreprise/profilentreprise.component';
import { InfocustComponent } from './Components/infocust/infocust.component';
import { NgChartsModule } from 'ng2-charts';
import { StatComponent } from './Components/stat/stat.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtInterceptor } from './interceptor/jwtInterceptor';
import { ErrorInterceptor } from './interceptor/errorInterceptor';









@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   
    NavbarComponent,
    FooterComponent,
    EmployeursComponent,
    AproposComponent,
    EspaceCandidatsComponent,
    CandidatComponent,
  
    CustomerComponent,
  
    AnnonceComponent,
    ListannonceComponent,
    ContactComponent,
    ViewComponent,
    RechercheComponent,
    AnnoncecandidatComponent,
    ProfilComponent,
    InfoproComponent,
    FormationComponent,
    ExperienceComponent,
    LangueComponent,
    SkillsComponent,
    PointFortComponent,
    SidebarComponent,
    MotivationComponent,
    DocumentComponent,
    MonespaceComponent,
    MoncvComponent,
    ProfilrecComponent,
    SearchComponent,
    ResultatComponent,
    ProfilentrepriseComponent,
    InfocustComponent,
    StatComponent
  
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    NgChartsModule,
    NgxPaginationModule
    


  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
