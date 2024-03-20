import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  constructor(private http:HttpClient) { }
  saveDoc(doc:any){
    return this.http.post(`http://localhost:8080/docs`, doc)

}


  getDoc(){
    return this.http.get(`http://localhost:8080/docs`)
  }
  getbyid(id:any){
    return this.http.get(`http://localhost:8080/docs/`+id)
  

  }
  deletebyid(id:any){
    return this.http.delete(`http://localhost:8080/docs/`+id)
  }
  updateDoc(doc:any,id:any){
    return this.http.put(`http://localhost:8080/docs/`+id,doc)
  }

  Searchcust(keyword: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendHost}/docs/search`, { params: { keyword: keyword } });
  }
}

