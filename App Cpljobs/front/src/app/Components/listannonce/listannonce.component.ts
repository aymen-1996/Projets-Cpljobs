import { Component, Pipe } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-listannonce',
  templateUrl: './listannonce.component.html',
  styleUrls: ['./listannonce.component.css']
})
export class ListannonceComponent {
users:any;
annonce :any;
count: {[id:number] : any}={}
userId!: number;
p: number = 1
constructor(private annonceService:AnnonceService, private fb : FormBuilder) {
 }
 ngOnInit(): void {
  this.users = JSON.parse(localStorage.getItem('user') || '{}');
  this.getAnnById();
  this.getCount(this.userId);
}


getAnnById(){
  this.annonceService.getAnnById(this.users.id).subscribe((res:any)=>{
     this.annonce=res;
     console.log("categories : ", res);
     for(const annonce of res){
      this.getCount(annonce.id)
    
     }
   })
 }
 getCount(userId: number){
  this.annonceService.getcount(userId).subscribe(
    (res: any) => {
      this.count[userId]=res
      console.log("count ",res);  
    
    })   
}
}
