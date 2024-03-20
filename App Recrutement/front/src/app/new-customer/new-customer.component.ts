import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddcustService } from '../services/addcust.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  alert:boolean=false
  text: string = "text pardefaut"
  formCustomer!: FormGroup;
  fileUpload:Array<File>=[];
  c:any
  enable:boolean=false;
  submitted: boolean = false
  successMessage!: any;
  errorMessage!: any;


  constructor(private formBuilder:FormBuilder, private customerService:AddcustService  , private route: Router) { }

  ngOnInit(): void {
this.formCustomer=this.formBuilder.group({
  nom:['', [Validators.required ,Validators.minLength(4)]],
      region:['', [Validators.required]],
      email:['', [Validators.required,Validators.email]],
      age:['', [Validators.required]],
      secteur:['', Validators.required],
      etude:['', Validators.required],
      anneeExperience:['', Validators.required],
      telephone:['', [Validators.required,Validators.minLength(8) ]],
      cv:'', 

})
}
handleFileInput1(files: any) {
  this.fileUpload = <Array<File>>files.target.files;
  console.log(this.fileUpload)}

  handleFileInput(files: any) {
    this.fileUpload = <Array<File>>files.target.files;
    const fileName = this.fileUpload[0]?.name; 
  
    
    const fileInput = document.querySelector('.file-upload-info') as HTMLInputElement;
    if (fileInput) {
      
      fileInput.value = fileName || '';
    }
  }

  addCustomer() {
    console.log(this.formCustomer.value);
    this.submitted = true;
    if (this.formCustomer.invalid) {
      return;
    }

    let formData = new FormData();
    formData.append("nom", this.formCustomer.value.nom);
    formData.append("region", this.formCustomer.value.region);
    formData.append("email", this.formCustomer.value.email);
    formData.append("age", this.formCustomer.value.age);
    formData.append("secteur", this.formCustomer.value.secteur);
    formData.append("etude", this.formCustomer.value.etude);
    formData.append("anneeExperience", this.formCustomer.value.anneeExperience);
    formData.append("telephone", this.formCustomer.value.telephone);
    formData.append("file",this.fileUpload[0]);

    this.customerService.saveCustomer(formData).subscribe(
      (res: any) => {
        console.log("add ", res);
        window.scrollTo(0, 0);
        this.formCustomer.reset({});
        this.successMessage = "Le candidat a été créé avec succès.";
        this.errorMessage = null; // Clear any previous error message
      },
      (error: HttpErrorResponse) => {
        console.error(error);
        this.successMessage = null; // Clear any previous success message
        this.errorMessage = "Une erreur s'est produite lors de la création du candidat.";
      }
    );
  }
  closeAlert(){
    this.alert=false
  }

  

  
 
  
  }



