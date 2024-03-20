import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocsService } from '../../service/docs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adddoc',
  templateUrl: './adddoc.component.html',
  styleUrls: ['./adddoc.component.css']
})
export class AdddocComponent implements OnInit {

  fileUpload:Array<File>=[];
  formDoc:FormGroup
  docs:any




  constructor(private formBuilder:FormBuilder, private docService:DocsService, private route: Router) { }

  ngOnInit(): void {
    this.formDoc=this.formBuilder.group({
      type_contrat:'',
      anciennete:'',
      mobilite:'',
      contrat:'',
          
    })
    
    
   
    
    
    }
  handleFileInput(files: any) {
    this.fileUpload = <Array<File>>files.target.files;
    console.log(this.fileUpload)}
    addDoc() {
    
      let formData = new FormData();
      formData.append("type_contrat", this.formDoc.value.type_contrat);
      formData.append("anciennete", this.formDoc.value.anciennete);
      formData.append("mobilite", this.formDoc.value.mobilite);
      formData.append("file",this.fileUpload[0]);
    
      this.docService.saveDoc(formData).subscribe(
        (res: any) => {
         this.getAlldoc();
         this.route.navigateByUrl("/listdoc")
          
        
        })
      }
      getAlldoc(){
        this.docService.getDoc().subscribe((res:any)=>{
           this.docs=res;
           console.log("categories : ", res);
         })
       }
}
