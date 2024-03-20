import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

 
  constructor(private http:HttpClient) { }


  postAnnonce(annonce:any , id:any){
    return this.http.post(`http://localhost:8080/annonce/`+id, annonce)
  }


  postulerAnnonce(post: any, id_annonce: any, id_info: any ,id_infopro :any) {
    return this.http.post(`http://localhost:8080/post/${id_annonce}/${id_info}/${id_infopro}`, post);
  }
  
 

  getbyid(id:any){
    return this.http.get(`http://localhost:8080/annonce/`+id)

  }

  getAll(){
    return this.http.get(`http://localhost:8080/annonce`)

  }

  getcount(id:any){
    return this.http.get(`http://localhost:8080/posts/`+id)

  }


  getAnnCandidat(id:any){
    return this.http.get(`http://localhost:8080/post/`+id)
  }

  SearchAnnonce(keyword: any, secteur: any, region: any): Observable<any[]> {
    let params = new HttpParams()
      .set('keyword', keyword)
      .set('secteur', secteur)
      .set('region', region);
  
    return this.http.get<any[]>(`http://localhost:8080/annonce/search`,{params :params});
  }



  SearchAnnonce1(keyword: any,region: any): Observable<any[]> {
    let params = new HttpParams()
      .set('keyword', keyword)
   
      .set('region', region);
  
    return this.http.get<any[]>(`http://localhost:8080/annonce/search1`,{params :params});
  }

  getAnnById(id:any){
    return this.http.get(`http://localhost:8080/annonces/`+id)

  }
 



  getNombreAnnoncesParJourSemaine(userId: number, startDate?: any): Observable<any> {
    const url = `http://localhost:8080/annoncesParJourSemaine/${userId}`;
    const params: any = {};

    if (startDate) {
      params.startDate = startDate 
    }

    return this.http.get(url, { params });
  }


  getNombreAnnoncesParMois(userId: number, startDate?: any): Observable<any> {
    const url = `http://localhost:8080/annoncesParAnnee/${userId}`;
    const params: any = {};

    if (startDate) {
      params.startDate = startDate 
    }

    return this.http.get(url, { params });
  }

}
