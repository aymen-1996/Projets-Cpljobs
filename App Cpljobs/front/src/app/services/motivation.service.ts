import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MotivationService {
  constructor(private http : HttpClient) { }

  saveMotivation(motivation:any,id:any){
    return this.http.post(`http://localhost:8080/motivation/save/`+id, motivation)
  }

  updateMotivation(motivation:any , id:any){
    return this.http.put(`http://localhost:8080/motivation/`+id, motivation)
  }
  getById(id:any){
    return this.http.get(`http://localhost:8080/motivation/`+id)
  }
  getMotivation(id:any){
    return this.http.get(`http://localhost:8080/motivation/`+id)

  }


}
