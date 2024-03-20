import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from '../model/user.model';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage : any ;  
  username!:string;
  password!:string

  constructor(private fb : FormBuilder , private authService : AuthentificationService, private router : Router) {
    localStorage.clear();
   }

  ngOnInit(): void {

  }
  handleLogin(){
 
    this.authService.login(this.username,this.password).subscribe({

      next : (appUser:AppUser)=>{
        this.authService.authentificatenUser(appUser).subscribe({
          next :(data : boolean)=> {
          debugger
            this.router.navigateByUrl("/home");
            

          }
          
        });
      },
     error : (err)=>{
      this.errorMessage =err;
     }
    })


  }
}
