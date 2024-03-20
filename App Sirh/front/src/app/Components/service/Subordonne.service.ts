import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubService {

  constructor(private http:HttpClient) { }

  saveSub(sub:any){
    return this.http.post(`http://localhost:8080/sub`,sub)
  }
  
    getSub(){
      return this.http.get(`http://localhost:8080/sub`)
    }
    getbyid(id:any){
      return this.http.get(`http://localhost:8080/sub/`+id)
    
  
    }
    deletebyid(id:any){
      return this.http.delete(`http://localhost:8080/sub/`+id)
    }
    Searchcust(keyword: any): Observable<any[]> {
      return this.http.get<any[]>(`${environment.backendHost}/sub/search`, { params: { keyword: keyword } });
    }
    updateSub(sub:any , id:any){
      return this.http.put(`${environment.backendHost}/sub/${id}`,sub)
    }
  }
  
  