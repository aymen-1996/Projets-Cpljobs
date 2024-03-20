import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';

import { EmployeursComponent } from './Components/navbar/employeurs/employeurs.component';
import { AproposComponent } from './Components/navbar/apropos/apropos.component';
import { EspaceCandidatsComponent } from './Components/navbar/espaceCandidats/espace-candidats.component';
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
import { FooterComponent } from './Components/footer/footer.component';
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
import { StatComponent } from './Components/stat/stat.component';


const routes: Routes = [
  {path:"",component:HomeComponent,children:[

   

   
  ]},

  { path :"employeurs", component : EmployeursComponent},
  { path :"apropos", component : AproposComponent},
  { path :"espace_candidat", component : EspaceCandidatsComponent},
  { path :"candidat", component : CandidatComponent},
  { path :"customer", component : CustomerComponent},
  { path :"annonce", component : AnnonceComponent},
  { path :"listannonce", component : ListannonceComponent},
  { path :"contact", component : ContactComponent},
  { path :"view/:id", component : ViewComponent},
  { path :"anncan/:id", component : AnnoncecandidatComponent},
  { path :"recherche", component : RechercheComponent},
  { path :"profil", component : ProfilComponent},
  { path :"infopro", component : InfoproComponent},
  { path :"formation", component : FormationComponent},
  { path :"experience", component : ExperienceComponent},
  { path :"langue", component : LangueComponent},
  { path :"skills", component : SkillsComponent},
  { path :"fort_interet", component : PointFortComponent},
  { path :"sidebar", component : SidebarComponent},
  { path :"motivation", component : MotivationComponent},
  { path :"document", component : DocumentComponent} ,
  { path :"monespace", component : MonespaceComponent},
  { path :"moncv", component : MoncvComponent},
  { path :"profilrec", component : ProfilrecComponent},
  { path :"search", component : SearchComponent},
  { path :"resultat", component : ResultatComponent},
  { path :"profilentreprise", component : ProfilentrepriseComponent},
  { path :"stat", component : StatComponent}

  
 
  
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
