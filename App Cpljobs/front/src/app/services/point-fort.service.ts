import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointFortService {
  constructor(private http : HttpClient) { }

  savePointfort(pointfort:any,id:any){
    return this.http.post(`http://localhost:8080/pointfort/save/`+id, pointfort)
  }

  updatePointfort(pointfort:any , id:any){
    return this.http.put(`http://localhost:8080/pointfort/`+id, pointfort)
  }
  getById(id:any){
    return this.http.get(`http://localhost:8080/pointfort/`+id)
  }
  getPointfort(id:any){
    return this.http.get(`http://localhost:8080/pointforts/`+id)

  }


}
