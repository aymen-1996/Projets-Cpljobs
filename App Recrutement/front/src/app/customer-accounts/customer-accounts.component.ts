import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {customer} from "../model/customer.model";
import { Observable } from 'rxjs';
import { FileUploadService } from '../services/file-upload.service';
import { CustomerService } from '../services/customer.service';
import { AddcustService } from '../services/addcust.service';


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
  srcCvCustomer:string = "http://localhost:8080/files/"


  constructor(private activatedRoute:ActivatedRoute, private customerservice:AddcustService,private router :Router,private uploadService: FileUploadService) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as customer;
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
