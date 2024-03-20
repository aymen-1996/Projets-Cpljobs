import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddcustService {

  constructor(private http : HttpClient) { }

  saveCustomer(customer:any){
    return this.http.post(`${environment.backendHost}/customers`, customer)
  }
  getAllCustomer(){
    return this.http.get(`${environment.backendHost}/customers`)
  }

  Searchcust(keyword: any, minAge: any, maxAge: any): Observable<any[]> {
    let params = new HttpParams()
      .set('keyword', keyword)
      .set('minAge', minAge)
      .set('maxAge', maxAge);
  
    return this.http.get<any[]>(`${environment.backendHost}/customers/search`, { params: params });
  }

  Searchcust1(keyword: any, minAge: any, maxAge: any,secteur: any): Observable<any[]> {
    let params = new HttpParams()
      .set('keyword', keyword)
      .set('minAge', minAge)
      .set('maxAge', maxAge)
      .set('secteur', secteur);
  
    return this.http.get<any[]>(`${environment.backendHost}/cust/search1`, { params: params });
  }
  getById(id:any){
    return this.http.get(`${environment.backendHost}/customers/${id}`)
  }
  getfile(filename:any){
    return this.http.get(`${environment.backendHost}/files/${filename}`)
  }
  
  updateCust(customer:any , id:any){
    return this.http.put(`${environment.backendHost}/customers/${id}`,customer)
  }
  
  
}
