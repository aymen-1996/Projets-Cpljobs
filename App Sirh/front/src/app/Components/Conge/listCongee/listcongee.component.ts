import { Component, OnInit } from '@angular/core';
import { CongeeService } from '../../service/Conge.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listcongee',
  templateUrl: './listcongee.component.html',
  styleUrls: ['./listcongee.component.css']
})
export class ListcongeeComponent implements OnInit {

  conge:any
  p: number = 1
  searchFormGroup:FormGroup
  errorMessage:String
  constructor(private congeService:CongeeService ,private formgroupe:FormBuilder,private http:HttpClient) { }

  ngOnInit(): void {

    this.searchFormGroup=this.formgroupe.group({
      keyword : this.formgroupe.control("")
    });
    this.getAllCon();
  }
  getAllCon(){
    this.congeService.getCon().subscribe((res:any)=>{
       this.conge=res;
       console.log("categories : ", res);
     })
   }

   deleteDem(id:any){
    this.congeService.deletebyid(id).subscribe(
      (res: any) => {
        console.log("deleted");
        this.getAllCon();
      })
      
   }

   handleSearchCustomers() {
    let keyword = this.searchFormGroup.value.keyword;
  
    this.congeService.Searchcust(keyword).subscribe(
      (response: any) => {
        this.conge = response;
        this.errorMessage = '';
        console.log("search",response)
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }
  acceptConge(id: number): void {
  
  
    this.congeService.AccRef(id).subscribe(
      (response: boolean) => {
        if (response) {
          // Conge accepted successfully
          console.log('Conge accepted.');
          this.getAllCon();
        } else {
          // Conge not found
          console.log('Conge not found.');
        }
      },
      (error: any) => {
        // Handle error
        console.error('Error accepting conge:', error);
      }
    );
  }


  refusConge(id: number): void {
    
  
    this.congeService.RefAcc(id).subscribe(
      (response: boolean) => {
        if (response) {
          // Conge accepted successfully
          console.log('Conge accepted.');
          this.getAllCon();
        } else {
          // Conge not found
          console.log('Conge not found.');
        }
      },
      (error: any) => {
        // Handle error
        console.error('Error accepting conge:', error);
      }
    );
  }
}
