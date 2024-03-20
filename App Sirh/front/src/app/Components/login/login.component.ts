import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/User.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formUser:FormGroup
  users:any
  constructor(private userService:UserService , private formBuilder:FormBuilder ,private activatedRoute:ActivatedRoute , private router:Router ) {
    localStorage.clear();
   }
  ngOnInit(): void {
    
    this.formUser= this.formBuilder.group({
    
      email: '',

      password: '',
      
  });

  }
  userauth(){
    this.userService.postUser(this.formUser.value).subscribe((res:any)=>{
    console.log("user",res);

     this.users=res;
     console.log("user connecte  is",res)
     localStorage.setItem('state','1')
     localStorage.setItem('role',res.role.name)
     console.log("role",res.role.name)
     localStorage.setItem('user',JSON.stringify(this.users))
     this.router.navigateByUrl('');
    
      
    })}
    
  
  
  
    }
  


