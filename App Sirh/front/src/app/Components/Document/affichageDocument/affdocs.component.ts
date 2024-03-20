import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocsService } from '../../service/docs.service';


@Component({
  selector: 'app-affdocs',
  templateUrl: './affdocs.component.html',
  styleUrls: ['./affdocs.component.css']
})
export class AffdocsComponent implements OnInit {

  customerId! : string ;

  doc:any
  id=this.activatedRoute.snapshot.params['id']

  srcDoc:string = "http://localhost:8080/file/"

  constructor(private activatedRoute:ActivatedRoute, private docService:DocsService) { }

  ngOnInit(): void {
    this.docById()
  }
  docById(){
    this.docService.getbyid(this.id).subscribe((res:any)=>{
      this.doc=res
      this.srcDoc=this.srcDoc + this.doc.contrat
      console.log("src image",this.srcDoc)
      console.log("fournisseur",this.doc)
      
    });
    
  }
}
