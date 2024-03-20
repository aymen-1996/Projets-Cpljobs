import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  alert:boolean=false
  text: string = "text pardefaut"
  formSkills!: FormGroup;
  formSkills1!: FormGroup;
  aff:boolean=false;
  c:any
  enable:boolean=false;
  submitted: boolean = false
  users:any;
  candidats:any;
  skills:any


  constructor(private formBuilder:FormBuilder, private skillsservices:SkillsService, private router: Router) { }

  ngOnInit(): void {
    this.infoById();
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
      this.formSkills=this.formBuilder.group({
        competence:'',
        niveau:'',
        description:'',
      
        user:''

})
this.formSkills1=this.formBuilder.group({
  competence:'',
  niveau:'',
  description:'',

  user:''

})

}

  addSkills() {

    let formData = new FormData();
    formData.append("competence", this.formSkills.value.competence);
    formData.append("niveau", this.formSkills.value.niveau);
    formData.append("description", this.formSkills.value.description);
    formData.append("user", this.formSkills.value.user);
  
  this.skillsservices.saveSkills(formData,this.users.id).subscribe(
    (res: any) => {
      console.log("add ",res);  
      window.scrollTo(0,0)
      
      this.alert=true
      
      this.formSkills.reset({})
      setTimeout(() => {
        this.router.navigateByUrl("/profil");
      }, 3000);
      
    
    })
   
  }
  closeAlert(){
    this.alert=false
  }

  

  
 
  updateSkills(): void {

    const infos = JSON.parse(localStorage.getItem('user') || '{}');
   this.skillsservices.getSkills(infos.id).subscribe((infoRes: any) => {
    this.skills=infoRes

    const firstInfocanId = infoRes[0].id;
 
    let formData = new FormData();
    formData.append("competence", this.formSkills1.value.competence);
    formData.append("niveau", this.formSkills1.value.niveau);
    formData.append("description", this.formSkills1.value.description);
    formData.append("user", this.formSkills1.value.user);
  
  
      this.skillsservices.updateSkills(formData, firstInfocanId).subscribe(
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
   this.skillsservices.getSkills(infos.id).subscribe((infoRes: any) => {
    this.skills=infoRes

    const firstInfocanId = infoRes[0].id;
  console.log("infoo",infoRes)
  console.log("firstInfocanId",firstInfocanId)

  this.skillsservices.getById(firstInfocanId).subscribe((res: any) => {
    this.candidats = res;
    this.formSkills1.patchValue({
      competence: this.candidats.competence,
      niveau: this.candidats.niveau,
      description: this.candidats.description
    
  
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


  
  


