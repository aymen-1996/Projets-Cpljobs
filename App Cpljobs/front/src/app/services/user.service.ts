import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // or provide it in the appropriate module
})
export class UserService {


  constructor(private http:HttpClient) { }


  postUser(user:any){
    return this.http.post(`http://localhost:8080/user/auth`, user)
  }

  saveUser(user:any){
    return this.http.post(`http://localhost:8080/user/save`, user)
  }


  getbyid(id:any){
    return this.http.get(`http://localhost:8080/user/`+id)
  

  }
}
