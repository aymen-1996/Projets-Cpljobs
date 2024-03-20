import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http : HttpClient) { }

  saveCustomer(customer:any){
    return this.http.post(`${environment.backendHost}/customers`, customer)
  }
  getAllCustomer(){
    return this.http.get(`${environment.backendHost}/customers`)
  }

  getById(id:any){
    return this.http.get(`${environment.backendHost}/customers/${id}`)
  }
  getfile(filename:any){
    return this.http.get(`${environment.backendHost}/customers/files/${filename}`)
  }
  Searchcust(keyword: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.backendHost}/customers/search`, { params: { keyword: keyword } });
  }
  
  updateCust(customer:any , id:any){
    return this.http.put(`${environment.backendHost}/customers/${id}`,customer)
  }
  
}