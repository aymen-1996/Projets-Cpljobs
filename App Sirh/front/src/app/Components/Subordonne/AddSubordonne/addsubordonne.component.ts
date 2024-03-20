import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubService } from '../../service/Subordonne.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsubordonne',
  templateUrl: './addsubordonne.component.html',
  styleUrls: ['./addsubordonne.component.css']
})
export class AddsubordonneComponent implements OnInit {

  formsub:FormGroup

  sub:any
  
    constructor(private formBuilder:FormBuilder, private SubService:SubService,private route: Router) { }
  
    ngOnInit(): void {
  
  this.getAllSub();
      this.formsub=this.formBuilder.group({
        tel:'',
        email:'',
        poste:'',
        nom:''
       
      })
      
  }
  addSub() {
 
    this.SubService.saveSub(this.formsub.value).subscribe(
      (res: any) => {
        console.log("add :",res);
        this.getAllSub();
        this.route.navigateByUrl('/listsub');
        
      })
    }
  
  
      getAllSub(){
        this.SubService.getSub().subscribe((res:any)=>{
           this.sub=res;
           console.log("categories : ", res);
         })
       }
       
  }
  