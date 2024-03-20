import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocsService } from '../../service/docs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-docs',
  templateUrl: './update-docs.component.html',
  styleUrls: ['./update-docs.component.css']
})
export class UpdateDocsComponent implements OnInit {
  formDoc:FormGroup
  id=this.activatedRoute.snapshot.params['id']
  doc:any;
  constructor(private  activatedRoute : ActivatedRoute,private formBuilder:FormBuilder, private docService:DocsService, private route: Router) { }
  
  ngOnInit(): void {
    this.docById()
    this.formDoc=this.formBuilder.group({
      type_contrat:'',
      anciennete:'',
      mobilite:''
      
          
    })
    
    
   
    
    
    }
    updateDoc() {
    
      this.docService.updateDoc(this.formDoc.value, this.id).subscribe((res: any) => {
        
        console.log("cust", this.doc)
        this.route.navigateByUrl('/listdoc')
       
      });
       console.log("here customer to update : ",this.formDoc.value);
    }
    docById(){
      this.docService.getbyid(this.id).subscribe((res:any)=>{
        this.doc=res
  
        this.formDoc.patchValue({
          type_contrat: this.doc.type_contrat,
          anciennete: this.doc.anciennete,
          mobilite: this.doc.mobilite,
        
       
  
        });
        console.log("customer",this.doc)
        
      })
  }}
  
