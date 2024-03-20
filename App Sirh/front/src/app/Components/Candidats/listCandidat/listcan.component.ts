import { Component, OnInit } from '@angular/core';
import { CandidatService } from '../../service/Candidats.service';
import { FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-listcan',
  templateUrl: './listcan.component.html',
  styleUrls: ['./listcan.component.css']
})
export class ListcanComponent implements OnInit {

  searchFormGroup! : FormGroup
  cans:any
  p: number = 1
  errorMessage !: string ; 


  constructor(private CandidatService:CandidatService, private fb : FormBuilder) { }

  ngOnInit(): void {

    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    
    this.getAllCan();
  }
  getAllCan(){
    this.CandidatService.getCan().subscribe((res:any)=>{
       this.cans=res;
       console.log("categories : ", res);
     })
   }

   deleteInfo(id:any){
    this.CandidatService.deletebyid(id).subscribe(
      (res: any) => {
        console.log("deleted");
        this.getAllCan();
      })
      
   }
   handleSearchCustomers() {
    let keyword = this.searchFormGroup.value.keyword;
  
    this.CandidatService.Searchcust(keyword).subscribe(
      (response: any) => {
        this.cans = response;
        this.errorMessage = '';
        console.log("search",response)
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }


  
}
