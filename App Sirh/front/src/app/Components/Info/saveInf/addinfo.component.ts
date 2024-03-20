import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoService } from '../../service/Info.service';

@Component({
  selector: 'app-addinfo',
  templateUrl: './addinfo.component.html',
  styleUrls: ['./addinfo.component.css']
})
export class AddinfoComponent implements OnInit {

  formInfo:FormGroup
information:any
fileUpload:Array<File>=[];

  constructor(private formBuilder:FormBuilder, private InfoService:InfoService,private route: Router) { }

  ngOnInit(): void {

this.getAllinfo();
    this.formInfo=this.formBuilder.group({
      nom:'',
      age:'',
      adresse:'',
      caracteristiques:'',
      cnss:'',
      rib:'',
      dateEmbauche:'',
      dateDepart:'',
      motif:'',
      statut:'',
      cv:''
    })
    
}
handleFileInput(files: any) {
  this.fileUpload = <Array<File>>files.target.files;
  console.log(this.fileUpload)}
addInfo(){


  let formData = new FormData();
  formData.append("nom", this.formInfo.value.nom);
  formData.append("age", this.formInfo.value.age);
  formData.append("adresse", this.formInfo.value.adresse);
  formData.append("caracteristiques", this.formInfo.value.caracteristiques);
  formData.append("cnss", this.formInfo.value.cnss);
  formData.append("rib", this.formInfo.value.rib);
  formData.append("dateEmbauche", this.formInfo.value.dateEmbauche);
  formData.append("dateDepart", this.formInfo.value.dateDepart);
  formData.append("statut", this.formInfo.value.statut);
  formData.append("motif", this.formInfo.value.motif);
  formData.append("file",this.fileUpload[0]);

 
  this.InfoService.saveInfo(formData).subscribe(
    (res: any) => {
      console.log("add :",res);
  this.getAllinfo()
  this.route.navigateByUrl("/listinfo")
      
    })
    }

    getAllinfo(){
      this.InfoService.getInfo().subscribe((res:any)=>{
         this.information=res;
         console.log("categories : ", res);
       })
     }
}
