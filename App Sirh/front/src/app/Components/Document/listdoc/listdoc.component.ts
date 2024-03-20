import { Component, OnInit } from '@angular/core';
import { DocsService } from '../../service/docs.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listdoc',
  templateUrl: './listdoc.component.html',
  styleUrls: ['./listdoc.component.css']
})
export class ListdocComponent implements OnInit {

  docs:any
  searchFormGroup:FormGroup
  term:String="";
  p: number = 1;
  fileUrl!: SafeResourceUrl;
  fileType!: string;

  errorMessage !: string ; 

  constructor(private sanitizer: DomSanitizer,private http:HttpClient,private docsService:DocsService ,private formgroupe:FormBuilder) { }


  ngOnInit(): void {

    this.searchFormGroup=this.formgroupe.group({
      keyword : this.formgroupe.control("")
    });
    this.getAlldoc();
  }
  getAlldoc(){
    this.docsService.getDoc().subscribe((res:any)=>{
       this.docs=res;
       console.log("categories : ", res);
     })
   }
   deleteDoc(id:any){
    this.docsService.deletebyid(id).subscribe(
      (res: any) => {
        console.log("deleted");
        this.getAlldoc();
      })
      
   }

   handleSearchCustomers() {
    let keyword = this.searchFormGroup.value.keyword;
  
    this.docsService.Searchcust(keyword).subscribe(
      (response: any) => {
        this.docs = response;
        this.errorMessage = '';
        console.log("search",response)
      },
      (err: any) => {
        this.errorMessage = err.message;
      }
    );
  }
  loadFileContent(filename: string) {
    const url = `http://localhost:8080/files/${filename}`;
    const fileExtension = this.getFileExtension(filename);
  
    this.http.get(url, { responseType: 'blob' }).subscribe((data: Blob) => {
      let fileBlob: Blob;
      let fileType: string;
  
      if (fileExtension === 'pdf') {
        fileBlob = new Blob([data], { type: 'application/pdf' });
        fileType = 'application/pdf';
      } else if (fileExtension === 'doc' || fileExtension === 'docx') {
        fileBlob = new Blob([data], { type: 'application/msword' });
        fileType = 'application/msword';
      } else if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
        fileBlob = new Blob([data], { type: 'image/jpeg' });
        fileType = 'image/jpeg';
      } else {
        console.error('Format de fichier non pris en charge.');
        return;
      }
  
      const fileUrl = URL.createObjectURL(fileBlob);
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
      this.fileType = fileType;
  
      // Ouvrir le fichier dans une nouvelle fenêtre ou un nouvel onglet
      window.open(fileUrl, '_blank');
    });
  }
  getFileExtension(filename: string): string {
    const parts = filename.split('.');
    if (parts.length === 1) {
      return ''; // Aucune extension trouvée
    }
    return parts[parts.length - 1].toLowerCase();
  }
}
