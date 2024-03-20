import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http : HttpClient) { }

  saveExperience(experience:any,id:any){
    return this.http.post(`http://localhost:8080/experience/save/`+id, experience)
  }

  updateExperience(experience:any , id:any){
    return this.http.put(`http://localhost:8080/experience/`+id, experience)
  }
  getById(id:any){
    return this.http.get(`http://localhost:8080/experience/`+id)
  }
  getExperience(id:any){
    return this.http.get(`http://localhost:8080/experiences/`+id)

  }
 

}
