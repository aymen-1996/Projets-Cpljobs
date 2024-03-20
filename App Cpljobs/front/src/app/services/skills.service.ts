import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {


  constructor(private http : HttpClient) { }

  saveSkills(skills:any,id:any){
    return this.http.post(`http://localhost:8080/skills/save/`+id, skills)
  }

  updateSkills(skills:any , id:any){
    return this.http.put(`http://localhost:8080/skills/`+id, skills)
  }
  getById(id:any){
    return this.http.get(`http://localhost:8080/skills/`+id)
  }
  getSkills(id:any){
    return this.http.get(`http://localhost:8080/skill/`+id)

  }


}
