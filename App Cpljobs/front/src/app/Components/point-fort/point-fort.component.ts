import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PointFortService } from 'src/app/services/point-fort.service';

@Component({
  selector: 'app-point-fort',
  templateUrl: './point-fort.component.html',
  styleUrls: ['./point-fort.component.css']
})
export class PointFortComponent {

  alert:boolean=false
  text: string = "text pardefaut"
  formptfort!: FormGroup;
  formptfort1!: FormGroup;
  aff:boolean=false;
  c:any
  enable:boolean=false;
  submitted: boolean = false
  users:any;
candidats:any;
fort:any;

  constructor(private formBuilder:FormBuilder, private pointfortService:PointFortService, private router: Router) { }

  ngOnInit(): void {
    this.infoById();
    
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
      this.formptfort=this.formBuilder.group({
        pointFort:'',
        interet:'',
        user:''

})

this.formptfort1=this.formBuilder.group({
  pointFort:'',
  interet:'',
  user:''

})
}

  addPtfort() {

    let formData = new FormData();
    formData.append("pointFort", this.formptfort.value.pointFort);
    formData.append("interet", this.formptfort.value.interet);
    formData.append("user", this.formptfort.value.user);
  
  this.pointfortService.savePointfort(formData,this.users.id).subscribe(
    (res: any) => {
      console.log("add ",res);  
      window.scrollTo(0,0)
      
      this.alert=true
      
      this.formptfort.reset({})
      setTimeout(() => {
        this.router.navigateByUrl("/profil");
      }, 3000);
      
    
    })
   
  }
  closeAlert(){
    this.alert=false
  }

  

  
 
  updateFort(): void {

    const infos = JSON.parse(localStorage.getItem('user') || '{}');
   this.pointfortService.getPointfort(infos.id).subscribe((infoRes: any) => {
    this.fort=infoRes

    const firstInfocanId = infoRes[0].id;
 
    let formData = new FormData();
    formData.append("pointFort", this.formptfort1.value.pointFort);
    formData.append("interet", this.formptfort1.value.interet);
    formData.append("user", this.formptfort1.value.user);
  
  
      this.pointfortService.updatePointfort(formData, firstInfocanId).subscribe(
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
   this.pointfortService.getPointfort(infos.id).subscribe((infoRes: any) => {
    this.fort=infoRes

    const firstInfocanId = infoRes[0].id;
  console.log("infoo",infoRes)
  console.log("firstInfocanId",firstInfocanId)

  this.pointfortService.getById(firstInfocanId).subscribe((res: any) => {
    this.candidats = res;
    this.formptfort1.patchValue({
      pointFort: this.candidats.pointFort,
      interet: this.candidats.interet
      
    
  
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


  
  


