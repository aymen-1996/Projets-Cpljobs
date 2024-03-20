import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoproService {

  constructor(private http : HttpClient) { }

  saveInfopro(infopro:any,id:any){
    return this.http.post(`http://localhost:8080/infopro/save/`+id, infopro)
  }

  updateInfopro(infopro:any , id:any){
    return this.http.put(`http://localhost:8080/infopro/`+id, infopro)
  }
  getById(id:any){
    return this.http.get(`http://localhost:8080/infopro/`+id)
  }
  getinfopro(id:any){
    return this.http.get(`http://localhost:8080/infopros/`+id)

  }
  Searchinfopro(keyword: any, secteur: any, lieu: any , experience :any , etude:any): Observable<any[]> {
    let params = new HttpParams()
      .set('keyword', keyword)
      .set('secteur', secteur)
      .set('lieu', lieu)
      .set('experience', experience)
      .set('etude', etude);
  
    return this.http.get<any[]>(`http://localhost:8080/infopro/search`,{params :params});
  }


}
