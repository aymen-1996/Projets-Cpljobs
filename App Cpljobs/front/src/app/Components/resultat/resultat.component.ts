import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent {


  fileUrl!: SafeResourceUrl;
  fileType!: string;
  doc :any;
  users:any;
   res:any ;
   res1:any;

  id=this.activatedRoute.snapshot.params['id']
annCan:any
  constructor(private documentservice:DocumentService,private sanitizer: DomSanitizer,private http:HttpClient,private activatedRoute:ActivatedRoute,private formBuilder:FormBuilder , private router: Router) { }
  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('resultat') || '{}');

    this.getDocsForUsers();
    
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


  getDocsForUsers() {
    const users = JSON.parse(localStorage.getItem('resultat') || '[]');
  
    if (!Array.isArray(users)) {
      console.log('Le contenu de "resultat" dans le localStorage n\'est pas un tableau valide.');
      return;
    }
  
    const userDocuments: { user: any; documents: any; }[] = [];
  
    users.forEach((user) => {
      const userId = user.user.id;
  
      this.documentservice.getDocument(userId).subscribe(
        (documents: any) => {
          const userDataWithDocs = {
            user: user,
            documents: documents.length > 0 ? documents[0] : null,
          };
          userDocuments.push(userDataWithDocs);
        },
        (error) => {
          console.error('Une erreur s\'est produite : ', error);
        });
    });
  
   
    this.doc = userDocuments;
  
    console.log(this.doc);
  }
 
}

