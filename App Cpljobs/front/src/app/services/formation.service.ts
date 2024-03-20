import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http : HttpClient) { }

  saveFormation(formation:any,id:any){
    return this.http.post(`http://localhost:8080/formation/save/`+id, formation)
  }

  updateFormation(formation:any , id:any){
    return this.http.put(`http://localhost:8080/formation/`+id, formation)
  }
  getById(id:any){
    return this.http.get(`http://localhost:8080/formation/`+id)
  }
  getformation(id:any){
    return this.http.get(`http://localhost:8080/formations/`+id)

  }


}
