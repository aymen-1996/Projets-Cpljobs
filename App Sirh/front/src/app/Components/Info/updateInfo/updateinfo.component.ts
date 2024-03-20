import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoService } from '../../service/Info.service';

@Component({
  selector: 'app-updateinfo',
  templateUrl: './updateinfo.component.html',
  styleUrls: ['./updateinfo.component.css']
})
export class UpdateinfoComponent implements OnInit {

  infos :any;
  formCustomer !: FormGroup ;
  id=this.activatedRoute.snapshot.params['id']
  constructor(private  activatedRoute : ActivatedRoute,private info: InfoService, private fb : FormBuilder,  private formgroupe : FormBuilder, private router : Router) { }

  ngOnInit(): void {
this.infoById()

    this.formCustomer = this.formgroupe.group({
      nom: "",
      adresse: "",
      age: "",
      caracteristiques:"",
      cnss: "",
      rib:"",
      dateEmbauche:'',
      dateDepart:'',
      motif:'',
      statut:''
     

    })
  }
  
  updateInfo() {
    
    this.info.updateInfo(this.formCustomer.value, this.id).subscribe((res: any) => {
      
      console.log("cust", this.info)
      this.router.navigateByUrl('/listinfo')
     
    });
     console.log("here customer to update : ",this.formCustomer.value);
  }
  infoById(){
    this.info.getbyid(this.id).subscribe((res:any)=>{
      this.infos=res

      this.formCustomer.patchValue({
        nom: this.infos.nom,
        adresse: this.infos.adresse,
        age: this.infos.age,
        caracteristiques: this.infos.caracteristiques,
        cnss: this.infos.cnss,
        rib: this.infos.rib,
        dateEmbauche: this.infos.dateEmbauche,
        dateDepart: this.infos.dateDepart,
        statut: this.infos.statut,
        motif: this.infos.motif,
     

      });
      console.log("customer",this.infos)
      
    })
}}
