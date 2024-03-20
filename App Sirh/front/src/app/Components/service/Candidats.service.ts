import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(private http:HttpClient) { }

  saveCan(candidat:any){
    return this.http.post(`http://localhost:8080/candidats`,candidat)
  }
  
    getCan(){
      return this.http.get(`http://localhost:8080/candidats`)
    }
    getbyid(id:any){
      return this.http.get(`http://localhost:8080/candidats/`+id)
    
  
    }
    deletebyid(id:any){
      return this.http.delete(`http://localhost:8080/candidats/`+id)
    }
    updateCan(candidat:any,id:any){
      return this.http.put(`http://localhost:8080/candidats/`+id,candidat)
    }
    Searchcust(keyword: any): Observable<any[]> {
      return this.http.get<any[]>(`${environment.backendHost}/candidats/search`, { params: { keyword: keyword } });
    }
  }
  
  