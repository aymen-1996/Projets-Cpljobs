import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LangueService } from 'src/app/services/langue.service';

@Component({
  selector: 'app-langue',
  templateUrl: './langue.component.html',
  styleUrls: ['./langue.component.css']
})
export class LangueComponent {


  alert:boolean=false
  text: string = "text pardefaut"
  formLangue!: FormGroup;
  formLangue1!: FormGroup;
  aff:boolean=false;
candidats:any;
  c:any
  enable:boolean=false;
  submitted: boolean = false
  users:any;
  langue:any;


  constructor(private formBuilder:FormBuilder, private langueservices:LangueService, private router: Router) { }

  ngOnInit(): void {
    this.infoById();
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
      this.formLangue=this.formBuilder.group({
        langues:'',
        niveau:'',
        certificat:'',
        score:'',
        user:''

})
this.formLangue1=this.formBuilder.group({
  langues:'',
  niveau:'',
  certificat:'',
  score:'',
  user:''

})
}

  addLangue() {

    let formData = new FormData();
    formData.append("langues", this.formLangue.value.langues);
    formData.append("niveau", this.formLangue.value.niveau);
    formData.append("certificat", this.formLangue.value.certificat);
    formData.append("score", this.formLangue.value.score);
    formData.append("user", this.formLangue.value.user);
  
  this.langueservices.saveLangue(formData,this.users.id).subscribe(
    (res: any) => {
      console.log("add ",res);  
      window.scrollTo(0,0)
      
      this.alert=true
      
      this.formLangue.reset({})
      setTimeout(() => {
        this.router.navigateByUrl("/profil");
      }, 3000);
      
    
    })
   
  }
  closeAlert(){
    this.alert=false
  }

  

  
 
  updateLan(): void {

    const infos = JSON.parse(localStorage.getItem('user') || '{}');
   this.langueservices.getlangue(infos.id).subscribe((infoRes: any) => {
    this.langue=infoRes

    const firstInfocanId = infoRes[0].id;
 
    let formData = new FormData();
    formData.append("langues", this.formLangue1.value.langues);
    formData.append("niveau", this.formLangue1.value.niveau);
    formData.append("certificat", this.formLangue1.value.certificat);
    formData.append("score", this.formLangue1.value.score);
    formData.append("user", this.formLangue1.value.user);
  
  
      this.langueservices.updateLangue(formData, firstInfocanId).subscribe(
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
   this.langueservices.getlangue(infos.id).subscribe((infoRes: any) => {
    this.langue=infoRes

    const firstInfocanId = infoRes[0].id;
  console.log("infoo",infoRes)
  console.log("firstInfocanId",firstInfocanId)

  this.langueservices.getById(firstInfocanId).subscribe((res: any) => {
    this.candidats = res;
    this.formLangue1.patchValue({
      langues: this.candidats.langues,
      niveau: this.candidats.niveau,
      certificat: this.candidats.certificat,
      score: this.candidats.score,
   
  
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


  
  


