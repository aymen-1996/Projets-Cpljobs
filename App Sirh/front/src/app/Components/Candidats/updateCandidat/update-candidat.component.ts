import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatService } from '../../service/Candidats.service';


@Component({
  selector: 'app-update-candidat',
  templateUrl: './update-candidat.component.html',
  styleUrls: ['./update-candidat.component.css']
})
export class UpdateCandidatComponent implements OnInit {

 
  candidats :any;
  formCustomer !: FormGroup ;
  id=this.activatedRoute.snapshot.params['id']
  constructor(private  activatedRoute : ActivatedRoute,private candidat: CandidatService, private fb : FormBuilder,  private formgroupe : FormBuilder, private router : Router) { }

  ngOnInit(): void {

    this.infoById()
    this.formCustomer = this.formgroupe.group({
      telephone: "",
      email: "",
      entretientel: "",
      entretienphy:"",
      evaluation: "",

      sourcing:""
     

    })
  }


  

  
  updateCandidat() {
    
    this.candidat.updateCan(this.formCustomer.value, this.id).subscribe((res: any) => {
      
      console.log("cust", this.candidat)
      this.router.navigateByUrl('/listcan')
     
    });
     console.log("here customer to update : ",this.formCustomer.value);
  }
  infoById(){
    this.candidat.getbyid(this.id).subscribe((res:any)=>{
      this.candidats=res
      this.formCustomer.patchValue({
        telephone: this.candidats.telephone,
        email: this.candidats.email,
        entretientel: this.candidats.entretientel,
        entretienphy: this.candidats.entretienphy,
        evaluation: this.candidats.evaluation,
      
        sourcing: this.candidats.sourcing,

      });
      console.log("customer",this.candidats)

      console.log("ressss",this.candidats.sourcing)
      
    })
}}
