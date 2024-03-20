import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { customer } from '../model/customer.model';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  
 


  constructor(private http : HttpClient) { }

  public getCustomers():Observable<Array<customer>>{
    return this.http.get<Array<customer>>(environment.backendHost+"/customers")
}

public saveCustomer(customer: customer):Observable<customer>{
  return this.http.post<customer>(environment.backendHost+"/customers",customer);
}
public deleteCustomer(id : number){
  return this.http.delete(environment.backendHost+"/customers/"+id);
}

searchCustomersByAge(minAge: number, maxAge: number) {
  const params = new HttpParams()
    .set('minAge', minAge)
    .set('maxAge', maxAge);

  return this.http.get(environment.backendHost+"/cust/age", { params });
}



}





