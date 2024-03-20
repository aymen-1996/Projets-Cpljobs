import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http:HttpClient) { }

saveInfo(info:any){
  return this.http.post(`http://localhost:8080/infos`,info)
}

  getInfo(){
    return this.http.get(`http://localhost:8080/infos`)
  }
  getbyid(id:any){
    return this.http.get(`http://localhost:8080/infos/`+id)
  

  }
  deletebyid(id:any){
    return this.http.delete(`http://localhost:8080/infos/`+id)
  }
  updateInfo(info:any,id:any){
    return this.http.put(`http://localhost:8080/infos/`+id,info)
  }
  Searchinfo(keyword: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendHost}/infos/search`, { params: { keyword: keyword } });
  }
}

