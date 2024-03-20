import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent {
  alert:boolean=false
  text: string = "text pardefaut"
  formFormation!: FormGroup;
  formFormation1!: FormGroup;
  candidats:any;
  c:any
  enable:boolean=false;
  submitted: boolean = false
  users:any;
  aff:boolean=false;

formation:any

  constructor(private formBuilder:FormBuilder, private formationservices:FormationService  , private router: Router) { }

  ngOnInit(): void {
    this.infoById()
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
      this.formFormation=this.formBuilder.group({
        type:'',
        diplome:'',
        periode:'',
        pays:'',
        etablissement:'',
        statut:'', 
        mention:'', 
        description:'', 
        user:''

})

this.formFormation1=this.formBuilder.group({
  type:'',
  diplome:'',
  periode:'',
  pays:'',
  etablissement:'',
  statut:'', 
  mention:'', 
  description:'', 
  user:''

})
}

  addFormation() {

    let formData = new FormData();
    formData.append("type", this.formFormation.value.type);
    formData.append("diplome", this.formFormation.value.diplome);
    formData.append("periode", this.formFormation.value.periode);
    formData.append("pays", this.formFormation.value.pays);
    formData.append("etablissement", this.formFormation.value.etablissement);
    formData.append("statut", this.formFormation.value.statut);
    formData.append("mention", this.formFormation.value.mention);
    formData.append("description", this.formFormation.value.description);
    formData.append("user", this.formFormation.value.user);
  
  this.formationservices.saveFormation(formData,this.users.id).subscribe(
    (res: any) => {
      console.log("add ",res);  
      window.scrollTo(0,0)
      
      this.alert=true
      
      this.formFormation.reset({})
      setTimeout(() => {
        this.router.navigateByUrl("/profil");
      }, 3000);
      
    
    })
   
  }
  closeAlert(){
    this.alert=false
  }

  

  
  updateFor(): void {

    const infos = JSON.parse(localStorage.getItem('user') || '{}');
   this.formationservices.getformation(infos.id).subscribe((infoRes: any) => {
    this.formation=infoRes

    const firstInfocanId = infoRes[0].id;
 
      let formData = new FormData();
      formData.append("type", this.formFormation1.value.type);
      formData.append("diplome", this.formFormation1.value.diplome);
      formData.append("periode", this.formFormation1.value.periode);
      formData.append("pays", this.formFormation1.value.pays);
      formData.append("etablissement", this.formFormation1.value.etablissement);
      formData.append("statut", this.formFormation1.value.statut);
      formData.append("mention", this.formFormation1.value.mention);
      formData.append("description", this.formFormation1.value.description);
      formData.append("user", this.formFormation1.value.user);
  
      this.formationservices.updateFormation(formData, firstInfocanId).subscribe(
        (res: any) => {
          this.candidats = res;
          this.alert = true;
          window.scrollTo(0, 0);
          setTimeout(() => {
            this.router.navigateByUrl("/profil");
          }, 3000);
        }
      );
      
    });
  
    

  
  }

  infoById(): void {

    const infos = JSON.parse(localStorage.getItem('user') || '{}');
   this.formationservices.getformation(infos.id).subscribe((infoRes: any) => {
    this.formation=infoRes

    const firstInfocanId = infoRes[0].id;
  console.log("infoo",infoRes)
  console.log("firstInfocanId",firstInfocanId)

  this.formationservices.getById(firstInfocanId).subscribe((res: any) => {
    this.candidats = res;
    this.formFormation1.patchValue({
      type: this.candidats.type,
      diplome: this.candidats.diplome,
      periode: this.candidats.periode,
      pays: this.candidats.pays,
      etablissement: this.candidats.etablissement,
      statut: this.candidats.statut,
      mention: this.candidats.mention,
      description: this.candidats.description,
  
    });
    console.log("customer", res);
  });

  })
    const infocanArray1 = JSON.parse(localStorage.getItem('info') || '[]');
    const firstInfocanId1 = infocanArray1[0].id;
    
  }
  getoui(){
    this.aff=true 
   }



}


  
  


