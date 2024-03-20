import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangueService {

  constructor(private http : HttpClient) { }

  saveLangue(langue:any,id:any){
    return this.http.post(`http://localhost:8080/langue/save/`+id, langue)
  }

  updateLangue(langue:any , id:any){
    return this.http.put(`http://localhost:8080/langue/`+id, langue)
  }
  getById(id:any){
    return this.http.get(`http://localhost:8080/langue/`+id)
  }
  getlangue(id:any){
    return this.http.get(`http://localhost:8080/langues/`+id)

  }


}
