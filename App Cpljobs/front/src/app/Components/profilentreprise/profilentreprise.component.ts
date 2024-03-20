import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-profilentreprise',
  templateUrl: './profilentreprise.component.html',
  styleUrls: ['./profilentreprise.component.css']
})
export class ProfilentrepriseComponent {
info:any
alert:boolean=false;
  candidats :any;
  formEntreprise !: FormGroup ;
  
  constructor(private  activatedRoute : ActivatedRoute,private customerservice: CustomerService, private fb : FormBuilder,  private formgroupe : FormBuilder, private router : Router) { }

  ngOnInit(): void {

    this.infoById()
    
    this.info = JSON.parse(localStorage.getItem('infocust') || '{}');



    this.formEntreprise=this.fb.group({
      secteur: '',
      type:'',
      region:'',
      adresse:'',
      code:'',
      categorie:'',
      description:'',
      logo:'',
      nomEntreprise:'',
      user:''
    
    
    })}

  

  
  updateEntreprise() {

    const infocustArray = JSON.parse(localStorage.getItem('infocust') || '[]');

    
  
    const firstInfocustId = infocustArray[0].id;


    let formData = new FormData();
    formData.append("type", this.formEntreprise.value.type);
    formData.append("region", this.formEntreprise.value.region);
    formData.append("adresse", this.formEntreprise.value.adresse);
    formData.append("code", this.formEntreprise.value.code);
    formData.append("description", this.formEntreprise.value.description);
    formData.append("nomEntreprise", this.formEntreprise.value.nomEntreprise);
    formData.append("secteur", this.formEntreprise.value.secteur);
    formData.append("categorie", this.formEntreprise.value.categorie);

 
    
    this.customerservice.updateInfocust(formData, firstInfocustId).subscribe((res: any) => {
      
      this.alert=true;

      window.scroll(0,0)

      setTimeout(() => {
        this.router.navigateByUrl("/profilrec");
      }, 3000);
      
     
    });

  }


  infoById(){
    const infocustArray = JSON.parse(localStorage.getItem('infocust') || '[]');
  
    const firstInfocustId = infocustArray[0].id;
    this.customerservice.getinfobyid(firstInfocustId).subscribe((res:any)=>{
      this.candidats=res
      this.formEntreprise.patchValue({
        secteur: this.candidats.secteur,
        type: this.candidats.type,
        region: this.candidats.region,
        adresse: this.candidats.adresse,
        code: this.candidats.code,
      
        categorie: this.candidats.categorie,
        description: this.candidats.description,
        nomEntreprise: this.candidats.nomEntreprise,

      });
      console.log("customer",this.candidats)

      console.log("ressss",this.candidats.sourcing)
      
    })
}}

