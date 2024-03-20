import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnnonceService } from 'src/app/services/annonce.service';

@Component({
  selector: 'app-espace-candidats',
  templateUrl: './espace-candidats.component.html',
  styleUrls: ['./espace-candidats.component.css']
})
export class EspaceCandidatsComponent {
 annonce : any ;
 searchFormGroup!:FormGroup ;
 p: number = 1

 srcImageUser:string = "http://localhost:8080/annonce/files/"

  constructor(private annonceService:AnnonceService, private fb : FormBuilder) {
  }
  ngOnInit(): void {
   this.getAllAnn();
   this.searchFormGroup=this.fb.group({
    keyword : this.fb.control(""),
    secteur:this.fb.control(""),
    region:this.fb.control("")
  });
 }




getAllAnn(){
  this.annonceService.getAll().subscribe((res:any)=>{
     this.annonce=res;
     console.log("categories : ", res);
   })
 }

 handleSearchCustomers() {
  let keyword = this.searchFormGroup.value.keyword;
  let secteur = this.searchFormGroup.value.secteur;
  let region = this.searchFormGroup.value.region;

  this.annonceService.SearchAnnonce(keyword , secteur , region).subscribe(
    (response: any) => {
      this.annonce = response;
   
      console.log("search",response)
    },
    (err: any) => {
     
    }
  );
}

}
