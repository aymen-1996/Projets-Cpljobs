import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatService } from '../../service/Candidats.service';

@Component({
  selector: 'app-addcan',
  templateUrl: './addcan.component.html',
  styleUrls: ['./addcan.component.css']
})
export class AddcanComponent implements OnInit {

  formcan:FormGroup

  candidat:any
  
  hidden:boolean=false;

  test:boolean=false
    constructor(private formBuilder:FormBuilder, private CandidatService:CandidatService,private route: Router) { }
  
    ngOnInit(): void {
  
  this.getAllCan();
      this.formcan=this.formBuilder.group({
        telephone:'',
        email:'',
        entretientel:'',
        entretienphy:'',
        evaluation:'',
      
        sourcing:''
      })
      
  }
  addCan() {
 
    this.CandidatService.saveCan(this.formcan.value).subscribe(
      (res: any) => {
        console.log("add :",res);
        this.getAllCan();
        this.route.navigateByUrl('/listcan');
        
      })
    }
  
  
      getAllCan(){
        this.CandidatService.getCan().subscribe((res:any)=>{
           this.candidat=res;
           console.log("categories : ", res);
         })
       }


       getoui(){
        this.hidden=true 
       }

       getnon(){
        this.test=true 
       }
  }
  