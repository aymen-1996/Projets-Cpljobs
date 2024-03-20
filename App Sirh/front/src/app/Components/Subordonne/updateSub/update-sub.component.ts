import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubService } from '../../service/Subordonne.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-sub',
  templateUrl: './update-sub.component.html',
  styleUrls: ['./update-sub.component.css']
})
export class UpdateSubComponent implements OnInit {

 
  subs :any;
  formCustomer !: FormGroup ;
  id=this.activatedRoute.snapshot.params['id']
  constructor(private  activatedRoute : ActivatedRoute,private sub: SubService, private fb : FormBuilder,  private formgroupe : FormBuilder, private router : Router) { }

  ngOnInit(): void {

this.SubById()

    this.formCustomer = this.formgroupe.group({
      nom: "",
      poste: "",
      tel: "",
      email:""
      
     

    })
  }
  
  updateSub() {
    
    this.sub.updateSub(this.formCustomer.value, this.id).subscribe((res: any) => {
      
      console.log("cust", this.sub)
      this.router.navigateByUrl('/listsub')
     
    });
     console.log("here customer to update : ",this.formCustomer.value);
  }
  SubById(){
    this.sub.getbyid(this.id).subscribe((res:any)=>{
      this.subs=res

      this.formCustomer.patchValue({
        nom: this.subs.nom,
        poste: this.subs.poste,
        tel: this.subs.tel,
        email: this.subs.email,
       
     

      });
      console.log("customer",this.subs)
      
    })
}}
