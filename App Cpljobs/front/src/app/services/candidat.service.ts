import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(private http : HttpClient) { }

  saveCandidat(candidat:any,id:any){
    return this.http.post(`http://localhost:8080/save/`+id, candidat)
  }

  updateCan(candidat:any , id:any){
    return this.http.put(`http://localhost:8080/infocan/`+id, candidat)
  }
  getById(id:any){
    return this.http.get(`http://localhost:8080/infocan/`+id)
  }
  getinfocan(id:any){
    return this.http.get(`http://localhost:8080/infocans/`+id)

  }

  Contact(contact:any){
    return this.http.post(`http://localhost:8080/sendMail`, contact)
  }

}
