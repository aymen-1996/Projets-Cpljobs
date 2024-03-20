import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {

  alert:boolean=false
  text: string = "text pardefaut"
  formExperience!: FormGroup;
  formExperience1!: FormGroup;
  experience:any
  c:any
  enable:boolean=false;
  submitted: boolean = false
  users:any;
  candidats:any
  aff:boolean=false;


  constructor(private formBuilder:FormBuilder, private experienceService:ExperienceService  , private router: Router) { }

  ngOnInit(): void {
    this.infoById();
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
      this.formExperience=this.formBuilder.group({
        posteact:'',
        periode:'',
        titrepost:'',
        typepost:'',
        lieu:'',
        secteuract:'', 
        tailleentrep:'', 
        catentreprise:'', 
        salairemensuel:'', 
        tache:'', 
        user:''

})

this.formExperience1=this.formBuilder.group({
  posteact:'',
  periode:'',
  titrepost:'',
  typepost:'',
  lieu:'',
  secteuract:'', 
  tailleentrep:'', 
  catentreprise:'', 
  salairemensuel:'', 
  tache:'', 
  user:''
})}

  addFormation() {

    let formData = new FormData();
    formData.append("posteact", this.formExperience.value.posteact);
    formData.append("titrepost", this.formExperience.value.titrepost);
    formData.append("periode", this.formExperience.value.periode);
    formData.append("typepost", this.formExperience.value.typepost);
    formData.append("lieu", this.formExperience.value.lieu);
    formData.append("secteuract", this.formExperience.value.secteuract);
    formData.append("tailleentrep", this.formExperience.value.tailleentrep);
    formData.append("catentreprise", this.formExperience.value.catentreprise);
    formData.append("salairemensuel", this.formExperience.value.salairemensuel);
    formData.append("tache", this.formExperience.value.tache);
    formData.append("user", this.formExperience.value.user);
  
  this.experienceService.saveExperience(formData,this.users.id).subscribe(
    (res: any) => {
      console.log("add ",res);  
      window.scrollTo(0,0)
      
      this.alert=true
      
      this.formExperience.reset({})
      setTimeout(() => {
        this.router.navigateByUrl("/profil");
      }, 3000);
      
    
    })
   
  }
  closeAlert(){
    this.alert=false
  }

  

  
  updateExp(): void {

    const infos = JSON.parse(localStorage.getItem('user') || '{}');
   this.experienceService.getExperience(infos.id).subscribe((infoRes: any) => {
    this.experience=infoRes

    const firstInfocanId = infoRes[0].id;
 
    let formData = new FormData();
    formData.append("posteact", this.formExperience1.value.posteact);
    formData.append("titrepost", this.formExperience1.value.titrepost);
    formData.append("periode", this.formExperience1.value.periode);
    formData.append("typepost", this.formExperience1.value.typepost);
    formData.append("lieu", this.formExperience1.value.lieu);
    formData.append("secteuract", this.formExperience1.value.secteuract);
    formData.append("tailleentrep", this.formExperience1.value.tailleentrep);
    formData.append("catentreprise", this.formExperience1.value.catentreprise);
    formData.append("salairemensuel", this.formExperience1.value.salairemensuel);
    formData.append("tache", this.formExperience1.value.tache);
    formData.append("user", this.formExperience1.value.user);
  
      this.experienceService.updateExperience(formData, firstInfocanId).subscribe(
        (res: any) => {
          this.candidats = res;
          this.alert = true;
          window.scrollTo(0, 0);
          setTimeout(() => {
            this.router.navigateByUrl("/profil");
          }, 3000);
        }
      );
      
    });
  
    

  
  }

  infoById(): void {

    const infos = JSON.parse(localStorage.getItem('user') || '{}');
   this.experienceService.getExperience(infos.id).subscribe((infoRes: any) => {
    this.experience=infoRes

    const firstInfocanId = infoRes[0].id;
  console.log("infoo",infoRes)
  console.log("firstInfocanId",firstInfocanId)

  this.experienceService.getById(firstInfocanId).subscribe((res: any) => {
    this.candidats = res;
    this.formExperience1.patchValue({
      posteact: this.candidats.posteact,
      titrepost: this.candidats.titrepost,
      periode: this.candidats.periode,
      typepost: this.candidats.typepost,
      lieu: this.candidats.lieu,
      secteuract: this.candidats.secteuract,
      tailleentrep: this.candidats.tailleentrep,
      catentreprise: this.candidats.catentreprise,
      salairemensuel: this.candidats.salairemensuel,
      tache: this.candidats.tache,
      
  
    });
    console.log("customer", res);
  });

  })
    const infocanArray1 = JSON.parse(localStorage.getItem('info') || '[]');
    const firstInfocanId1 = infocanArray1[0].id;
    
  }
  getoui(){
    this.aff=true 
   }



}


  
  





