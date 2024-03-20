import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MotivationService } from 'src/app/services/motivation.service';

@Component({
  selector: 'app-motivation',
  templateUrl: './motivation.component.html',
  styleUrls: ['./motivation.component.css']
})
export class MotivationComponent {

  alert:boolean=false
  text: string = "text pardefaut"
  formMotivation!: FormGroup;

  c:any
  enable:boolean=false;
  submitted: boolean = false
  users:any;


  constructor(private formBuilder:FormBuilder, private motivationService:MotivationService, private router: Router) { }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
      this.formMotivation=this.formBuilder.group({
        titre:'',
        description:'',
        user:''

})
}

  addPtfort() {

    let formData = new FormData();
    formData.append("titre", this.formMotivation.value.titre);
    formData.append("description", this.formMotivation.value.description);
    formData.append("user", this.formMotivation.value.user);
  
  this.motivationService.saveMotivation(formData,this.users.id).subscribe(
    (res: any) => {
      console.log("add ",res);  
      window.scrollTo(0,0)
      
      this.alert=true
      
      this.formMotivation.reset({})
      setTimeout(() => {
        this.router.navigateByUrl("/profil");
      }, 3000);
      
    
    })
   
  }
  closeAlert(){
    this.alert=false
  }

  

  
 
}

