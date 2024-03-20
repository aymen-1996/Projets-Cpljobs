import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../../service/demande.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listdem',
  templateUrl: './listdem.component.html',
  styleUrls: ['./listdem.component.css']
})
export class ListdemComponent implements OnInit {

  demande:any
  errorMessage !: string ;
  p: number = 1
  searchFormGroup:FormGroup

  constructor(private demandeService:DemandeService ,private formgroupe:FormBuilder) { }

  ngOnInit(): void {

    this.searchFormGroup=this.formgroupe.group({
      keyword : this.formgroupe.control("")
    });
  
    this.getAlldem();
  }
  getAlldem(){
    this.demandeService.getDem().subscribe((res:any)=>{
       this.demande=res;
       console.log("categories : ", res);
     })
   }

   deleteDem(id:any){
    this.demandeService.deletebyid(id).subscribe(
      (res: any) => {
        console.log("deleted");
        this.getAlldem();
      })
      
   }

   handleSearchCustomers() {
    let keyword = this.searchFormGroup.value.keyword;
  
    this.demandeService.Searchcust(keyword).subscribe(
      (response: any) => {
        this.demande = response;
        this.errorMessage = '';
        console.log("search",response)
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }
 
}
