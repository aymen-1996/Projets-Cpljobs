import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaieService {

  constructor(private http:HttpClient) { }
  savePaie(paie:any, id:any  ){
    return this.http.post(`http://localhost:8080/paie/`+id, paie)

}

getPaie(){
  return this.http.get(`http://localhost:8080/paie`)
}

deletebyid(id:any){
  return this.http.delete(`http://localhost:8080/paie/`+id)
}
}