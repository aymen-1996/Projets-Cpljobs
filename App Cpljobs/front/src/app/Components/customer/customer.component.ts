import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  alert:boolean=false
  text: string = "text pardefaut"

  customer:any

  formUser!:FormGroup
 
  fileUpload:Array<File>=[];

  constructor(private formBuilder:FormBuilder, private customerService:CustomerService, private router: Router) { }

  ngOnInit(): void {

    this.customer = JSON.parse(localStorage.getItem('user') || '{}');



this.formUser=this.formBuilder.group({
  secteur: '',
  type:'',
  region:'',
  adresse:'',
  code:'',
  categorie:'',
  description:'',
  logo:'',
  nomEntreprise:'',
  user:''


})




}

handleFileInput(files: any) {


  this.fileUpload = <Array<File>>files.target.files;
  console.log(this.fileUpload)}



addClient() {

  let formData = new FormData();
  formData.append("type", this.formUser.value.type);
  formData.append("region", this.formUser.value.region);
  formData.append("adresse", this.formUser.value.adresse);
  formData.append("code", this.formUser.value.code);
  formData.append("description", this.formUser.value.description);
  formData.append("nomEntreprise", this.formUser.value.nomEntreprise);
  formData.append("secteur", this.formUser.value.secteur);
  formData.append("categorie", this.formUser.value.categorie);
  formData.append("file",this.fileUpload[0]);
  formData.append("user", this.formUser.value.user);

  this.customerService.saveInfocust(formData,this.customer.id).subscribe(
    (res: any) => {
      console.log("add :", res);
      localStorage.setItem('infocust',JSON.stringify(this.formUser.value))
      this.formUser.reset({})
      window.scrollTo(0, 0);
      this.alert=true ;
      setTimeout(() => {
        this.router.navigateByUrl("/profilrec");
      }, 3000);
      
    }
  );
  
}


  }


