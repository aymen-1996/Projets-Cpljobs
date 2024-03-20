import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-listcust',
  templateUrl: './listcust.component.html',
  styleUrls: ['./listcust.component.css']
})
export class ListcustComponent implements OnInit {


  customer : any ;
  errorMessage !: string ; 
  searchFormGroup! : FormGroup
  fileInfos?: Observable<any>;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  error=''

  affichageErreu:boolean=true
  message = '';
  c: any;

  


  
  pageSize=20
  currentPage=0
  
  id=this.activatedRoute.snapshot.params['id']
     
     

  constructor(private activatedRoute:ActivatedRoute, private customerService: CustomerService,  private formgroupe : FormBuilder, private router : Router) { }

  ngOnInit(): void {
    //this.fileInfos = this.uploadService.getFiles();
    
    this.searchFormGroup=this.formgroupe.group({
      keyword : this.formgroupe.control("")
    });
  
    
    this.getAllcust();
   
      
    }
    

    onPageChange(event: any): void {
      
      this.pageSize = Number(event.target.value) 

      console.log("taille page " , this.pageSize)
    }

    getAllcust(){
      this.customerService.getAllCustomer().subscribe((res:any)=>{
         this.customer=res;
         console.log("customer : ", res);
         
       },
  
      
       )
      

     }
   

  handleSearchAccount() {
    throw new Error('Method not implemented.');
  }

  cusromerById(){
    this.customerService.getById(this.id).subscribe((res:any)=>{
      this.customer=res
      console.log("customer",this.customer)
      
    });
    
  }
 
  handleSearchCustomers() {
    let keyword = this.searchFormGroup.value.keyword;
  
    this.customerService.Searchcust(keyword).subscribe(
      (response: any) => {
        this.customer = response;
        this.errorMessage = '';
        console.log("search",response)
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }
}
