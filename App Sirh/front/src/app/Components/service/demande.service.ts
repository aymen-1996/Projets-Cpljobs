import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private http:HttpClient) { }
  saveDem(dem:any, id:any  ){
    return this.http.post(`http://localhost:8080/demandes/`+id, dem)

}


  getDem(){
    return this.http.get(`http://localhost:8080/demandes`)
  }
  getbyid(id:any){
    return this.http.get(`http://localhost:8080/demandes/`+id)
  

  }
  deletebyid(id:any){
    return this.http.delete(`http://localhost:8080/demandes/`+id)
  }
  Searchcust(keyword: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendHost}/demandes/search`, { params: { keyword: keyword } });
  }
  updateDem(dem:any , id:any){
    return this.http.put(`${environment.backendHost}/demandes/${id}`,dem)
  }

}
