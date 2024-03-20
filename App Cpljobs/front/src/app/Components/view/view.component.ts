import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { InfoproService } from 'src/app/services/infopro.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
alert:boolean=false;
annonce :any ;
users:any
info:any;
infocan:any
id=this.activatedRoute.snapshot.params['id']
formUser!:FormGroup
  constructor(private activatedRoute:ActivatedRoute,private formBuilder:FormBuilder, private annonceService:AnnonceService ,private candidatservice:CandidatService ,private infopro:InfoproService, private router: Router) { }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
    this.info = JSON.parse(localStorage.getItem('info') || '{}');
    this.formUser = this.formBuilder.group({

    });
    console.log(this.id)
    this.annonceById()
    
   
    
  }




  annonceById(){
    this.annonceService.getbyid(this.id).subscribe((res:any)=>{
      this.annonce=res;
     

      console.log("annonce",this.annonce)
    });
  }

  addAnn() {
    const infocanArray = JSON.parse(localStorage.getItem('info') || '[]');
    const infoproArray = JSON.parse(localStorage.getItem('infopro') || '[]');
    
  
    const firstInfocanId = infocanArray[0].id;
    const firstInfoproId = infoproArray[0].id;
    const formData = this.formUser.value;
  
    this.annonceService.postulerAnnonce(formData, this.id, firstInfocanId,firstInfoproId).subscribe(
      (res: any) => {
        console.log("add ", res);
        window.scrollTo(0, 0);
        this.alert = true;
      },
      (error: any) => {
        console.error("Error adding announcement:", error);
        // Handle the error here (e.g., show an error message to the user)
      }
    );
  }


  
 /* addAnn() {

    const infos = JSON.parse(localStorage.getItem('user') || '{}');
    this.candidatservice.getinfocan(infos.id).subscribe((info: any) => {
      this.infopro.getinfopro(infos.id).subscribe((infopr: any) => {
  
        console.log("infopro", infopr)
        const firstInfocanId = info[0].id;
  
        // Vérifie que l'array `infopr` n'est pas vide
        if (infopr.length > 0) {
          const firstInfoprId = infopr[0].id;
  
          // Vérifie que la propriété `id` existe
          if (infopr[0].id) {
            const formData = this.formUser.value;
  
            this.annonceService.postulerAnnonce(formData, this.id, firstInfocanId, firstInfoprId).subscribe(
              (res: any) => {
                console.log("add ", res);
                window.scrollTo(0, 0);
                this.alert = true;
              },
              (error: any) => {
                console.error("Error adding announcement:", error);
              }
            );
          } else {
            console.error("L'annonceur n'a pas d'identifiant");
          }
        } else {
          console.error("Aucun annonceur trouvé");
        }
  
     
      })
  
    })
  
  }*/
  
  
  


}
