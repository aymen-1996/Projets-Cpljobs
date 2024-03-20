import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from 'src/app/services/annonce.service';
import { DocumentService } from 'src/app/services/document.service';
import { InfoproService } from 'src/app/services/infopro.service';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-annoncecandidat',
  templateUrl: './annoncecandidat.component.html',
  styleUrls: ['./annoncecandidat.component.css']
})
export class AnnoncecandidatComponent {

  fileUrl!: SafeResourceUrl;
  fileType!: string;
doc :any
users:any;
ann:any ;
p: number = 1

  id=this.activatedRoute.snapshot.params['id']
annCan:any
  constructor(private infoproservice:InfoproService,private documentservice:DocumentService,private sanitizer: DomSanitizer,private http:HttpClient,private activatedRoute:ActivatedRoute,private formBuilder:FormBuilder, private annonceService:AnnonceService  , private router: Router) { }
  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
    this.AnnonceCan()
    this.getDoc()
    this.getInfoprobyId()
  }

  AnnonceCan(){
    this.annonceService.getAnnCandidat(this.id).subscribe(
      (res: any) => {
        console.log("anncan ",res);  
        this.annCan=res;

      
      })
  }

  getInfoprobyId(){
    this.infoproservice.getinfopro(this.id).subscribe((res:any)=>{
       this.ann=res;
       console.log("infopro : ", res);
     })
   }

  loadFileContent(filename: string) {
    const url = `http://localhost:8080/document1/files/${filename}`;
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


  getDoc(){
    this.documentservice.getDocument(this.id).subscribe((res1:any)=>{
       this.doc=res1;
       console.log("document : ", res1);
     })
   }
 




  
}
