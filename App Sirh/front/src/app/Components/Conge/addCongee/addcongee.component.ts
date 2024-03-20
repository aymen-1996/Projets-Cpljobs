import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserService } from '../../service/User.service';
import { Router } from '@angular/router';
import { CongeeService } from '../../service/Conge.service';

@Component({
  selector: 'app-addcongee',
  templateUrl: './addcongee.component.html',
  styleUrls: ['./addcongee.component.css']
})
export class AddcongeeComponent implements OnInit {

  formcon:FormGroup

  users:any
  

    constructor(private formBuilder:FormBuilder, private CongeeService:CongeeService, private userService:UserService,private route: Router) { }
  
    ngOnInit(): void {

      this.users = JSON.parse(localStorage.getItem('user') || '{}');

      console.log("user",this.users)
   

      this.formcon=this.formBuilder.group({
        dateDebut:'',
        dateFin:'',
    
        user:''
       
      })
      
  }
  addCon() {
    let formData = new FormData();
  formData.append("dateDebut", this.formcon.value.dateDebut);
  formData.append("dateFin", this.formcon.value.dateFin);
 
  formData.append("user", this.formcon.value.user);
 
    this.CongeeService.saveCon(formData,this.formcon.value.user).subscribe(
      (res: any) => {
        console.log("add :",res);
        
        this.route.navigateByUrl("/listcon")        
      })
    }
  
  
      getAllCon(){
        this.userService.getUser().subscribe((res:any)=>{
           this.users=res;
           console.log("categories : ", res);
         })
       }


      
  }
  