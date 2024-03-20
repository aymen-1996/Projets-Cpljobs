import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { Observable } from 'rxjs';
import { CustomerService } from '../../service/customer.service';



@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId! : string ;
  fileInfos?: Observable<any>;

  customer:any
  id=this.activatedRoute.snapshot.params['id']
  srcCvCustomer:string = "http://localhost:8080/customers/files/"


  constructor(private activatedRoute:ActivatedRoute, private customerservice:CustomerService,private router :Router) {

   }

  ngOnInit(): void 
  {
    console.log(this.id)
    this.cusromerById()

  }


  cusromerById(){
    this.customerservice.getById(this.id).subscribe((res:any)=>{
      this.customer=res
      this.srcCvCustomer=this.srcCvCustomer + this.customer.cv
      console.log("src image",this.srcCvCustomer)
      console.log("fournisseur",this.customer)
      
    });
    
  }

  getAllCustmer() {
    this.customerservice.getfile(this.customer.id).subscribe(
      (response: any) => console.log("customer is : ", response))
  }
}
