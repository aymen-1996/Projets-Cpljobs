import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CandidatService } from 'src/app/services/candidat.service';
import { DocumentService } from 'src/app/services/document.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { FormationService } from 'src/app/services/formation.service';
import { InfoproService } from 'src/app/services/infopro.service';
import { LangueService } from 'src/app/services/langue.service';
import { PointFortService } from 'src/app/services/point-fort.service';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-moncv',
  templateUrl: './moncv.component.html',
  styleUrls: ['./moncv.component.css']
})
export class MoncvComponent {
  users:any
  ex:any;
  for:any;
  annCan:any
  ann:any
  ski:any
  lang:any;
  doc:any
  userfort:any
  srcImageUser:string = "http://localhost:8080/infocan/files/"

  fileUrl!: SafeResourceUrl;
  fileType!: string;


  constructor(private sanitizer: DomSanitizer,private http:HttpClient ,private langueservice:LangueService ,private documentService:DocumentService , private skillsService:SkillsService, private candidatService:CandidatService,private formationService:FormationService ,private infoproservice:InfoproService ,private pointfortService:PointFortService,private experiencesservice:ExperienceService, private router: Router) { }
  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('user') || '{}');
    this.getInfocanbyId()
    this.getInfoprobyId()
    this.getFort()
    this.getexperience()
    this.getformation()
    this.getskills()
    this.getlangue()
    this.getDoc()
  }
  
  getInfocanbyId(){
    this.candidatService.getinfocan(this.users.id).subscribe((res:any)=>{
       this.annCan=res;
       console.log("categories : ", res);
     })
   }

   getInfoprobyId(){
    this.infoproservice.getinfopro(this.users.id).subscribe((res:any)=>{
       this.ann=res;
       console.log("infopro : ", res);
     })
   }
   getFort(){
    this.pointfortService.getPointfort(this.users.id).subscribe((res:any)=>{
       this.userfort=res;
       console.log("fort : ", res);
     })
   }
   getexperience(){
    this.experiencesservice.getExperience(this.users.id).subscribe((res1:any)=>{
       this.ex=res1;
       console.log("experience : ", res1);
     })
   }

   getformation(){
    this.formationService.getformation(this.users.id).subscribe((res1:any)=>{
       this.for=res1;
       console.log("formation : ", res1);
     })
   }
   getskills(){
    this.skillsService.getSkills(this.users.id).subscribe((res1:any)=>{
       this.ski=res1;
       console.log("skills : ", res1);
     })
   }

   getlangue(){
    this.langueservice.getlangue(this.users.id).subscribe((res1:any)=>{
       this.lang=res1;
       console.log("langues : ", res1);
     })
   }

   getDoc(){
    this.documentService.getDocument(this.users.id).subscribe((res1:any)=>{
       this.doc=res1;
       console.log("document : ", res1);
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

}



