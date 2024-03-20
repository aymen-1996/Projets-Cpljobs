import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';





@Component({
  selector: 'app-new-customer',
  templateUrl: './addcust.component.html',
  styleUrls: ['./addcust.component.css']
})
export class AddcustComponent implements OnInit {
  alert:boolean=false
  text: string = "text pardefaut"
  formCustomer!: FormGroup;
  fileUpload:Array<File>=[];
  c:any
  isSuccessful:boolean=false
  isSignUpFailed:boolean=false
  error=''
  enable:boolean=false;
  submitted: boolean = false


  constructor(private formBuilder:FormBuilder, private customerService:CustomerService  , private route: Router) { }

  ngOnInit(): void {
this.formCustomer=this.formBuilder.group({
  nom: '',
      prenom:'',
      email:'',
      etude:'',
      secteur:'',
      cv:'', 

})
}
handleFileInput(files: any) {
  this.fileUpload = <Array<File>>files.target.files;
  console.log(this.fileUpload)}

addCustomer() {


  let formData = new FormData();
  formData.append("nom", this.formCustomer.value.nom);
  formData.append("prenom", this.formCustomer.value.prenom);
  formData.append("email", this.formCustomer.value.email);
  formData.append("secteur", this.formCustomer.value.secteur);
  formData.append("etude", this.formCustomer.value.etude);
  formData.append("file",this.fileUpload[0]);

  this.customerService.saveCustomer(formData).subscribe(
    data => {

      console.log(data);

      window.scrollTo(0,0)
    
      this.formCustomer.reset({})   
      this.isSuccessful = true;
      this.isSignUpFailed = false;

    },
    
    error => {
      this.error = error;
      this.isSignUpFailed = true;
    })
   
  }
  closeAlert(){
    this.alert=false
  }

  

  
 
  
  }



