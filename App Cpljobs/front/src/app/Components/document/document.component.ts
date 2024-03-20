import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {

  alert:boolean=false
  text: string = "text pardefaut"
  formDoc!: FormGroup;

  c:any
  enable:boolean=false;
  submitted: boolean = false
  users:any;

  fileUpload:Array<File>=[];


  constructor(private formBuilder:FormBuilder, private documentService:DocumentService  , private router: Router) { }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
      this.formDoc=this.formBuilder.group({
      titre:'',
      doc:'',
      user:''

})
}

handleFileInput(files: any) {


  this.fileUpload = <Array<File>>files.target.files;
  console.log(this.fileUpload)}

  addDocument() {

    let formData = new FormData();
    formData.append("titre", this.formDoc.value.titre);
    formData.append("file",this.fileUpload[0]);
    formData.append("user", this.formDoc.value.user);
  
  this.documentService.saveDocument(formData,this.users.id).subscribe(
    (res: any) => {
      console.log("add ",res);  
      window.scrollTo(0,0)
      
      this.alert=true
      
      this.formDoc.reset({})
      setTimeout(() => {
        this.router.navigateByUrl("/profil");
      }, 3000);
      
    
    })
   
  }
  closeAlert(){
    this.alert=false
  }

  

  
 
  
  }


