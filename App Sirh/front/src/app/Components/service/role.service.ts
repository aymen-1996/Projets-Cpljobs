import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }



  getAllCategorie(){
    return this.http.get(`http://localhost:8080/role`)
  }
  getById(id:any){
    return this.http.get(`http://localhost:8080/role/`+id)
  }
  
}
