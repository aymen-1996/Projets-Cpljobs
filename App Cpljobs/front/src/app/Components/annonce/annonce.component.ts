import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';


@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent {

  alert:boolean=false
  text: string = "text pardefaut"
  formAnn!: FormGroup;
  fileUpload:Array<File>=[];

  c:any
  searchFormGroup!:FormGroup;
  users:any;



  constructor(private formBuilder:FormBuilder, private annonceService:AnnonceService  , private router: Router ) { }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
this.formAnn=this.formBuilder.group({
      titre:'',
      description:'',
      dispo:'',
      nom:'',
      type:'',
      etude:'',
      experience:'',
      secteur:'',
      langue:'', 
      region:'',
      adresse:'',
      image:'',
      user:''
      

})

 


}


handleFileInput(files: any) {


  this.fileUpload = <Array<File>>files.target.files;
  console.log(this.fileUpload)}

addAnn() {


  let formData = new FormData();
  formData.append("titre", this.formAnn.value.titre);
  formData.append("nom", this.formAnn.value.nom);
  formData.append("description", this.formAnn.value.description);
  formData.append("dispo", this.formAnn.value.dispo);
  formData.append("type", this.formAnn.value.type);
  formData.append("secteur", this.formAnn.value.secteur);
  formData.append("etude", this.formAnn.value.etude);
  formData.append("experience", this.formAnn.value.experience);
  formData.append("langue", this.formAnn.value.langue);
  formData.append("region", this.formAnn.value.region);
  formData.append("adresse", this.formAnn.value.adresse);
  formData.append("user", this.formAnn.value.user);
  formData.append("file",this.fileUpload[0]);
 
  this.annonceService.postAnnonce(formData, this.users.id).subscribe(
    (res: any) => {
      console.log("add ", res);
      window.scrollTo(0, 0);
      this.alert = true;
      this.formAnn.reset({});
    },
    (error: any) => {
      console.error("Error adding announcement:", error);
      // Handle the error here (e.g., show an error message to the user)
    }
  );
}

  closeAlert(){
    this.alert=false
  }

  

 

 
  
  }



