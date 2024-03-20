import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  saveInfocust(cust:any, id:any  ){
    return this.http.post(`http://localhost:8080/infocust/`+id, cust)

}


  getInfocust(){
    return this.http.get(`http://localhost:8080/infocust`)
  }
  getinfobyid(id:any){
    return this.http.get(`http://localhost:8080/infocust/`+id)
  

  }

  getinfocustid(id:any){
    return this.http.get(`http://localhost:8080/infocusts/`+id)

  }

  getInfocustCustomer(id:any){
    return this.http.get(`http://localhost:8080/infocusts/${id}`)
  }
  
  deletebyid(id:any){
    return this.http.delete(`http://localhost:8080/infocust/`+id)
  }
  updateInfocust(user:any,id:any){
    return this.http.put(`http://localhost:8080/infocust/`+id,user)
  }
  
}
