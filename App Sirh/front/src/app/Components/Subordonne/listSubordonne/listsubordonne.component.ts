import { Component, OnInit } from '@angular/core';
import { SubService } from '../../service/Subordonne.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listsubordonne',
  templateUrl: './listsubordonne.component.html',
  styleUrls: ['./listsubordonne.component.css']
})
export class ListsubordonneComponent implements OnInit {

  searchFormGroup! : FormGroup
  subs:any
  p: number = 1
  errorMessage !: string ; 


  constructor(private SubService:SubService,  private formgroupe : FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup=this.formgroupe.group({
      keyword : this.formgroupe.control("")
    });
    
    this.getAllSub();
  }
  getAllSub(){
    this.SubService.getSub().subscribe((res:any)=>{
       this.subs=res;
       console.log("categories : ", res);
     })
   }

   deleteInfo(id:any){
    this.SubService.deletebyid(id).subscribe(
      (res: any) => {
        console.log("deleted");
        this.getAllSub();
      })
      
   }
   handleSearchCustomers() {
    let keyword = this.searchFormGroup.value.keyword;
  
    this.SubService.Searchcust(keyword).subscribe(
      (response: any) => {
        this.subs = response;
        this.errorMessage = '';
        console.log("search",response)
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }
}
