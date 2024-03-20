import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../service/Info.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listinfo',
  templateUrl: './listinfo.component.html',
  styleUrls: ['./listinfo.component.css']
})
export class ListinfoComponent implements OnInit {

  
  information:any
  p: number = 1

  fileUrl!: SafeResourceUrl;
  fileType!: string;

  searchFormGroup:FormGroup

  constructor(private sanitizer: DomSanitizer,private http:HttpClient,private infoService:InfoService,private formgroupe:FormBuilder) { }

  ngOnInit(): void {
    this.searchFormGroup=this.formgroupe.group({
      keyword : this.formgroupe.control("")
    });
    this.getAllinfo();
  }
  getAllinfo(){
    this.infoService.getInfo().subscribe((res:any)=>{
       this.information=res;
       console.log("categories : ", res);
     })
   }

   deleteInfo(id:any){
    this.infoService.deletebyid(id).subscribe(
      (res: any) => {
        console.log("deleted");
        this.getAllinfo();
      })
      
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
  handleSearchCustomers() {
    let keyword = this.searchFormGroup.value.keyword;
  
    this.infoService.Searchinfo(keyword).subscribe(
      (response: any) => {
        this.information = response;
        
        console.log("search",response)
      },
      (err: any) => {
 
      }
    );
  }
}
