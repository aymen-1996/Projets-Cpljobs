import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';





import { AuthGuard } from './guards/auth.guard';
import { LogoutGuard } from './guards/logout.guard';
import { RegisterComponent } from './Components/register/register.component';
import { ListinfoComponent } from './Components/Info/listInfo/listinfo.component';
import { AddinfoComponent } from './Components/Info/saveInf/addinfo.component';
import { AdddocComponent } from './Components/Document/adddoc/adddoc.component';
import { ListdocComponent } from './Components/Document/listdoc/listdoc.component';
import { AffdocsComponent } from './Components/Document/affichageDocument/affdocs.component';
import { ListcanComponent } from './Components/Candidats/listCandidat/listcan.component';
import { AddcanComponent } from './Components/Candidats/AddCandidat/addcan.component';
import { AdddemComponent } from './Components/demande/add_demande/adddem.component';
import { ListdemComponent } from './Components/demande/listdem/listdem.component';
import { AddcustComponent } from './Components/customer/addcustomer/addcust.component';
import { ListcustComponent } from './Components/customer/listCust/listcust.component';
import { CustomerAccountsComponent } from './Components/customer/customer-accounts/customer-accounts.component';
import { AddsubordonneComponent } from './Components/Subordonne/AddSubordonne/addsubordonne.component';
import { ListsubordonneComponent } from './Components/Subordonne/listSubordonne/listsubordonne.component';
import { AddcongeeComponent } from './Components/Conge/addCongee/addcongee.component';
import { ListcongeeComponent } from './Components/Conge/listCongee/listcongee.component';
import { UpdateinfoComponent } from './Components/Info/updateInfo/updateinfo.component';
import { UpdateCandidatComponent } from './Components/Candidats/updateCandidat/update-candidat.component';
import { UpdateSubComponent } from './Components/Subordonne/updateSub/update-sub.component';
import { UpdateDocsComponent } from './Components/Document/update-docs/update-docs.component';
import { CalendrierComponent } from './Components/calendrier/calendrier.component';
import { PaieComponent } from './Components/paie/paie.component';
import { ListpaieComponent } from './Components/listpaie/listpaie.component';



const routes: Routes = [
  {path:"",canActivate:[AuthGuard],component:HomeComponent,children:[

    {path:"addinfo",component:AddinfoComponent},
    {path:"listinfo",component:ListinfoComponent},
    {path:"adddoc",component:AdddocComponent},
    {path:"listdoc",component:ListdocComponent},
    { path :"affdoc/:id", component : AffdocsComponent},
    {path:"addcan",component:AddcanComponent},
    {path:"listcan",component:ListcanComponent},
    {path:"adddem",component:AdddemComponent},
    {path:"listdem",component:ListdemComponent},
    {path:"addcust",component:AddcustComponent},
    {path:"listcust",component:ListcustComponent},
    {path:"addsub",component:AddsubordonneComponent},
    {path:"listsub",component:ListsubordonneComponent},

    {path:"addconge",component:AddcongeeComponent},
    {path:"listcon",component:ListcongeeComponent},
    {path:"customeraccounts/:id",component:CustomerAccountsComponent},
    {path:"updateinfo/:id",component:UpdateinfoComponent},
    {path:"updatecan/:id",component:UpdateCandidatComponent},
    {path:"updatesub/:id",component:UpdateSubComponent},
    {path:"updatedoc/:id",component:UpdateDocsComponent},
    {path:"calendrier",component:CalendrierComponent},
    {path:"paie",component:PaieComponent},
    {path:"listpaie",component:ListpaieComponent}

   
  ]},


  {path:"login",component:LoginComponent,canActivate:[LogoutGuard]},
  {path:"register",component:RegisterComponent},


  
 
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
