import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/User.service';
import { RoleService } from '../service/role.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  alert:boolean=false
  text: string = "text pardefaut"
  role:any
  formUser:FormGroup
  fileUpload:Array<File>=[];
  enable:boolean=false;
  submitted: boolean = false


  constructor(private formBuilder:FormBuilder, private userService:UserService,private roleService:RoleService , private route: Router) { }

  ngOnInit(): void {
this.formUser=this.formBuilder.group({
  nom: ['', [Validators.required,Validators.minLength(4)]],
      prenom:['', [Validators.required,Validators.minLength(4)]],
      email:['', [Validators.required,Validators.email ]],
      password:['', [Validators.required,Validators.minLength(6)]],
      numtel:['', [Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      role:'',
      image:'', 

})


this.getAllRole();


}
handleFileInput(files: any) {
  this.fileUpload = <Array<File>>files.target.files;
  console.log(this.fileUpload)}

addUser() {
  console.log(this.formUser.value)
  this.submitted=true;
  if (this.formUser.invalid) {
    return;
    
  }
  let formData = new FormData();
  formData.append("nom", this.formUser.value.nom);
  formData.append("prenom", this.formUser.value.prenom);
  formData.append("email", this.formUser.value.email);
  formData.append("password", this.formUser.value.password);
  formData.append("numtel", this.formUser.value.numtel);
  formData.append("role", this.formUser.value.role);
  formData.append("file",this.fileUpload[0]);

  this.userService.saveUser(formData,this.formUser.value.role).subscribe(
    (res: any) => {
      console.log("add ");
      window.scrollTo(0,0)
      this.alert=true
      this.formUser.reset({})
    
    })
  }

    closeAlert(){
      this.alert=false
    }


    getAllRole(){
      this.roleService.getAllCategorie().subscribe((res:any)=>{
         this.role=res;
         console.log("categories : ", res);
       })
  
      }

  }

