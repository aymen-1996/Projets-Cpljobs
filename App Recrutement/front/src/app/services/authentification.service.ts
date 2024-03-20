import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AppUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  

users : AppUser[]=[];
authentificationUser : AppUser  | undefined ; 
  authenticatedUser: AppUser | undefined;

  constructor() {
    
    this.users.push({userId: '',username: "user1", password : "1234" , roles : ["USER"]});
    this.users.push({userId: '',username: "user2", password : "1234" , roles : ["USER"]});
    this.users.push({userId: '',username: "admin", password : "1234" , roles : ["USER","ADMIN"]});
   }
  public login(username : string, password : string):Observable<AppUser>{
let AppUser = this.users.find(u => u.username==username );
if(!AppUser) return throwError(()=>new Error("user not found"));
if(AppUser.password!=password){
  return throwError (()=>new Error("password invalide"));
}
return of(AppUser);


  }

  public authentificatenUser(appUser : AppUser):Observable<boolean>{
  this.authenticatedUser=appUser;
  localStorage.setItem("authUser" , JSON.stringify({username:appUser.username, roles :appUser.roles, jwt:"JWT_TOKEN"}));
  localStorage.setItem('state','1')

   return of(true);
   
  }
  




  public hasRole(role : string) :boolean {
   return this.authenticatedUser!.roles.includes("role");
  } 

  public isAuthenticated(){
    return this.authenticatedUser!=undefined
  }
  

}

