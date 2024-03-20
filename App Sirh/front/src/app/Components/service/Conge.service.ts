import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CongeeService {
 
  constructor(private http:HttpClient) { }

  saveCon(conge:any, id:any  ){
    return this.http.post(`http://localhost:8080/conge/`+id, conge)
  }
  
    getCon(){
      return this.http.get(`http://localhost:8080/conge`)
    }
    getbyid(id:any){
      return this.http.get(`http://localhost:8080/conge/`+id)
    
  
    }
    deletebyid(id:any){
      return this.http.delete(`http://localhost:8080/conge/`+id)
    }
    Searchcust(keyword: any): Observable<any[]> {
      return this.http.get<any[]>(`${environment.backendHost}/conge/search`, { params: { keyword: keyword } });
    }
    updateCon(con:any , id:any){
      return this.http.put(`${environment.backendHost}/conge/${id}`,con)
    }

    AccRef(id: any): Observable<boolean> {
      const url = `${environment.backendHost}/accepte/${id}`;
      return this.http.put<boolean>(url, null);
    }

    RefAcc(id: any): Observable<boolean> {
      const url = `${environment.backendHost}/refus/${id}`;
      return this.http.put<boolean>(url, null);
    }

  }
  