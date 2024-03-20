import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http : HttpClient) { }

  saveDocument(document:any,id:any){
    return this.http.post(`http://localhost:8080/document/save/`+id, document)
  }

  updateDocument(document:any , id:any){
    return this.http.put(`http://localhost:8080/document/`+id, document)
  }
  getById(id:any){
    return this.http.get(`http://localhost:8080/document/`+id)
  }
  getDocument(id:any){
    return this.http.get(`http://localhost:8080/documents/`+id)

  }


}
