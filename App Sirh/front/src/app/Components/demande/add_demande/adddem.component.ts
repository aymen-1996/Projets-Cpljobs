import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../service/User.service';
import { Router } from '@angular/router';
import { DemandeService } from '../../service/demande.service';

@Component({
  selector: 'app-adddem',
  templateUrl: './adddem.component.html',
  styleUrls: ['./adddem.component.css']
})
export class AdddemComponent implements OnInit {

  users:any

  formDem:FormGroup
 
  constructor(private formBuilder:FormBuilder, private demandeService:DemandeService,private userService:UserService , private route: Router) { }

  ngOnInit(): void {


    this.users = JSON.parse(localStorage.getItem('user') || '{}');

    console.log("user",this.users)

   this.formDem=this.formBuilder.group({
    document: '',
      message:'',
      user:''
     

})


}


addDem() {

  let formData = new FormData();
  formData.append("document", this.formDem.value.document);
  formData.append("message", this.formDem.value.message);
 
  formData.append("user", this.formDem.value.user);
 

  this.demandeService.saveDem(formData,this.formDem.value.user).subscribe(
    (res: any) => {
      console.log("add ");
      window.scrollTo(0,0)
    
      this.formDem.reset({})
    
    })
  }



  

  }

