import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CandidatService } from 'src/app/services/candidat.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
contact : any ;
formContact !: FormGroup ;
alert: boolean=false;


constructor(private contactservice:CandidatService , private formBuilder:FormBuilder, private http: HttpClient ){}

ngOnInit(): void {
this.formContact=this.formBuilder.group({
    nom:'',
    telephone:'',
    email:'',
    msgBody:'',
    subject:''
})
}

Contact() {




  this.contactservice.Contact(this.formContact.value).subscribe(
    (res: any) => {
      console.log("add ",res);  
   
      
    
      this.alert=true;

      
    
    })
   
  }
 

  

}
