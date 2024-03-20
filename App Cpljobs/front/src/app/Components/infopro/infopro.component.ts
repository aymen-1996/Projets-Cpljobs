import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoproService } from 'src/app/services/infopro.service';

@Component({
  selector: 'app-infopro',
  templateUrl: './infopro.component.html',
  styleUrls: ['./infopro.component.css']
})
export class InfoproComponent {

  alert:boolean=false
  text: string = "text pardefaut"
  formInfopro!: FormGroup;
  formInfopro1!: FormGroup;
  aff:boolean =false
  c:any
  enable:boolean=false;
  submitted: boolean = false
  users:any;
  cust:any;
  candidats:any;
  infopro:any
  constructor(private formBuilder:FormBuilder, private infoproservices:InfoproService  , private router: Router) { }

  ngOnInit(): void {
   
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
    this.cust = JSON.parse(localStorage.getItem('info') || '{}');
      this.formInfopro=this.formBuilder.group({
      titre:'',
      etude:'',
      situation:'',
      disponibilite:'',
      metier:'',
      experience:'',
      secteur:'', 
      type:'', 
      occupation:'', 
      lieu:'',
      user:''

})

this.formInfopro1=this.formBuilder.group({
  titre:'',
  etude:'',
  situation:'',
  disponibilite:'',
  metier:'',
  secteur:'', 
  type:'', 
  occupation:'', 
  experience:'',
  lieu:'',
  user:''

})


this.infoById();
}

  addCandidat() {

    let formData = new FormData();
    formData.append("titre", this.formInfopro.value.titre);
    formData.append("etude", this.formInfopro.value.etude);
    formData.append("situation", this.formInfopro.value.situation);
    formData.append("disponibilite", this.formInfopro.value.disponibilite);
    formData.append("metier", this.formInfopro.value.metier);
    formData.append("secteur", this.formInfopro.value.secteur);
    formData.append("type", this.formInfopro.value.type);
    formData.append("occupation", this.formInfopro.value.occupation);
    formData.append("lieu", this.formInfopro.value.lieu);
    formData.append("experience", this.formInfopro.value.experience);
    formData.append("user", this.formInfopro.value.user);
  
  this.infoproservices.saveInfopro(formData,this.users.id).subscribe(
    (res: any) => {
      console.log("add ",res);  
      window.scrollTo(0,0)
      
      this.alert=true
      
      
        localStorage.setItem('infopro', JSON.stringify(res));

      this.formInfopro.reset({});

      setTimeout(() => {
        this.router.navigateByUrl("/profil");
      }, 3000);
      
    
    })
   
  }
  closeAlert(){
    this.alert=false
  }

  



  updateInfopro(): void {

    const infos = JSON.parse(localStorage.getItem('user') || '{}');
   this.infoproservices.getinfopro(infos.id).subscribe((infoRes: any) => {
    this.infopro=infoRes

    const firstInfocanId = infoRes[0].id;
 
    let formData = new FormData();
    formData.append("titre", this.formInfopro1.value.titre);
    formData.append("etude", this.formInfopro1.value.etude);
    formData.append("situation", this.formInfopro1.value.situation);
    formData.append("disponibilite", this.formInfopro1.value.disponibilite);
    formData.append("metier", this.formInfopro1.value.metier);
    formData.append("secteur", this.formInfopro1.value.secteur);
    formData.append("type", this.formInfopro1.value.type);
    formData.append("occupation", this.formInfopro1.value.occupation);
    formData.append("lieu", this.formInfopro1.value.lieu);
    formData.append("experience", this.formInfopro1.value.experience);
    formData.append("user", this.formInfopro1.value.user);
  
  
      this.infoproservices.updateInfopro(formData, firstInfocanId).subscribe(
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
   this.infoproservices.getinfopro(infos.id).subscribe((infoRes: any) => {
    this.infopro=infoRes

    const firstInfocanId = infoRes[0].id;
  console.log("infoo",infoRes)
  console.log("firstInfocanId",firstInfocanId)

  this.infoproservices.getById(firstInfocanId).subscribe((res: any) => {
    this.candidats = res;
    this.formInfopro1.patchValue({
      titre: this.candidats.titre,
      etude: this.candidats.etude,
      situation: this.candidats.situation,
      disponibilite: this.candidats.disponibilite,
      metier: this.candidats.metier,
      secteur: this.candidats.secteur,
      type: this.candidats.type,
      occupation: this.candidats.occupation,
      lieu: this.candidats.lieu
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


