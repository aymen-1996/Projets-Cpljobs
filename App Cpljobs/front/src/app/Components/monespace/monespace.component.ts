import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { InfoproService } from 'src/app/services/infopro.service';

@Component({
  selector: 'app-monespace',
  templateUrl: './monespace.component.html',
  styleUrls: ['./monespace.component.css']
})
export class MonespaceComponent {
  users:any
  annCan:any
  ann:any
  srcImageUser:string = "http://localhost:8080/infocan/files/"

  constructor( private candidatService:CandidatService ,private infoproservice:InfoproService , private router: Router) { }
  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
    this.getInfocanbyId()
    this.getInfoprobyId()
  }
  
  getInfocanbyId(){
    this.candidatService.getinfocan(this.users.id).subscribe((res:any)=>{
       this.annCan=res;
       console.log("categories : ", res);
     })
   }

   getInfoprobyId(){
    this.infoproservice.getinfopro(this.users.id).subscribe((res:any)=>{
       this.ann=res;
       console.log("infopro : ", res);
     })
   }
}

