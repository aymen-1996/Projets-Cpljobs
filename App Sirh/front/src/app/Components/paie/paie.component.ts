import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaieService } from '../service/paie.service';
import { UserService } from '../service/User.service';
import { Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-paie',
  templateUrl: './paie.component.html',
  styleUrls: ['./paie.component.css']
})
export class PaieComponent implements OnInit {

  users:any

  customer : any

  formPaie:FormGroup

  fileUpload:Array<File>=[];
 
  constructor(private formBuilder:FormBuilder, private paieService:PaieService,private userService:UserService , private route: Router ) { }

  ngOnInit(): void {


   this.getAllcust();

    console.log("user",this.users)

   this.formPaie=this.formBuilder.group({
    fichier: '',
      user:''
     

})


}

getAllcust(){
  this.userService.getUser().subscribe((res:any)=>{
     this.users=res;
     console.log("customer : ", res);
     
   },

  
   )
  

 }
handleFileInput(files: any) {
  this.fileUpload = <Array<File>>files.target.files;
  console.log(this.fileUpload)}


addPaie() {

  let formData = new FormData();
  formData.append("file",this.fileUpload[0]);
 
  formData.append("user", this.formPaie.value.user);
 

  this.paieService.savePaie(formData,this.formPaie.value.user).subscribe(
    (res: any) => {
      console.log("add ");
      window.scrollTo(0,0)
    
      this.formPaie.reset({})
    
    })
  }



  

  }

