import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
    /*saveUser1(user:any){
      return this.http.post(`http://localhost:8080/admin/save`,user)
    }*/
    saveUser(user:any, id:any  ){
      return this.http.post(`http://localhost:8080/user/save/`+id, user)
  
  }
  

    getUser(){
      return this.http.get(`http://localhost:8080/user`)
    }
    getbyid(id:any){
      return this.http.get(`http://localhost:8080/user/`+id)
    

    }
    deletebyid(id:any){
      return this.http.delete(`http://localhost:8080/user/`+id)
    }
    updateUser(user:any,id:any){
      return this.http.put(`http://localhost:8080/user/`+id,user)
    }
    postUser(user:any){
      return this.http.post(`http://localhost:8080/user/auth`, user)
    }
  }
 
